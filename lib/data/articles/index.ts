import type { Article } from "@/lib/types";

import { BUYING_GUIDES } from "./buying-guides";
import { COMPLIANCE_ARTICLES } from "./compliance";
import { PRACTICAL_ARTICLES } from "./practical";

export { AUTHORS } from "./define";

export const ARTICLES: Article[] = [
  ...BUYING_GUIDES,
  ...COMPLIANCE_ARTICLES,
  ...PRACTICAL_ARTICLES,
].sort((a, b) => b.published_date.localeCompare(a.published_date));

export const ARTICLE_BY_SLUG = new Map(ARTICLES.map((a) => [a.slug, a]));

export const ARTICLE_TAGS = Array.from(new Set(ARTICLES.map((a) => a.category_tag))).sort();
