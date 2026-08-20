import type { Article } from "@/lib/types";
import { readingTime, stripHtml, truncate } from "@/lib/utils";

export type Author = {
  name: string;
  title: string;
  bio: string;
};

export const AUTHORS: Record<string, Author> = {
  hanli: {
    name: "Hanli Marais",
    title: "Editor",
    bio: "Hanli spent eleven years as a financial journalist covering South African small business before starting Bosberaaad. She holds a BCom in accounting and has sat through more software demonstrations than she cares to count.",
  },
  sipho: {
    name: "Sipho Ndlovu",
    title: "Senior reviewer, finance systems",
    bio: "Sipho is a CA(SA) who spent eight years in practice before moving into systems consulting. He has implemented accounting and ERP software for businesses from four staff to four hundred.",
  },
  reneile: {
    name: "Reneilwe Mokoena",
    title: "Reviewer, payroll and HR",
    bio: "Reneilwe has run payroll for organisations of up to twelve hundred employees and has completed more EMP501 reconciliations than anyone should. She writes about payroll, HR and South African labour compliance.",
  },
  daniel: {
    name: "Daniel Petersen",
    title: "Reviewer, sales and project systems",
    bio: "Daniel has led sales operations at two South African software companies and now advises businesses on CRM and project management selection. He is unsentimental about tools nobody uses.",
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
    author_bio: author.bio,
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
