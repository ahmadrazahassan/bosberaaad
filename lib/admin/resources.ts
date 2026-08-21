import { COMPANY_SIZES, CURRENCIES, REVIEWER_COUNTRIES, USAGE_DURATIONS } from "@/lib/site";

/**
 * The resource registry.
 *
 * One field map per table drives both the form renderer and the save action.
 * Nothing outside this whitelist can ever be written, which means adding a
 * column to the database does not silently expose it to the admin form, and a
 * crafted request cannot set `status` on a table where status is not editable.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "html"
  | "number"
  | "checkbox"
  | "select"
  | "date"
  | "color"
  | "json";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: readonly string[];
  /** Renders full width in the two column form grid. */
  wide?: boolean;
  placeholder?: string;
};

export type Resource = {
  key: string;
  table: string;
  label: string;
  labelSingular: string;
  /** Column shown as the row title in the list view. */
  titleField: string;
  /** Extra columns shown in the list view. */
  listFields: { name: string; label: string; type?: FieldType }[];
  /** Column used for the default sort, descending. */
  orderBy: string;
  fields: Field[];
  /** Rows the admin may create. Reviews, for example, are moderated not authored. */
  canCreate: boolean;
};

const PUBLISH_STATUS = ["published", "draft"] as const;

export const RESOURCES: Record<string, Resource> = {
  software: {
    key: "software",
    table: "software",
    label: "Software",
    labelSingular: "Product",
    titleField: "name",
    orderBy: "updated_at",
    canCreate: true,
    listFields: [
      { name: "status", label: "Status" },
      { name: "overall_rating", label: "Rating", type: "number" },
      { name: "review_count", label: "Reviews", type: "number" },
      { name: "starting_price", label: "From", type: "number" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true, help: "Lowercase, hyphenated. Changing this breaks existing links unless you add a redirect." },
      { name: "tagline", label: "Tagline", type: "text", wide: true },
      { name: "description_short", label: "Short description", type: "textarea", required: true, wide: true },
      { name: "description_full", label: "Full assessment", type: "html", required: true, wide: true, help: "HTML. Use h2 and h3 for structure." },
      { name: "category_id", label: "Category", type: "select", required: true },
      { name: "vendor_name", label: "Vendor", type: "text" },
      { name: "vendor_website", label: "Vendor website", type: "text" },
      { name: "affiliate_url", label: "Affiliate URL", type: "text", wide: true, help: "Leave blank to send clicks to the vendor website." },
      { name: "founded_year", label: "Founded", type: "number" },
      { name: "brand_color", label: "Accent colour", type: "color", help: "Overrides the slug to colour map." },
      { name: "starting_price", label: "Starting price", type: "number", help: "Leave blank for custom pricing." },
      { name: "price_currency", label: "Currency", type: "select", options: CURRENCIES },
      { name: "billing_period", label: "Billing period", type: "select", options: ["month", "year"] },
      { name: "price_vat_inclusive", label: "Price includes VAT", type: "checkbox" },
      { name: "price_checked_at", label: "Price last checked", type: "date" },
      { name: "pricing_note", label: "Pricing note", type: "textarea", wide: true },
      { name: "free_trial", label: "Has a free trial", type: "checkbox" },
      { name: "free_version", label: "Has a free plan", type: "checkbox" },
      { name: "demo_available", label: "Demo available", type: "checkbox" },
      { name: "demo_url", label: "Demo URL", type: "text", wide: true },
      { name: "trial_note", label: "Trial detail", type: "text", wide: true },
      { name: "pricing_plans", label: "Pricing plans", type: "json", wide: true, help: "Array of plan objects." },
      { name: "top_features", label: "Top features", type: "json", wide: true, help: "Array of strings, three or four." },
      { name: "features", label: "All features", type: "json", wide: true },
      { name: "integrations", label: "Integrations", type: "json", wide: true },
      { name: "compliance", label: "Compliance coverage", type: "json", wide: true, help: "Prefix a gap with No, Not, Limited or Manual and it renders as a gap." },
      { name: "bank_feeds", label: "Bank feeds", type: "json", wide: true },
      { name: "best_for_size", label: "Best for company size", type: "json", wide: true },
      { name: "best_for_role", label: "Best for role", type: "json", wide: true },
      { name: "support_types", label: "Support types", type: "json", wide: true },
      { name: "countries_available", label: "Countries", type: "json", wide: true },
      { name: "languages", label: "Languages", type: "json", wide: true },
      { name: "screenshots", label: "Screenshots", type: "json", wide: true, help: "Array of image URLs. The carousel only renders when this has entries." },
      { name: "logo_url", label: "Logo URL", type: "text", wide: true },
      { name: "meta_title", label: "Meta title", type: "text", wide: true },
      { name: "meta_description", label: "Meta description", type: "textarea", wide: true },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "status", label: "Status", type: "select", options: PUBLISH_STATUS, required: true },
    ],
  },

  reviews: {
    key: "reviews",
    table: "reviews",
    label: "Reviews",
    labelSingular: "Review",
    titleField: "review_title",
    orderBy: "review_date",
    // Reviews arrive from the public form. The admin moderates rather than writes.
    canCreate: false,
    listFields: [
      { name: "status", label: "Status" },
      { name: "reviewer_name", label: "Reviewer" },
      { name: "overall_rating", label: "Rating", type: "number" },
      { name: "review_date", label: "Date", type: "date" },
    ],
    fields: [
      { name: "review_title", label: "Headline", type: "text", required: true, wide: true },
      { name: "summary", label: "Summary", type: "textarea", required: true, wide: true },
      { name: "pros", label: "What works", type: "textarea", wide: true },
      { name: "cons", label: "What does not", type: "textarea", wide: true },
      { name: "reviewer_name", label: "Reviewer name", type: "text", required: true },
      { name: "reviewer_job_title", label: "Job title", type: "text" },
      { name: "reviewer_company", label: "Company", type: "text" },
      { name: "reviewer_industry", label: "Industry", type: "text" },
      { name: "reviewer_company_size", label: "Company size", type: "select", options: COMPANY_SIZES },
      { name: "reviewer_country", label: "Country", type: "select", options: REVIEWER_COUNTRIES },
      { name: "reviewer_city", label: "City", type: "text" },
      { name: "used_for_duration", label: "Used for", type: "select", options: USAGE_DURATIONS },
      { name: "overall_rating", label: "Overall", type: "number", required: true },
      { name: "ease_of_use", label: "Ease of use", type: "number", required: true },
      { name: "value_for_money", label: "Value for money", type: "number", required: true },
      { name: "customer_service", label: "Customer service", type: "number", required: true },
      { name: "functionality", label: "Functionality", type: "number", required: true },
      { name: "verified_badge", label: "Verified", type: "checkbox" },
      { name: "verified_linkedin", label: "Professional profile confirmed", type: "checkbox" },
      { name: "vendor_response", label: "Vendor response", type: "textarea", wide: true },
      { name: "vendor_response_date", label: "Response date", type: "date" },
      { name: "review_date", label: "Review date", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["published", "hidden"], required: true },
    ],
  },

  categories: {
    key: "categories",
    table: "categories",
    label: "Categories",
    labelSingular: "Category",
    titleField: "name",
    orderBy: "display_order",
    canCreate: true,
    listFields: [
      { name: "slug", label: "Slug" },
      { name: "software_count", label: "Products", type: "number" },
      { name: "display_order", label: "Order", type: "number" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "icon", label: "Icon", type: "select", required: true, options: ["Calculator", "Banknote", "Users", "Contact", "Boxes", "KanbanSquare"] },
      { name: "description", label: "Description", type: "textarea", required: true, wide: true },
      { name: "intro", label: "Buying guide intro", type: "html", wide: true },
      { name: "display_order", label: "Display order", type: "number", required: true },
    ],
  },

  articles: {
    key: "articles",
    table: "articles",
    label: "Articles",
    labelSingular: "Article",
    titleField: "title",
    orderBy: "published_date",
    canCreate: true,
    listFields: [
      { name: "status", label: "Status" },
      { name: "category_tag", label: "Tag" },
      { name: "author_name", label: "Author" },
      { name: "published_date", label: "Published", type: "date" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "category_tag", label: "Tag", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true, wide: true },
      { name: "content", label: "Content", type: "html", required: true, wide: true },
      { name: "author_name", label: "Author name", type: "text", required: true },
      { name: "author_title", label: "Author title", type: "text" },
      { name: "author_bio", label: "Author bio", type: "textarea", wide: true },
      { name: "related_software_id", label: "Related product", type: "select" },
      { name: "read_time_minutes", label: "Read time, minutes", type: "number" },
      { name: "featured_image_url", label: "Featured image URL", type: "text", wide: true },
      { name: "meta_title", label: "Meta title", type: "text", wide: true },
      { name: "meta_description", label: "Meta description", type: "textarea", wide: true },
      { name: "published_date", label: "Published date", type: "date", required: true },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "status", label: "Status", type: "select", options: PUBLISH_STATUS, required: true },
    ],
  },

  comparisons: {
    key: "comparisons",
    table: "comparisons",
    label: "Comparisons",
    labelSingular: "Comparison",
    titleField: "id",
    orderBy: "id",
    canCreate: true,
    listFields: [{ name: "status", label: "Status" }],
    fields: [
      { name: "software_a_id", label: "First product", type: "select", required: true },
      { name: "software_b_id", label: "Second product", type: "select", required: true },
      { name: "custom_verdict", label: "Verdict", type: "html", wide: true, help: "Name a winner. A verdict that lists differences is not a verdict." },
      { name: "meta_title", label: "Meta title", type: "text", wide: true },
      { name: "meta_description", label: "Meta description", type: "textarea", wide: true },
      { name: "status", label: "Status", type: "select", options: PUBLISH_STATUS, required: true },
    ],
  },

  pages: {
    key: "pages",
    table: "pages",
    label: "Pages",
    labelSingular: "Page",
    titleField: "title",
    orderBy: "updated_at",
    canCreate: true,
    listFields: [
      { name: "slug", label: "Slug" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "content", label: "Content", type: "html", required: true, wide: true },
      { name: "meta_title", label: "Meta title", type: "text", wide: true },
      { name: "meta_description", label: "Meta description", type: "textarea", wide: true },
      { name: "status", label: "Status", type: "select", options: PUBLISH_STATUS, required: true },
    ],
  },

  redirects: {
    key: "redirects",
    table: "redirects",
    label: "Redirects",
    labelSingular: "Redirect",
    titleField: "from_path",
    orderBy: "from_path",
    canCreate: true,
    listFields: [
      { name: "to_path", label: "To" },
      { name: "status_code", label: "Code", type: "number" },
    ],
    fields: [
      { name: "from_path", label: "From path", type: "text", required: true, help: "Must start with a slash." },
      { name: "to_path", label: "To path", type: "text", required: true },
      { name: "status_code", label: "Status code", type: "select", required: true, options: ["301", "302"] },
    ],
  },
};

export const RESOURCE_KEYS = Object.keys(RESOURCES);

export function getResource(key: string): Resource | null {
  return RESOURCES[key] ?? null;
}

/**
 * Fields that reference another table. The form renderer loads the options for
 * these, and the save action still validates against the registry.
 */
export const REFERENCE_FIELDS: Record<string, "software" | "categories"> = {
  category_id: "categories",
  related_software_id: "software",
  software_a_id: "software",
  software_b_id: "software",
};
