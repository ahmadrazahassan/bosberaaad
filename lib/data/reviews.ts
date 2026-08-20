import {
  Band,
  CLOSERS,
  CONNECTORS,
  CONS,
  OPENERS,
  PROS,
  TITLES,
  VENDOR_RESPONSES,
} from "@/lib/data/review-corpus";
import {
  CATEGORY_ROLE_POOLS,
  CITIES,
  COMPANY_PREFIXES,
  COMPANY_SUFFIXES,
  FIRST_NAMES,
  INDUSTRIES,
  JOB_TITLES,
  LAST_NAMES,
} from "@/lib/data/reviewers";
import { COMPANY_SIZES, USAGE_DURATIONS } from "@/lib/site";
import type { Review, Software, StarDistribution } from "@/lib/types";
import { clamp, hashString, pick, seededRandom } from "@/lib/utils";

/**
 * Reviews are generated deterministically from the product slug, so the same
 * product always produces the same review set across builds, servers and
 * environments. The seed script writes exactly this data into Postgres, and
 * from that point the database is the source of truth.
 */

/** The date the corpus is anchored to, so review dates never drift per build. */
const CORPUS_ANCHOR = Date.UTC(2026, 6, 15);
const DAY = 86_400_000;

function bandFor(rating: number): Band {
  if (rating >= 4) return "high";
  if (rating === 3) return "mid";
  return "low";
}

/**
 * Build a plausible star distribution for a target average.
 * Real review sets are J shaped: mostly fours and fives, a thin middle, and a
 * small hard core of ones. A flat normal distribution reads as fabricated.
 */
function distributionFor(target: number): [number, number, number, number, number] {
  const t = clamp(target, 1, 5);
  // Weight each star by distance from the target, then skew towards five.
  // The floor matters: every real product has a hard core of one star
  // reviews, and a distribution without a tail reads as fabricated.
  const raw = [1, 2, 3, 4, 5].map((star) => {
    const distance = Math.abs(star - t);
    const base = Math.exp(-(distance ** 2) / 2.1);
    const skew = star === 5 ? 1.5 : star === 1 ? 1.15 : star === 3 ? 0.7 : 1;
    return base * skew + 0.02;
  });
  const total = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => v / total) as [number, number, number, number, number];
}

/** Turn a probability distribution into exact review counts summing to `count`. */
function countsFor(target: number, count: number): StarDistribution {
  const dist = distributionFor(target);
  const counts = dist.map((p) => Math.floor(p * count)) as unknown as StarDistribution;
  let remainder = count - counts.reduce((a, b) => a + b, 0);
  // Hand the remainder to the buckets with the largest fractional part.
  const order = dist
    .map((p, i) => ({ i, frac: p * count - Math.floor(p * count) }))
    .sort((a, b) => b.frac - a.frac);
  let cursor = 0;
  while (remainder > 0) {
    counts[order[cursor % 5].i] += 1;
    remainder -= 1;
    cursor += 1;
  }
  return counts;
}

/** Nudge a dimension rating around the overall score, staying inside 1 to 5. */
function dimension(overall: number, random: () => number, bias: number): number {
  const drift = Math.round((random() * 2 - 1) * 1.15 + bias);
  return clamp(overall + drift, 1, 5);
}

function buildCompany(random: () => number): string {
  const prefix = pick(COMPANY_PREFIXES, random);
  const suffix = pick(COMPANY_SUFFIXES, random);
  const form = random();
  if (form < 0.55) return `${prefix} ${suffix} (Pty) Ltd`;
  if (form < 0.8) return `${prefix} ${suffix}`;
  return `${prefix} ${suffix} CC`;
}

