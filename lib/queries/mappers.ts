import { getBrandColor } from "@/lib/brandColors";
import type { Article, Category, Comparison, Review, Software, StaticPage } from "@/lib/types";

/**
 * Row mappers. Postgres returns jsonb columns as parsed values already, so
 * these mostly guard against nulls and keep the shape identical to the
 * bundled dataset, which means every component works against either source.
 */

type Row = Record<string, unknown>;

const asArray = (value: unknown): string[] =>
  Array.isArray(value) ? (value.filter((v) => typeof v === "string") as string[]) : [];

const asNumber = (value: unknown, fallback = 0): number =>
  typeof value === "number" ? value : value === null || value === undefined ? fallback : Number(value) || fallback;

const asText = (value: unknown): string => (typeof value === "string" ? value : "");

const asNullableText = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

export function rowToCategory(row: Row): Category {
  return {
    id: asText(row.id),
    name: asText(row.name),
    slug: asText(row.slug),
    icon: asText(row.icon) || "Boxes",
    description: asText(row.description),
    intro: asNullableText(row.intro) ?? undefined,
    software_count: asNumber(row.software_count),
    display_order: asNumber(row.display_order),
    created_at: asNullableText(row.created_at) ?? undefined,
  };
}

export function rowToSoftware(row: Row): Software {
  const slug = asText(row.slug);
  const categoryRow = row.categories ?? row.category;

  return {
    id: asText(row.id),
    name: asText(row.name),
    slug,
    tagline: asNullableText(row.tagline),
    description_short: asText(row.description_short),
    description_full: asText(row.description_full),
    logo_url: asNullableText(row.logo_url),
    screenshots: asArray(row.screenshots),
    category_id: asText(row.category_id),
    category: categoryRow ? rowToCategory(categoryRow as Row) : null,

    starting_price: row.starting_price === null || row.starting_price === undefined
      ? null
      : asNumber(row.starting_price),
    price_currency: asText(row.price_currency) || "ZAR",
    billing_period: asText(row.billing_period) || "month",
    price_vat_inclusive:
      row.price_vat_inclusive === null || row.price_vat_inclusive === undefined
        ? null
        : Boolean(row.price_vat_inclusive),
    free_trial: Boolean(row.free_trial),
    free_version: Boolean(row.free_version),
    demo_available: Boolean(row.demo_available),
    demo_url: typeof row.demo_url === "string" ? row.demo_url : null,
    trial_note: typeof row.trial_note === "string" ? row.trial_note : null,
    pricing_plans: Array.isArray(row.pricing_plans)
      ? (row.pricing_plans as Software["pricing_plans"])
      : [],
    pricing_note: asNullableText(row.pricing_note),
    price_checked_at: asNullableText(row.price_checked_at),

    features: asArray(row.features),
    top_features: asArray(row.top_features),
    integrations: asArray(row.integrations),
    brand_color: getBrandColor(slug, asNullableText(row.brand_color)),

    affiliate_url: asNullableText(row.affiliate_url),
    vendor_website: asNullableText(row.vendor_website),
    vendor_name: asNullableText(row.vendor_name),
    founded_year: row.founded_year === null || row.founded_year === undefined
      ? null
      : asNumber(row.founded_year),
    support_types: asArray(row.support_types),
    countries_available: asArray(row.countries_available),
    languages: asArray(row.languages),

    compliance: asArray(row.compliance),
    bank_feeds: asArray(row.bank_feeds),
    best_for_size: asArray(row.best_for_size),
    best_for_role: asArray(row.best_for_role),

    overall_rating: asNumber(row.overall_rating),
    ease_of_use_rating: asNumber(row.ease_of_use_rating),
    value_for_money_rating: asNumber(row.value_for_money_rating),
    customer_service_rating: asNumber(row.customer_service_rating),
    functionality_rating: asNumber(row.functionality_rating),
    review_count: asNumber(row.review_count),

    meta_title: asNullableText(row.meta_title),
    meta_description: asNullableText(row.meta_description),
    og_image_url: asNullableText(row.og_image_url),

    status: row.status === "draft" ? "draft" : "published",
    featured: Boolean(row.featured),
    created_at: asText(row.created_at),
    updated_at: asText(row.updated_at),
  };
}

export function rowToReview(row: Row): Review {
  return {
    id: asText(row.id),
    software_id: asText(row.software_id),
    software_slug: asNullableText(row.software_slug) ?? undefined,
    software_name: asNullableText(row.software_name) ?? undefined,

    reviewer_name: asText(row.reviewer_name),
    reviewer_job_title: asText(row.reviewer_job_title),
    reviewer_company: asNullableText(row.reviewer_company),
    reviewer_industry: asText(row.reviewer_industry),
    reviewer_company_size: asText(row.reviewer_company_size),
    reviewer_country: asText(row.reviewer_country) || "South Africa",
    reviewer_city: asNullableText(row.reviewer_city),
    reviewer_avatar_url: asNullableText(row.reviewer_avatar_url),
    verified_linkedin: Boolean(row.verified_linkedin),
    verified_badge: Boolean(row.verified_badge),
    used_for_duration: asText(row.used_for_duration),

    overall_rating: asNumber(row.overall_rating),
    ease_of_use: asNumber(row.ease_of_use),
    value_for_money: asNumber(row.value_for_money),
    customer_service: asNumber(row.customer_service),
    functionality: asNumber(row.functionality),

    review_title: asText(row.review_title),
    summary: asText(row.summary),
    pros: asText(row.pros),
    cons: asText(row.cons),

    vendor_response: asNullableText(row.vendor_response),
    vendor_response_date: asNullableText(row.vendor_response_date),

    review_date: asText(row.review_date),
    helpful_count: asNumber(row.helpful_count),
    status: row.status === "hidden" ? "hidden" : "published",
  };
}

export function rowToArticle(row: Row): Article {
  return {
    id: asText(row.id),
    title: asText(row.title),
    slug: asText(row.slug),
    excerpt: asText(row.excerpt),
    content: asText(row.content),
    featured_image_url: asNullableText(row.featured_image_url),
    category_tag: asText(row.category_tag),
    related_software_id: asNullableText(row.related_software_id),
    author_name: asText(row.author_name),
    author_bio: asText(row.author_bio),
    author_avatar_url: asNullableText(row.author_avatar_url),
    author_title: asText(row.author_title),
    meta_title: asNullableText(row.meta_title),
    meta_description: asNullableText(row.meta_description),
    og_image_url: asNullableText(row.og_image_url),
    read_time_minutes: asNumber(row.read_time_minutes, 5),
    status: row.status === "draft" ? "draft" : "published",
    featured: Boolean(row.featured),
    published_date: asText(row.published_date),
  };
}

export function rowToComparison(row: Row): Comparison {
  return {
    id: asText(row.id),
    software_a_id: asText(row.software_a_id),
    software_b_id: asText(row.software_b_id),
    custom_verdict: asNullableText(row.custom_verdict),
    meta_title: asNullableText(row.meta_title),
    meta_description: asNullableText(row.meta_description),
    status: row.status === "draft" ? "draft" : "published",
  };
}

export function rowToPage(row: Row): StaticPage {
  return {
    id: asText(row.id),
    slug: asText(row.slug),
    title: asText(row.title),
    content: asText(row.content),
    meta_title: asNullableText(row.meta_title),
    meta_description: asNullableText(row.meta_description),
    status: row.status === "draft" ? "draft" : "published",
    updated_at: asText(row.updated_at),
  };
}
