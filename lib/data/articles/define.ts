import type { Article } from "@/lib/types";
import { readingTime, stripHtml, truncate } from "@/lib/utils";

export type Author = {
  name: string;
  title: string;
  /**
   * Optional on purpose. A byline may carry a name and a role with no bio at
   * all; what it may never carry is a bio somebody else wrote for it. Each
   * person supplies their own, or the site shows none.
   */
  bio?: string;
};

export const AUTHORS: Record<string, Author> = {
  /*
   * Real people, named because POPIA and PAIA both require someone
   * accountable and because a review is worth less when nobody signs it.
   *
   * TODO(bosberaaad): each person to supply their own bio. Nothing is written
   * here on their behalf. Qualifications in particular must come from the
   * person who holds them, and any protected designation (CA(SA), for one)
   * must be verifiable with the body that awards it.
   */
  kinza: {
    name: "Kinza Shahzad",
    title: "Founder and editor",
  },
  kanizan: {
    name: "Kanizan Hassan",
    title: "Reviewer",
  },
  haseeba: {
    name: "Haseeba bibi",
    title: "Reviewer",
  },
};

export type ArticleSeed = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_tag: string;
  author: keyof typeof AUTHORS;
  published_date: string;
  related_software_id?: string;
  featured?: boolean;
  meta_title?: string;
  meta_description?: string;
};

export function defineArticle(seed: ArticleSeed): Article {
  const author = AUTHORS[seed.author];
  return {
    id: `art-${seed.slug}`,
    title: seed.title,
    slug: seed.slug,
    excerpt: seed.excerpt,
    content: seed.content,
    featured_image_url: null,
    category_tag: seed.category_tag,
    related_software_id: seed.related_software_id ?? null,
    author_name: author.name,
    author_bio: author.bio ?? "",
    author_avatar_url: null,
    author_title: author.title,
    meta_title: seed.meta_title ?? seed.title,
    meta_description:
      seed.meta_description ?? truncate(stripHtml(seed.excerpt), 155),
    og_image_url: null,
    read_time_minutes: readingTime(seed.content),
    status: "published",
    featured: seed.featured ?? false,
    published_date: seed.published_date,
  };
}
