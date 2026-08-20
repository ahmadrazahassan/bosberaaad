import { ARTICLES, ARTICLE_BY_SLUG, ARTICLE_TAGS } from "@/lib/data/articles";
import { CATEGORIES, CATEGORY_BY_SLUG } from "@/lib/data/categories";
import { COMPARISONS } from "@/lib/data/comparisons";
import { PAGE_BY_SLUG, STATIC_PAGES } from "@/lib/data/pages";
import { SOFTWARE, TOTAL_REVIEW_COUNT } from "@/lib/data/software";
import { createSupabaseReadClient } from "@/lib/supabase/server";
import type { Article, Category, Comparison, SiteStats, Software, StaticPage } from "@/lib/types";

import { rowToArticle, rowToCategory, rowToComparison, rowToPage } from "./mappers";

/* -------------------------------------------------------------------------- */
/* Categories                                                                  */
/* -------------------------------------------------------------------------- */

export async function getCategories(): Promise<Category[]> {
  const supabase = createSupabaseReadClient();
  if (!supabase) return CATEGORIES;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data || data.length === 0) return CATEGORIES;
  return data.map(rowToCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? CATEGORY_BY_SLUG.get(slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Articles                                                                    */
/* -------------------------------------------------------------------------- */

async function fetchArticles(): Promise<Article[]> {
  const supabase = createSupabaseReadClient();
  if (!supabase) return ARTICLES;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false });

  if (error || !data || data.length === 0) return ARTICLES;
  return data.map(rowToArticle);
}

export async function getArticles(options: { page?: number; perPage?: number; tag?: string } = {}) {
  const { page = 1, perPage = 9, tag } = options;
  const all = await fetchArticles();
  const filtered = tag ? all.filter((a) => a.category_tag === tag) : all;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: filtered.slice(start, start + perPage),
    total,
    page: safePage,
    perPage,
    totalPages,
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await fetchArticles();
  return all.find((a) => a.slug === slug) ?? ARTICLE_BY_SLUG.get(slug) ?? null;
}

export async function getLatestArticles(limit = 3): Promise<Article[]> {
  const all = await fetchArticles();
  return all.slice(0, limit);
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const all = await fetchArticles();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const all = await fetchArticles();
  const sameTag = all.filter((a) => a.id !== article.id && a.category_tag === article.category_tag);
  const rest = all.filter((a) => a.id !== article.id && a.category_tag !== article.category_tag);
  return [...sameTag, ...rest].slice(0, limit);
}

export async function getArticleTags(): Promise<string[]> {
  const all = await fetchArticles();
  const tags = Array.from(new Set(all.map((a) => a.category_tag))).sort();
  return tags.length > 0 ? tags : ARTICLE_TAGS;
}

export async function getArticleSlugs(): Promise<string[]> {
  const all = await fetchArticles();
  return all.map((a) => a.slug);
}

