import { companySizeBreakdown, getReviewsFor, starDistribution } from "@/lib/data/reviews";
import { SOFTWARE_BY_ID } from "@/lib/data/software";
import type { ReviewSort } from "@/lib/sorting";
import { createSupabaseReadClient } from "@/lib/supabase/server";
import type { Review, Software, StarDistribution } from "@/lib/types";

import { rowToReview } from "./mappers";

export type ReviewFilters = {
  rating?: number;
  companySize?: string;
  industry?: string;
  sort?: ReviewSort;
  page?: number;
  perPage?: number;
};

export { REVIEW_SORTS, type ReviewSort } from "@/lib/sorting";

async function fetchReviews(software: Software): Promise<Review[]> {
  const supabase = createSupabaseReadClient();
  if (!supabase) return getReviewsFor(SOFTWARE_BY_ID.get(software.id) ?? software);

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("software_id", software.id)
    .eq("status", "published")
    .order("review_date", { ascending: false });

  if (error || !data) return getReviewsFor(SOFTWARE_BY_ID.get(software.id) ?? software);
  return data.map(rowToReview);
}

export async function getReviews(software: Software): Promise<Review[]> {
  return fetchReviews(software);
}

export async function getReviewHighlights(software: Software, limit = 3): Promise<Review[]> {
  const reviews = await fetchReviews(software);
  // A useful highlight set is not three five star reviews. Lead with the most
  // helpful, and make sure at least one critical review is visible.
  const byHelpful = [...reviews].sort((a, b) => b.helpful_count - a.helpful_count);
  const positive = byHelpful.filter((r) => r.overall_rating >= 4).slice(0, limit - 1);
  const critical = byHelpful.find((r) => r.overall_rating <= 3);

  const selected = [...positive];
  if (critical && selected.length < limit) selected.push(critical);
  for (const review of byHelpful) {
    if (selected.length >= limit) break;
    if (!selected.includes(review)) selected.push(review);
  }
  return selected.slice(0, limit);
}

export async function getReviewArchive(
  software: Software,
  filters: ReviewFilters = {},
): Promise<{
  items: Review[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}> {
  const { rating, companySize, industry, sort = "recent", page = 1, perPage = 10 } = filters;

  let items = await fetchReviews(software);
  if (rating) items = items.filter((r) => Math.round(r.overall_rating) === rating);
  if (companySize) items = items.filter((r) => r.reviewer_company_size === companySize);
  if (industry) items = items.filter((r) => r.reviewer_industry === industry);

  const sorted = [...items].sort((a, b) => {
    switch (sort) {
      case "helpful":
        return b.helpful_count - a.helpful_count;
      case "highest":
        return b.overall_rating - a.overall_rating || b.helpful_count - a.helpful_count;
      case "lowest":
        return a.overall_rating - b.overall_rating || b.helpful_count - a.helpful_count;
      case "recent":
      default:
        return b.review_date.localeCompare(a.review_date);
    }
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return { items: sorted.slice(start, start + perPage), total, page: safePage, perPage, totalPages };
}

export async function getStarDistribution(software: Software): Promise<StarDistribution> {
  return starDistribution(await fetchReviews(software));
}

export async function getCompanySizeBreakdown(software: Software) {
  return companySizeBreakdown(await fetchReviews(software));
}

/** Distinct industries present in a product's review set, for the filter list. */
export async function getReviewIndustries(software: Software): Promise<string[]> {
  const reviews = await fetchReviews(software);
  return Array.from(new Set(reviews.map((r) => r.reviewer_industry))).sort();
}

/**
 * Sentiment split for the strip on software cards. Positive is four and five
 * stars, neutral is three, critical is one and two.
 */
export function sentimentFromDistribution(distribution: StarDistribution) {
  const total = distribution.reduce((a, b) => a + b, 0) || 1;
  const positive = distribution[3] + distribution[4];
  const neutral = distribution[2];
  const critical = distribution[0] + distribution[1];
  return {
    positive: (positive / total) * 100,
    neutral: (neutral / total) * 100,
    critical: (critical / total) * 100,
    total,
  };
}
