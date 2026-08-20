/**
 * Single source of truth for every market signal on the site.
 * Nothing here should be duplicated as a literal anywhere else.
 */

export const SITE_NAME = "Bosberaaad";
export const SITE_DOMAIN = "bosberaaad.co.za";
export const SITE_TAGLINE = "South Africa's independent business software guide";
export const CONTACT_EMAIL = "hello@bosberaaad.co.za";
export const CONTACT_PHONE = "+27 78 083 9764";

/**
 * The registered address, kept structured because three different consumers
 * need three different shapes of it: the PAIA manual needs the full postal
 * form, schema.org needs discrete fields, and the footer needs a short label.
 */
export const SITE_ADDRESS = {
  street: "Knysna St",
  locality: "Baviaans Local Municipality",
  region: "Eastern Cape",
  postalCode: "6445",
  country: "South Africa",
} as const;

/** Short form, for headings and captions. */
export const SITE_LOCALITY = `${SITE_ADDRESS.locality}, ${SITE_ADDRESS.region}`;

/** Full form, used wherever a physical address has to be stated in full. */
export const SITE_LOCATION = `${SITE_ADDRESS.street}, ${SITE_ADDRESS.locality}, ${SITE_ADDRESS.region} ${SITE_ADDRESS.postalCode}, ${SITE_ADDRESS.country}`;

/**
 * The people accountable for what this site publishes. POPIA requires a named
 * information officer, and PAIA requires that person be contactable, so the
 * founder is named rather than described as "the Editor".
 */
export const SITE_FOUNDER = "Kinza Shahzad";
export const INFORMATION_OFFICER = SITE_FOUNDER;
export const SITE_LOCALE = "en-ZA";
export const OG_LOCALE = "en_ZA";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || `https://${SITE_DOMAIN}`;

export const SITE_DESCRIPTION =
  "Independent reviews, verified ratings and side by side comparisons of accounting, payroll, HR, CRM, ERP and project management software for South African businesses. Prices in rand, compliance checked against SARS, POPIA and BCEA requirements.";

export const REVIEWER_COUNTRIES = [
  "South Africa",
  "Namibia",
  "Botswana",
  "Zambia",
  "Kenya",
  "Nigeria",
  "Zimbabwe",
  "Other",
] as const;

export type ReviewerCountry = (typeof REVIEWER_COUNTRIES)[number];

export const DEFAULT_REVIEWER_COUNTRY: ReviewerCountry = "South Africa";

export const CURRENCIES = ["ZAR", "USD", "EUR", "GBP"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const DEFAULT_CURRENCY: Currency = "ZAR";

export const COMPANY_SIZES = [
  "Sole trader",
  "2 to 10 employees",
  "11 to 50 employees",
  "51 to 200 employees",
  "201 to 500 employees",
  "500 plus employees",
] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];

export const USAGE_DURATIONS = [
  "Less than 6 months",
  "6 to 12 months",
  "1 to 2 years",
  "2 to 5 years",
  "More than 5 years",
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/bosberaaad",
  x: "https://x.com/bosberaaad",
  facebook: "https://www.facebook.com/bosberaaad",
  youtube: "https://www.youtube.com/@bosberaaad",
} as const;

/** Rating dimensions, in the order they are always displayed. */
export const RATING_DIMENSIONS = [
  { key: "ease_of_use_rating", label: "Ease of use" },
  { key: "value_for_money_rating", label: "Value for money" },
  { key: "customer_service_rating", label: "Customer service" },
  { key: "functionality_rating", label: "Functionality" },
] as const;

export const REVIEW_RATING_FIELDS = [
  { key: "overall_rating", label: "Overall" },
  { key: "ease_of_use", label: "Ease of use" },
  { key: "value_for_money", label: "Value for money" },
  { key: "customer_service", label: "Customer service" },
  { key: "functionality", label: "Functionality" },
] as const;

export const NEWSLETTER_INTERESTS = [
  "Accounting",
  "Payroll",
  "HR",
  "CRM",
  "ERP",
  "Project management",
] as const;

/** Standard South African VAT rate, used in pricing copy. */
export const VAT_RATE = 0.15;
