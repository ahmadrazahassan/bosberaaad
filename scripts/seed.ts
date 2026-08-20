import { SOFTWARE_ALTERNATIVES } from "@/lib/data/alternatives";
import { ARTICLES } from "@/lib/data/articles";
import { CATEGORIES } from "@/lib/data/categories";
import { COMPARISONS } from "@/lib/data/comparisons";
import { STATIC_PAGES } from "@/lib/data/pages";
import { getReviewsFor } from "@/lib/data/reviews";
import { SOFTWARE } from "@/lib/data/software";

import { getServiceClient, insertInBatches, log } from "./_client";

/**
 * Full seed. Idempotent by slug, so re running it updates rather than
 * duplicates.
 *
 * Aggregate ratings are deliberately NOT written here. The
 * update_software_ratings() trigger computes them from the reviews this script
 * inserts, which is exactly the guarantee the live site relies on. If the seed
 * wrote them, the seed would be the one place in the system where a star
 * average came from application code.
 *
 * The scoped scripts (`seed:reviews`, `seed:articles` and so on) set SEED_ONLY
 * and re enter this file, so there is one code path and the two can never
 * disagree about the shape of a row. Reference data that later steps depend on
 * always runs.
 */
const only = process.env.SEED_ONLY;
const shouldSeed = (step: string) => !only || only === step;

