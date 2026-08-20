import { productScreenshots } from "@/lib/assets";
import { getBrandColor } from "@/lib/brandColors";
import type { Software } from "@/lib/types";

/**
 * Input shape for a catalogue entry. Everything the reviewer must decide is
 * required. Everything derivable has a default, so the records stay readable.
 *
 * `target_rating` and `review_count` are seeds only. The real aggregate
 * ratings are computed from the review set, exactly as the database trigger
 * does in production, so application code never invents a star average.
 */
export type SoftwareSeed = {
  name: string;
  slug: string;
  category_id: string;
  tagline: string;
  description_short: string;
  description_full: string;

  starting_price: number | null;
  price_vat_inclusive: boolean;
  billing_period?: "month" | "year";
  price_currency?: string;
  pricing_note?: string;
  price_checked_at?: string;
  free_trial?: boolean;
  free_version?: boolean;
  pricing_plans: Software["pricing_plans"];

  top_features: string[];
  features: string[];
  integrations: string[];
  compliance: string[];
  bank_feeds?: string[];
  best_for_size: string[];
  best_for_role: string[];

  vendor_name: string;
  vendor_website: string;
  affiliate_url?: string;
  founded_year: number;
  support_types: string[];
  countries_available?: string[];
  languages?: string[];

  /** Seed rating, one decimal. The review generator aims at this. */
  target_rating: number;
  /** Seed review volume. */
  review_count: number;

  featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
};

const DEFAULT_COUNTRIES = ["South Africa", "Namibia", "Botswana", "Zimbabwe", "Zambia"];

export function defineSoftware(seed: SoftwareSeed): Software {
  return {
    id: `sw-${seed.slug}`,
    name: seed.name,
    slug: seed.slug,
    tagline: seed.tagline,
    description_short: seed.description_short,
    description_full: seed.description_full,
    logo_url: null,
    // Real screenshots where we hold them. The carousel renders only when
    // this is non empty, so a product without them shows no section at all.
    screenshots: productScreenshots(seed.slug, []),
    category_id: seed.category_id,

    starting_price: seed.starting_price,
    price_currency: seed.price_currency ?? "ZAR",
    billing_period: seed.billing_period ?? "month",
    price_vat_inclusive: seed.price_vat_inclusive,
    free_trial: seed.free_trial ?? false,
    free_version: seed.free_version ?? false,
    pricing_plans: seed.pricing_plans,
    pricing_note: seed.pricing_note ?? null,
    price_checked_at: seed.price_checked_at ?? "2026-07-01",

    features: seed.features,
    top_features: seed.top_features,
    integrations: seed.integrations,
    brand_color: getBrandColor(seed.slug),

    affiliate_url: seed.affiliate_url ?? seed.vendor_website,
    vendor_website: seed.vendor_website,
    vendor_name: seed.vendor_name,
    founded_year: seed.founded_year,
    support_types: seed.support_types,
    countries_available: seed.countries_available ?? DEFAULT_COUNTRIES,
    languages: seed.languages ?? ["English"],

    compliance: seed.compliance,
    bank_feeds: seed.bank_feeds ?? [],
    best_for_size: seed.best_for_size,
    best_for_role: seed.best_for_role,

    // Populated by computeAggregates() from the generated review set.
    overall_rating: seed.target_rating,
    ease_of_use_rating: seed.target_rating,
    value_for_money_rating: seed.target_rating,
    customer_service_rating: seed.target_rating,
    functionality_rating: seed.target_rating,
    review_count: seed.review_count,

    meta_title: seed.meta_title ?? `${seed.name} Review ${new Date().getFullYear()}`,
    meta_description: seed.meta_description ?? seed.description_short,
    og_image_url: null,

    status: "published",
    featured: seed.featured ?? false,
    created_at: seed.created_at ?? "2025-11-04T08:00:00.000Z",
    updated_at: seed.updated_at ?? "2026-07-01T08:00:00.000Z",
  };
}
