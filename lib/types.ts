export type PublishStatus = "published" | "draft";
export type ReviewStatus = "published" | "hidden";

export type PricingPlan = {
  name: string;
  price: number | null;
  period: "month" | "year" | "once";
  /** Whether the quoted figure already includes 15% VAT. */
  vat_inclusive: boolean;
  description: string;
  features: string[];
  popular?: boolean;
  user_limit?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  /** Longer editorial intro shown on the category landing page. */
  intro?: string;
  software_count: number;
  display_order: number;
  created_at?: string;
};

export type Software = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description_short: string;
  description_full: string;
  logo_url: string | null;
  screenshots: string[];
  category_id: string;
  category?: Category | null;

  starting_price: number | null;
  price_currency: string;
  billing_period: string;
  /** Whether starting_price already includes 15% VAT. Vendors differ. */
  price_vat_inclusive: boolean;
  free_trial: boolean;
  free_version: boolean;
  pricing_plans: PricingPlan[];
  pricing_note?: string | null;
  /** ISO date the list price was last checked against the vendor's own page. */
  price_checked_at?: string | null;

  features: string[];
  top_features: string[];
  integrations: string[];
  brand_color: string | null;

  affiliate_url: string | null;
  vendor_website: string | null;
  vendor_name: string | null;
  founded_year: number | null;
  support_types: string[];
  countries_available: string[];
  languages: string[];

  /** South African compliance coverage, the local yardstick. */
  compliance: string[];
  bank_feeds: string[];
  best_for_size: string[];
  best_for_role: string[];

  overall_rating: number;
  ease_of_use_rating: number;
  value_for_money_rating: number;
  customer_service_rating: number;
  functionality_rating: number;
  review_count: number;

  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;

  status: PublishStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  software_id: string;
  software_slug?: string;
  software_name?: string;

  reviewer_name: string;
  reviewer_job_title: string;
  reviewer_company: string | null;
  reviewer_industry: string;
  reviewer_company_size: string;
  reviewer_country: string;
  reviewer_city?: string | null;
  reviewer_avatar_url: string | null;
  verified_linkedin: boolean;
  verified_badge: boolean;
  used_for_duration: string;

  overall_rating: number;
  ease_of_use: number;
  value_for_money: number;
  customer_service: number;
  functionality: number;

  review_title: string;
  summary: string;
  pros: string;
  cons: string;

  vendor_response: string | null;
  vendor_response_date: string | null;

  review_date: string;
  helpful_count: number;
  status: ReviewStatus;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  category_tag: string;
  related_software_id: string | null;
  author_name: string;
  author_bio: string;
  author_avatar_url: string | null;
  author_title: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  read_time_minutes: number;
  status: PublishStatus;
  featured: boolean;
  published_date: string;
};

export type Comparison = {
  id: string;
  software_a_id: string;
  software_b_id: string;
  custom_verdict: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: PublishStatus;
  /** Denormalised for listing pages. */
  software_a?: Software;
  software_b?: Software;
};

export type SoftwareAlternative = {
  software_id: string;
  alternative_id: string;
  display_order: number;
  /** One line editorial reason this alternative is on the list. */
  reason?: string;
};

export type StaticPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  status: PublishStatus;
  updated_at: string;
};

export type PriceHistoryEntry = {
  id: string;
  software_id: string;
  starting_price: number | null;
  price_currency: string;
  changed_at: string;
  note: string | null;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: "pending" | "confirmed" | "unsubscribed";
  interests: string[];
  confirm_token: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  consent_source: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  handled: boolean;
  created_at: string;
};

export type AffiliateClick = {
  id: string;
  software_id: string | null;
  software_name: string;
  affiliate_url: string;
  clicked_at: string;
  country_code: string | null;
  referrer: string | null;
};

/** Count of reviews per star value, index 0 is one star. */
export type StarDistribution = [number, number, number, number, number];

export type SiteStats = {
  reviews: number;
  software: number;
  categories: number;
  articles: number;
};

export type SearchIndexEntry = {
  type: "software" | "article" | "category" | "comparison";
  title: string;
  subtitle: string;
  href: string;
  rating?: number;
};
