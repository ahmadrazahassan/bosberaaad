import { formatRating } from "@/lib/format";
import type { SearchIndexEntry } from "@/lib/types";

import { getArticles, getCategories, getComparisons, searchArticles } from "./content";
import { getAllSoftware, searchSoftware } from "./software";

/**
 * Index built once in the public layout and handed to the command palette.
 * Small enough to ship to the client, large enough to be genuinely useful.
 */
export async function buildSearchIndex(): Promise<SearchIndexEntry[]> {
  const [software, articles, categories, comparisons] = await Promise.all([
    getAllSoftware(),
    getArticles({ perPage: 100 }),
    getCategories(),
    getComparisons(),
  ]);

  return [
    ...software.map((item) => ({
      type: "software" as const,
      title: item.name,
      subtitle: item.category?.name ?? item.vendor_name ?? "Software",
      href: `/software/${item.slug}`,
      rating: item.overall_rating,
    })),
    ...articles.items.map((article) => ({
      type: "article" as const,
      title: article.title,
      subtitle: article.category_tag,
      href: `/blog/${article.slug}`,
    })),
    ...categories.map((category) => ({
      type: "category" as const,
      title: category.name,
      subtitle: `${category.software_count} products reviewed`,
      href: `/category/${category.slug}`,
    })),
    ...comparisons.map((comparison) => ({
      type: "comparison" as const,
      title: `${comparison.software_a.name} vs ${comparison.software_b.name}`,
      subtitle: `${formatRating(comparison.software_a.overall_rating)} against ${formatRating(comparison.software_b.overall_rating)}`,
      href: `/compare/${comparison.software_a.slug}-vs-${comparison.software_b.slug}`,
    })),
  ];
}

export type SiteSearchResults = Awaited<ReturnType<typeof siteSearch>>;

export async function siteSearch(query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: trimmed, software: [], articles: [], total: 0 };
  }

  const [software, articles] = await Promise.all([
    searchSoftware(trimmed, 20),
    searchArticles(trimmed, 12),
  ]);

  return { query: trimmed, software, articles, total: software.length + articles.length };
}
