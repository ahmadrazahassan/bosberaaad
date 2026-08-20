import { alternativesFor } from "@/lib/data/alternatives";
import { CATEGORIES, CATEGORY_BY_ID } from "@/lib/data/categories";
import { SOFTWARE, SOFTWARE_BY_ID, SOFTWARE_BY_SLUG } from "@/lib/data/software";
import { rankByBayesian } from "@/lib/ranking";
import type { DirectorySort } from "@/lib/sorting";
import { createSupabaseReadClient } from "@/lib/supabase/server";
import type { Software } from "@/lib/types";

import { rowToSoftware } from "./mappers";

const SELECT = "*, categories(*)";

function attachCategory(software: Software): Software {
  return { ...software, category: CATEGORY_BY_ID.get(software.category_id) ?? null };
}

export type DirectoryFilters = {
  category?: string;
  minRating?: number;
  freeTrial?: boolean;
  freeVersion?: boolean;
  paidOnly?: boolean;
  bestForSize?: string;
  search?: string;
  sort?: DirectorySort;
  page?: number;
  perPage?: number;
};

export { DIRECTORY_SORTS, type DirectorySort } from "@/lib/sorting";

export type DirectoryResult = {
  items: Software[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

function applySort(items: Software[], sort: DirectorySort, priorSet: Software[]): Software[] {
  switch (sort) {
    case "highest-rated":
      // Bayesian, not a raw average, so review volume counts.
      return rankByBayesian(items, priorSet);
    case "recently-updated":
      return [...items].sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    case "price-low":
      return [...items].sort((a, b) => {
        const priceA = a.starting_price ?? Number.POSITIVE_INFINITY;
        const priceB = b.starting_price ?? Number.POSITIVE_INFINITY;
        if (priceA !== priceB) return priceA - priceB;
        return b.review_count - a.review_count;
      });
    case "most-reviewed":
    default:
      return [...items].sort((a, b) => b.review_count - a.review_count);
  }
}

async function fetchAllPublished(): Promise<Software[]> {
  const supabase = createSupabaseReadClient();
  if (!supabase) return SOFTWARE.map(attachCategory);

  const { data, error } = await supabase.from("software").select(SELECT).eq("status", "published");
  if (error || !data) return SOFTWARE.map(attachCategory);
  return data.map(rowToSoftware);
}

export async function getAllSoftware(): Promise<Software[]> {
  return fetchAllPublished();
}

export async function getSoftwareBySlug(slug: string): Promise<Software | null> {
  const supabase = createSupabaseReadClient();
  if (!supabase) {
    const local = SOFTWARE_BY_SLUG.get(slug);
    return local ? attachCategory(local) : null;
  }

  const { data, error } = await supabase
    .from("software")
    .select(SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    const local = SOFTWARE_BY_SLUG.get(slug);
    return local ? attachCategory(local) : null;
  }
  return rowToSoftware(data);
}

export async function getSoftwareById(id: string): Promise<Software | null> {
  const all = await fetchAllPublished();
  return all.find((item) => item.id === id) ?? SOFTWARE_BY_ID.get(id) ?? null;
}

export async function getSoftwareSlugs(): Promise<string[]> {
  const all = await fetchAllPublished();
  return all.map((item) => item.slug);
}

export async function getDirectory(filters: DirectoryFilters = {}): Promise<DirectoryResult> {
  const {
    category,
    minRating = 0,
    freeTrial,
    freeVersion,
    paidOnly,
    bestForSize,
    search,
    sort = "most-reviewed",
    page = 1,
    perPage = 10,
  } = filters;

  const all = await fetchAllPublished();

  let items = all;
  if (category) {
    const categoryRecord = CATEGORIES.find((c) => c.slug === category);
    items = items.filter(
      (item) => item.category?.slug === category || item.category_id === categoryRecord?.id,
    );
  }
  if (minRating > 0) items = items.filter((item) => item.overall_rating >= minRating);
  if (freeTrial) items = items.filter((item) => item.free_trial);
  if (freeVersion) items = items.filter((item) => item.free_version);
  if (paidOnly) items = items.filter((item) => !item.free_version);
  if (bestForSize) items = items.filter((item) => item.best_for_size.includes(bestForSize));
  if (search) {
    const needle = search.toLowerCase();
    items = items.filter((item) =>
      [item.name, item.tagline ?? "", item.description_short, item.vendor_name ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }

  const sorted = applySort(items, sort, all);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: sorted.slice(start, start + perPage),
    total,
    page: safePage,
    perPage,
    totalPages,
  };
}

export async function getFeaturedSoftware(limit = 6): Promise<Software[]> {
  const all = await fetchAllPublished();
  const featured = all.filter((item) => item.featured);
  const pool = featured.length >= limit ? featured : all;
  return rankByBayesian(pool, all).slice(0, limit);
}

export async function getTopRatedSoftware(limit = 3): Promise<Software[]> {
  const all = await fetchAllPublished();
  return rankByBayesian(all).slice(0, limit);
}

export async function getRecentlyReviewedSoftware(limit = 3): Promise<Software[]> {
  const all = await fetchAllPublished();
  return [...all].sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, limit);
}

export async function getSoftwareByCategory(categorySlug: string): Promise<Software[]> {
  const all = await fetchAllPublished();
  const inCategory = all.filter((item) => item.category?.slug === categorySlug);
  return rankByBayesian(inCategory, all);
}

/**
 * Curated alternatives first. Where no curated set exists we fall back to
 * category peers, and we say so on the page rather than passing the fallback
 * off as an editorial recommendation.
 */
export async function getAlternatives(
  software: Software,
  limit = 6,
): Promise<{ items: { software: Software; reason: string | null }[]; curated: boolean }> {
  const all = await fetchAllPublished();
  const curated = alternativesFor(software.id);

  if (curated.length > 0) {
    const items = curated
      .map((entry) => {
        const match = all.find((item) => item.id === entry.alternative_id);
        return match ? { software: match, reason: entry.reason } : null;
      })
      .filter((entry): entry is { software: Software; reason: string } => entry !== null)
      .slice(0, limit);
    if (items.length > 0) return { items, curated: true };
  }

  const peers = rankByBayesian(
    all.filter((item) => item.category_id === software.category_id && item.id !== software.id),
    all,
  ).slice(0, limit);

  return { items: peers.map((peer) => ({ software: peer, reason: null })), curated: false };
}

export async function searchSoftware(query: string, limit = 8): Promise<Software[]> {
  if (!query.trim()) return [];
  const all = await fetchAllPublished();
  const needle = query.toLowerCase();
  return all
    .filter((item) =>
      [item.name, item.tagline ?? "", item.description_short, item.vendor_name ?? "", item.slug]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    )
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(needle) ? 0 : 1;
      const bStarts = b.name.toLowerCase().startsWith(needle) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return b.review_count - a.review_count;
    })
    .slice(0, limit);
}