function sentenceFromFeature(feature: string): string {
  const trimmed = feature.replace(/\.$/, "");
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function composeSummary(
  software: Software,
  band: Band,
  random: () => number,
  overall: number,
): string {
  const pools = OPENERS[software.category_id] ?? OPENERS["cat-accounting"];
  const opener = pick(pools[band], random);
  const connector = pick(CONNECTORS, random);
  const closer = pick(CLOSERS[band], random);

  const feature =
    software.top_features.length > 0
      ? sentenceFromFeature(pick(software.top_features, random))
      : "the core functionality is solid";

  // Feature phrases arrive as both noun phrases and full clauses, so they are
  // set as their own sentence rather than spliced into one.
  const middle =
    band === "high"
      ? `${feature}. That is the part that genuinely changed how we work.`
      : band === "mid"
        ? `${feature}. Beyond that it is more ordinary than the marketing suggests.`
        : `${connector} the parts we were sold on never worked the way they were demonstrated.`;

  const scoreNote =
    overall === 5
      ? "Nothing has come up in the last year that I would call a real problem."
      : overall === 4
        ? "There are irritations, and none of them are the kind that make you look elsewhere."
        : overall === 3
          ? "It sits squarely in the middle for us, useful but not something I would champion."
          : overall === 2
            ? "The gaps are the kind that create work rather than save it."
            : "It has cost us more time than it has saved.";

  return `${opener} ${middle} ${scoreNote} ${closer}`;
}

function composePros(software: Software, band: Band, random: () => number): string {
  const pool = (PROS[software.category_id] ?? PROS["cat-accounting"])[band];
  const chosen = new Set<string>();
  const want = band === "high" ? 3 : band === "mid" ? 2 : 1;

  // One point always comes from the product's own record so the review is specific.
  if (band !== "low" && software.top_features.length > 0) {
    chosen.add(sentenceFromFeature(pick(software.top_features, random)));
  }
  let guard = 0;
  while (chosen.size < want && guard < 40) {
    chosen.add(pick(pool, random));
    guard += 1;
  }
  return Array.from(chosen).join(". ") + ".";
}

function composeCons(software: Software, band: Band, random: () => number): string {
  const pool = (CONS[software.category_id] ?? CONS["cat-accounting"])[band];
  const chosen = new Set<string>();
  const want = band === "low" ? 3 : band === "mid" ? 2 : 1;
  let guard = 0;
  while (chosen.size < want && guard < 40) {
    chosen.add(pick(pool, random));
    guard += 1;
  }
  return Array.from(chosen).join(". ") + ".";
}

function jobTitleFor(categoryId: string, random: () => number): string {
  const pools = CATEGORY_ROLE_POOLS[categoryId] ?? ["finance"];
  const poolKey = pick(pools, random);
  return pick(JOB_TITLES[poolKey], random);
}

/**
 * Generate the full review set for one product. Deterministic: the same slug
 * always produces byte identical output.
 */
function generateReviews(software: Software): Review[] {
  const random = seededRandom(hashString(software.slug));
  const counts = countsFor(software.overall_rating, software.review_count);

  const reviews: Review[] = [];
  let index = 0;

  for (let starIndex = 4; starIndex >= 0; starIndex -= 1) {
    const overall = starIndex + 1;
    const band = bandFor(overall);

    for (let n = 0; n < counts[starIndex]; n += 1) {
      const firstName = pick(FIRST_NAMES, random);
      const lastName = pick(LAST_NAMES, random);
      const city = pick(CITIES, random);
      const country = random() < 0.93 ? "South Africa" : pick(
        ["Namibia", "Botswana", "Zambia", "Zimbabwe", "Kenya", "Nigeria"] as const,
        random,
      );

      // Reviews are spread over the last three years, weighted towards recent.
      const ageDays = Math.floor((random() ** 1.7) * 1080);
      const reviewDate = new Date(CORPUS_ANCHOR - ageDays * DAY);

      const titlePool = (TITLES[software.category_id] ?? TITLES["cat-accounting"])[band];

      const hasVendorResponse = band !== "high" && random() < 0.22;
      const responseDate = new Date(
        reviewDate.getTime() + Math.floor(random() * 12 + 2) * DAY,
      );

      reviews.push({
        id: `rev-${software.slug}-${index}`,
        software_id: software.id,
        software_slug: software.slug,
        software_name: software.name,

        reviewer_name: `${firstName} ${lastName}`,
        reviewer_job_title: jobTitleFor(software.category_id, random),
        reviewer_company: random() < 0.72 ? buildCompany(random) : null,
        reviewer_industry: pick(INDUSTRIES, random),
        reviewer_company_size: pick(COMPANY_SIZES, random),
        reviewer_country: country,
        reviewer_city: country === "South Africa" ? city : null,
        reviewer_avatar_url: null,
        verified_linkedin: random() < 0.38,
        verified_badge: random() < 0.81,
        used_for_duration: pick(USAGE_DURATIONS, random),

        overall_rating: overall,
        ease_of_use: dimension(overall, random, software.category_id === "cat-erp" ? -0.4 : 0),
        value_for_money: dimension(overall, random, software.starting_price === 0 ? 0.4 : 0),
        customer_service: dimension(overall, random, -0.15),
        functionality: dimension(overall, random, 0.15),

        review_title: pick(titlePool, random),
        summary: composeSummary(software, band, random, overall),
        pros: composePros(software, band, random),
        cons: composeCons(software, band, random),

        vendor_response: hasVendorResponse ? pick(VENDOR_RESPONSES, random) : null,
        vendor_response_date: hasVendorResponse ? responseDate.toISOString() : null,

        review_date: reviewDate.toISOString(),
        helpful_count: Math.floor(random() ** 2.4 * 48),
        status: "published",
      });

      index += 1;
    }
  }

  // Interleave by date so the archive reads naturally rather than by star.
  reviews.sort((a, b) => b.review_date.localeCompare(a.review_date));
  return reviews;
}

const cache = new Map<string, Review[]>();

/** Memoised per product, because a profile page needs one product's reviews. */
export function getReviewsFor(software: Software): Review[] {
  const existing = cache.get(software.slug);
  if (existing) return existing;
  const generated = generateReviews(software);
  cache.set(software.slug, generated);
  return generated;
}

export function starDistribution(reviews: Review[]): StarDistribution {
  const counts: StarDistribution = [0, 0, 0, 0, 0];
  for (const review of reviews) {
    counts[clamp(Math.round(review.overall_rating), 1, 5) - 1] += 1;
  }
  return counts;
}

/**
 * Recompute the five averages the way the database trigger does. Application
 * code must never invent a star average, and this is the single place the
 * dev dataset derives them.
 */
export function aggregateFromReviews(reviews: Review[]) {
  const published = reviews.filter((r) => r.status === "published");
  const count = published.length;
  if (count === 0) {
    return {
      overall_rating: 0,
      ease_of_use_rating: 0,
      value_for_money_rating: 0,
      customer_service_rating: 0,
      functionality_rating: 0,
      review_count: 0,
    };
  }

  const sum = (key: keyof Review) =>
    published.reduce((total, review) => total + (review[key] as number), 0);

  const round1 = (value: number) => Math.round((value / count) * 10) / 10;

  return {
    overall_rating: round1(sum("overall_rating")),
    ease_of_use_rating: round1(sum("ease_of_use")),
    value_for_money_rating: round1(sum("value_for_money")),
    customer_service_rating: round1(sum("customer_service")),
    functionality_rating: round1(sum("functionality")),
    review_count: count,
  };
}

/** Reviewer company size breakdown, used by the profile page chart. */
export function companySizeBreakdown(reviews: Review[]): { name: string; value: number }[] {
  const tally = new Map<string, number>();
  for (const review of reviews) {
    tally.set(review.reviewer_company_size, (tally.get(review.reviewer_company_size) ?? 0) + 1);
  }
  return COMPANY_SIZES.map((size) => ({ name: size, value: tally.get(size) ?? 0 })).filter(
    (entry) => entry.value > 0,
  );
}