async function main() {
  const client = getServiceClient();

  log(only ? `\nSeeding Bosberaaad: ${only} only\n` : "\nSeeding Bosberaaad\n");

  /* -------------------------------------------------------------- categories */
  log("Categories");
  await insertInBatches(
    client,
    "categories",
    CATEGORIES.map((category) => ({
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      description: category.description,
      intro: category.intro ?? null,
      display_order: category.display_order,
    })),
    500,
    "slug",
  );

  const { data: categoryRows } = await client.from("categories").select("id, slug");
  const categoryIdBySlug = new Map((categoryRows ?? []).map((row) => [row.slug, row.id]));
  const localCategorySlug = new Map(CATEGORIES.map((category) => [category.id, category.slug]));

  /* ---------------------------------------------------------------- software */
  log("\nSoftware");
  await insertInBatches(
    client,
    "software",
    SOFTWARE.map((item) => ({
      name: item.name,
      slug: item.slug,
      tagline: item.tagline,
      description_short: item.description_short,
      description_full: item.description_full,
      logo_url: item.logo_url,
      screenshots: item.screenshots,
      category_id: categoryIdBySlug.get(localCategorySlug.get(item.category_id) ?? "") ?? null,

      starting_price: item.starting_price,
      price_currency: item.price_currency,
      billing_period: item.billing_period,
      price_vat_inclusive: item.price_vat_inclusive,
      price_checked_at: item.price_checked_at,
      pricing_note: item.pricing_note,
      free_trial: item.free_trial,
      free_version: item.free_version,
      pricing_plans: item.pricing_plans,

      features: item.features,
      top_features: item.top_features,
      integrations: item.integrations,
      brand_color: item.brand_color,

      compliance: item.compliance,
      bank_feeds: item.bank_feeds,
      best_for_size: item.best_for_size,
      best_for_role: item.best_for_role,

      affiliate_url: item.affiliate_url,
      vendor_website: item.vendor_website,
      vendor_name: item.vendor_name,
      founded_year: item.founded_year,
      support_types: item.support_types,
      countries_available: item.countries_available,
      languages: item.languages,

      meta_title: item.meta_title,
      meta_description: item.meta_description,
      status: item.status,
      featured: item.featured,
      // overall_rating and review_count omitted on purpose. The trigger owns them.
    })),
    100,
    "slug",
  );

  const { data: softwareRows } = await client.from("software").select("id, slug");
  const softwareIdBySlug = new Map((softwareRows ?? []).map((row) => [row.slug, row.id]));
  const localSoftwareSlug = new Map(SOFTWARE.map((item) => [item.id, item.slug]));

  const resolveSoftware = (localId: string) =>
    softwareIdBySlug.get(localSoftwareSlug.get(localId) ?? "") ?? null;

  /* ----------------------------------------------------------------- reviews */
  if (shouldSeed("reviews")) {
    log("\nReviews");

    const reviews = SOFTWARE.flatMap((item) => {
      const softwareId = resolveSoftware(item.id);
      if (!softwareId) return [];

      return getReviewsFor(item).map((review) => ({
        software_id: softwareId,
        reviewer_name: review.reviewer_name,
        reviewer_job_title: review.reviewer_job_title,
        reviewer_company: review.reviewer_company,
        reviewer_industry: review.reviewer_industry,
        reviewer_company_size: review.reviewer_company_size,
        reviewer_country: review.reviewer_country,
        reviewer_city: review.reviewer_city,
        verified_linkedin: review.verified_linkedin,
        verified_badge: review.verified_badge,
        used_for_duration: review.used_for_duration,
        overall_rating: review.overall_rating,
        ease_of_use: review.ease_of_use,
        value_for_money: review.value_for_money,
        customer_service: review.customer_service,
        functionality: review.functionality,
        review_title: review.review_title,
        summary: review.summary,
        pros: review.pros,
        cons: review.cons,
        vendor_response: review.vendor_response,
        vendor_response_date: review.vendor_response_date,
        review_date: review.review_date,
        helpful_count: review.helpful_count,
        status: review.status,
      }));
    });

    // Reviews carry no natural key, so a re run clears them first rather than
    // doubling the corpus.
    await client.from("reviews").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await insertInBatches(client, "reviews", reviews, 500);
  }

  /* ------------------------------------------------------------ alternatives */
  if (shouldSeed("alternatives")) {
    log("\nAlternatives");

    const alternatives = SOFTWARE_ALTERNATIVES.map((entry) => ({
      software_id: resolveSoftware(entry.software_id),
      alternative_id: resolveSoftware(entry.alternative_id),
      display_order: entry.display_order,
      reason: entry.reason,
    })).filter((entry) => entry.software_id && entry.alternative_id);

    await insertInBatches(
      client,
      "software_alternatives",
      alternatives,
      500,
      "software_id,alternative_id",
    );
  }

  /* ---------------------------------------------------------------- articles */
  if (shouldSeed("articles")) {
    log("\nArticles");
    await insertInBatches(
      client,
      "articles",
      ARTICLES.map((article) => ({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        category_tag: article.category_tag,
        related_software_id: article.related_software_id
          ? resolveSoftware(article.related_software_id)
          : null,
        author_name: article.author_name,
        author_bio: article.author_bio,
        author_title: article.author_title,
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        read_time_minutes: article.read_time_minutes,
        status: article.status,
        featured: article.featured,
        published_date: article.published_date,
      })),
      100,
      "slug",
    );
  }

  /* ------------------------------------------------------------- comparisons */
  if (shouldSeed("comparisons")) {
    log("\nComparisons");

    const comparisons = COMPARISONS.map((comparison) => ({
      software_a_id: resolveSoftware(comparison.software_a_id),
      software_b_id: resolveSoftware(comparison.software_b_id),
      custom_verdict: comparison.custom_verdict,
      meta_description: comparison.meta_description,
      status: comparison.status,
    })).filter((row) => row.software_a_id && row.software_b_id);

    await insertInBatches(client, "comparisons", comparisons, 100, "software_a_id,software_b_id");
  }

  /* ------------------------------------------------------------------- pages */
  if (shouldSeed("pages")) {
    log("\nPages");
    await insertInBatches(
      client,
      "pages",
      STATIC_PAGES.map((page) => ({
        slug: page.slug,
        title: page.title,
        content: page.content,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        status: page.status,
      })),
      100,
      "slug",
    );
  }

  /* ------------------------------------------------------------------ verify */
  const { data: check } = await client
    .from("software")
    .select("name, overall_rating, review_count")
    .order("review_count", { ascending: false })
    .limit(5);

  log("\nDone. Ratings below were computed by the trigger, not by this script:\n");
  for (const row of check ?? []) {
    log(
      `  ${String(row.overall_rating).padStart(4)}  ${String(row.review_count).padStart(5)}  ${row.name}`,
    );
  }
  log("");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