export async function searchArticles(query: string, limit = 6): Promise<Article[]> {
  if (!query.trim()) return [];
  const all = await fetchArticles();
  const needle = query.toLowerCase();
  return all
    .filter((a) => `${a.title} ${a.excerpt} ${a.category_tag}`.toLowerCase().includes(needle))
    .slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Comparisons                                                                 */
/* -------------------------------------------------------------------------- */

export type ResolvedComparison = Comparison & { software_a: Software; software_b: Software };

async function fetchComparisons(): Promise<Comparison[]> {
  const supabase = createSupabaseReadClient();
  if (!supabase) return COMPARISONS;

  const { data, error } = await supabase.from("comparisons").select("*").eq("status", "published");
  if (error || !data || data.length === 0) return COMPARISONS;
  return data.map(rowToComparison);
}

export async function getComparisons(): Promise<ResolvedComparison[]> {
  const { getAllSoftware } = await import("./software");
  const [comparisons, software] = await Promise.all([fetchComparisons(), getAllSoftware()]);
  const byId = new Map(software.map((s) => [s.id, s]));

  return comparisons
    .map((comparison) => {
      const a = byId.get(comparison.software_a_id);
      const b = byId.get(comparison.software_b_id);
      return a && b ? { ...comparison, software_a: a, software_b: b } : null;
    })
    .filter((entry): entry is ResolvedComparison => entry !== null);
}

/**
 * Both orderings resolve. `xero-vs-sage-accounting` and the reverse both find
 * the same record, and the page canonicalises to the authored order so a long
 * tail query is never lost to a 404.
 */
export async function getComparisonByPair(pair: string): Promise<{
  comparison: ResolvedComparison;
  canonicalPair: string;
  reversed: boolean;
} | null> {
  const separator = pair.indexOf("-vs-");
  if (separator === -1) return null;

  const first = pair.slice(0, separator);
  const second = pair.slice(separator + 4);
  if (!first || !second) return null;

  const comparisons = await getComparisons();

  const direct = comparisons.find(
    (c) => c.software_a.slug === first && c.software_b.slug === second,
  );
  if (direct) {
    return {
      comparison: direct,
      canonicalPair: `${direct.software_a.slug}-vs-${direct.software_b.slug}`,
      reversed: false,
    };
  }

  const reversed = comparisons.find(
    (c) => c.software_a.slug === second && c.software_b.slug === first,
  );
  if (reversed) {
    return {
      comparison: reversed,
      canonicalPair: `${reversed.software_a.slug}-vs-${reversed.software_b.slug}`,
      reversed: true,
    };
  }

  // No authored comparison. Build one on the fly from two real products so any
  // valid pair of slugs produces a useful page rather than a dead end.
  const { getSoftwareBySlug } = await import("./software");
  const [a, b] = await Promise.all([getSoftwareBySlug(first), getSoftwareBySlug(second)]);
  if (!a || !b || a.id === b.id) return null;

  return {
    comparison: {
      id: `cmp-${a.slug}-vs-${b.slug}`,
      software_a_id: a.id,
      software_b_id: b.id,
      custom_verdict: null,
      meta_title: null,
      meta_description: null,
      status: "published",
      software_a: a,
      software_b: b,
    },
    canonicalPair: `${a.slug}-vs-${b.slug}`,
    reversed: false,
  };
}

export async function getComparisonPairs(): Promise<string[]> {
  const comparisons = await getComparisons();
  return comparisons.map((c) => `${c.software_a.slug}-vs-${c.software_b.slug}`);
}

/* -------------------------------------------------------------------------- */
/* Static pages                                                                */
/* -------------------------------------------------------------------------- */

export async function getPageBySlug(slug: string): Promise<StaticPage | null> {
  const supabase = createSupabaseReadClient();
  if (!supabase) return PAGE_BY_SLUG.get(slug) ?? null;

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return PAGE_BY_SLUG.get(slug) ?? null;
  return rowToPage(data);
}

export async function getPageSlugs(): Promise<string[]> {
  return STATIC_PAGES.map((p) => p.slug);
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                       */
/* -------------------------------------------------------------------------- */

export async function getSiteStats(): Promise<SiteStats> {
  const supabase = createSupabaseReadClient();

  if (supabase) {
    const [software, categories, articles] = await Promise.all([
      supabase.from("software").select("review_count").eq("status", "published"),
      supabase.from("categories").select("id"),
      supabase.from("articles").select("id").eq("status", "published"),
    ]);

    if (software.data && software.data.length > 0) {
      return {
        reviews: software.data.reduce(
          (total, row) => total + (Number((row as { review_count: number }).review_count) || 0),
          0,
        ),
        software: software.data.length,
        categories: categories.data?.length ?? CATEGORIES.length,
        articles: articles.data?.length ?? ARTICLES.length,
      };
    }
  }

  return {
    reviews: TOTAL_REVIEW_COUNT,
    software: SOFTWARE.length,
    categories: CATEGORIES.length,
    articles: ARTICLES.length,
  };
}
