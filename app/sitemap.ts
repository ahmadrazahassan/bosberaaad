import type { MetadataRoute } from "next";

import {
  getArticles,
  getCategories,
  getComparisonPairs,
  getPageSlugs,
} from "@/lib/queries/content";
import { getAllSoftware } from "@/lib/queries/software";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

/**
 * Generated from the data, so a new product, article or comparison appears in
 * the sitemap on the next revalidation without anyone maintaining a list.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [software, articles, categories, comparisonPairs, pageSlugs] = await Promise.all([
    getAllSoftware(),
    getArticles({ perPage: 1000 }),
    getCategories(),
    getComparisonPairs(),
    getPageSlugs(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/software`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const softwareRoutes: MetadataRoute.Sitemap = software.flatMap((item) => {
    const lastModified = new Date(item.updated_at);
    return [
      {
        url: `${SITE_URL}/software/${item.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: item.featured ? 0.9 : 0.8,
      },
      {
        url: `${SITE_URL}/software/${item.slug}/reviews`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      {
        url: `${SITE_URL}/software/${item.slug}/alternatives`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ];
  });

  const articleRoutes: MetadataRoute.Sitemap = articles.items.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.published_date),
    changeFrequency: "monthly",
    priority: article.featured ? 0.8 : 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisonPairs.map((pair) => ({
    url: `${SITE_URL}/compare/${pair}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const legalRoutes: MetadataRoute.Sitemap = pageSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...staticRoutes,
    ...softwareRoutes,
    ...categoryRoutes,
    ...comparisonRoutes,
    ...articleRoutes,
    ...legalRoutes,
  ];
}
