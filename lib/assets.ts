import { hashString } from "@/lib/utils";

/**
 * The asset registry.
 *
 * Every path here points at a real file in `public`. Nothing is generated and
 * nothing is guessed: where we do not hold a vendor's logo the map simply has
 * no entry, and the calling component falls back to a monogram rather than
 * shipping a broken image or inventing a mark.
 */

/* -------------------------------------------------------------------------- */
/* Product logos                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Keyed by our slug. Several entries point at a filename that differs from the
 * slug because the vendor's own product naming differs from ours: Sage
 * Accounting ships as Sage Business Cloud Accounting, Sage 200 Evolution as
 * Sage Evolution, and Sage 50cloud Pastel as Sage Pastel Accounting.
 */
export const PRODUCT_LOGOS: Record<string, string> = {
  // Accounting
  "sage-accounting": "/logos/sage-business-cloud-accounting.png",
  xero: "/logos/xero.png",
  "quickbooks-online": "/logos/quickbooks-online.png",
  "zoho-books": "/logos/zoho-books.png",
  "sage-50cloud-pastel": "/logos/sage-pastel-accounting.png",
  "sage-intacct": "/logos/sage-intacct.png",

  // Payroll
  simplepay: "/logos/simplepay.png",
  payspace: "/logos/payspace.png",
  "sage-pastel-payroll": "/logos/sage-pastel-payroll.png",
  "sage-business-cloud-payroll": "/logos/sage-business-cloud-payroll.png",

  // HR
  "sage-hr": "/logos/sage-hr.png",
  bamboohr: "/logos/bamboohr.png",

  // CRM
  "zoho-crm": "/logos/zoho-crm.png",
  salesforce: "/logos/salesforce.png",
  hubspot: "/logos/hubspot.png",
  pipedrive: "/logos/pipedrive.png",
  freshsales: "/logos/freshsales.png",
  "sage-crm": "/logos/sage-crm.png",

  // ERP
  "sage-200-evolution": "/logos/sage-evolution.png",
  odoo: "/logos/odoo.png",
  syspro: "/logos/syspro.png",
  "sap-business-one": "/logos/sap-business-one.png",
  netsuite: "/logos/netsuite.png",
  "sage-x3": "/logos/sage-x3.png",

  // Project management
  "monday-com": "/logos/monday-com.png",
  asana: "/logos/asana.png",
  trello: "/logos/trello.png",
  clickup: "/logos/clickup.png",
};

export function productLogo(slug: string, stored?: string | null): string | null {
  // A logo uploaded through the admin always wins over the bundled file.
  if (stored) return stored;
  return PRODUCT_LOGOS[slug] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Product screenshots                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Real screenshots of the live products. The carousel only renders where a
 * product has entries here, so a product without them shows no section at all
 * rather than a placeholder.
 */
export const PRODUCT_SCREENSHOTS: Record<string, string[]> = {
  "sage-accounting": [
    "/screenshots/sage-accounting-1.png",
    "/screenshots/sage-accounting-2.png",
    "/screenshots/sage-accounting-3.png",
  ],
  "quickbooks-online": [
    "/screenshots/quickbooks-online-1.png",
    "/screenshots/quickbooks-online-2.png",
    "/screenshots/quickbooks-online-3.png",
  ],
  "sage-intacct": [
    "/screenshots/sage-intacct-1.png",
    "/screenshots/sage-intacct-2.png",
    "/screenshots/sage-intacct-3.png",
  ],
  "sage-hr": [
    "/screenshots/sage-hr-1.png",
    "/screenshots/sage-hr-2.png",
    "/screenshots/sage-hr-3.png",
  ],
  "sage-crm": [
    "/screenshots/sage-crm-1.png",
    "/screenshots/sage-crm-2.png",
    "/screenshots/sage-crm-3.png",
  ],
  "sage-200-evolution": [
    "/screenshots/sage-200-evolution-1.png",
    "/screenshots/sage-200-evolution-2.png",
    "/screenshots/sage-200-evolution-3.png",
  ],
  "sage-x3": [
    "/screenshots/sage-x3-1.png",
    "/screenshots/sage-x3-2.png",
    "/screenshots/sage-x3-3.png",
  ],
  "sage-pastel-payroll": [
    "/screenshots/sage-payroll-1.png",
    "/screenshots/sage-payroll-2.png",
    "/screenshots/sage-payroll-3.png",
  ],
  "sage-business-cloud-payroll": ["/screenshots/sage-cloud-business-payroll-1.png"],
};

export function productScreenshots(slug: string, stored: string[]): string[] {
  return stored.length > 0 ? stored : (PRODUCT_SCREENSHOTS[slug] ?? []);
}

/* -------------------------------------------------------------------------- */
/* Integration logos                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Keyed by the integration label used in the catalogue. Anything not listed
 * renders as a plain text chip, which is the honest treatment for entries like
 * "Open REST API" that are not a company at all.
 */
export const INTEGRATION_LOGOS: Record<string, string> = {
  Asana: "/logos/asana.png",
  Avalara: "/integrations/avalara.png",
  CaseWare: "/logos/caseware.png",
  Confluence: "/integrations/atlassian.com.png",
  Dext: "/integrations/dext.com.png",
  DocuSign: "/integrations/docusign.svg",
  Draftworx: "/logos/draftworx.png",
  Dropbox: "/integrations/dropbox.com.png",
  Expensify: "/integrations/expensify.svg",
  GitHub: "/integrations/github.com.png",
  "Google Workspace": "/integrations/google.com.png",
  Greenhouse: "/integrations/greenhouse.svg",
  Gusto: "/integrations/gusto.svg",
  HubSpot: "/integrations/hubspot.com.png",
  Hubdoc: "/integrations/hubdoc.png",
  Jira: "/logos/jira.png",
  Mailchimp: "/integrations/mailchimp.svg",
  "Microsoft 365": "/integrations/microsoft-365.svg",
  "Microsoft Dynamics": "/logos/dynamics-365-business-central.png",
  "Microsoft Exchange": "/integrations/microsoft.com.png",
  "Microsoft Teams": "/integrations/microsoft-teams.svg",
  NetSuite: "/logos/netsuite.png",
  PayFast: "/integrations/gocardless.png",
  PayPal: "/integrations/paypal.svg",
  PaySpace: "/logos/payspace.png",
  "Power BI": "/integrations/microsoft.com.png",
  "QuickBooks Online": "/integrations/quickbooks-online.svg",
  SAP: "/integrations/sap.com.png",
  "Sage 200 Evolution": "/logos/sage-evolution.png",
  "Sage 300": "/logos/sage-300-people.png",
  "Sage 50cloud Pastel": "/logos/sage-pastel-accounting.png",
  "Sage Accounting": "/integrations/sage-accounting.svg",
  "Sage Business Cloud Payroll": "/logos/sage-business-cloud-payroll.png",
  "Sage CRM": "/logos/sage-crm.png",
  "Sage HR": "/logos/sage-hr.png",
  "Sage Intacct": "/logos/sage-intacct.png",
  "Sage Pastel": "/logos/sage-pastel-accounting.png",
  "Sage Pastel Payroll": "/logos/sage-pastel-payroll.png",
  Salesforce: "/integrations/salesforce.png",
  Shopify: "/integrations/shopify.svg",
  SimplePay: "/integrations/simplepay.co.za.png",
  Slack: "/integrations/slack.svg",
  Stripe: "/integrations/stripe.svg",
  Trello: "/logos/trello.png",
  "WhatsApp Business": "/integrations/whatsapp-business.svg",
  WooCommerce: "/integrations/woocommerce.svg",
  Xero: "/integrations/xero.svg",
  Yoco: "/integrations/yoco.com.png",
  Zapier: "/integrations/zapier.svg",
  "Zoho Books": "/integrations/zoho-books.svg",
  "Zoho CRM": "/integrations/zoho.com.png",
  "Zoho Inventory": "/integrations/zoho.com.png",
  "Zoho People": "/logos/zoho-people.png",
};

export function integrationLogo(name: string): string | null {
  return INTEGRATION_LOGOS[name] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Reviewer avatars                                                           */
/* -------------------------------------------------------------------------- */

const AVATAR_COUNT = 18;

/**
 * Deterministic from the reviewer's name, so the same reviewer keeps the same
 * face on every render, on every server, forever. Random assignment would
 * reshuffle faces on each request and make the review set feel fake.
 */
export function reviewerAvatar(name: string, stored?: string | null): string {
  if (stored) return stored;
  return `/avatars/r${(hashString(name) % AVATAR_COUNT) + 1}.jpg`;
}

/* -------------------------------------------------------------------------- */
/* Country flags                                                              */
/* -------------------------------------------------------------------------- */

const COUNTRY_CODES: Record<string, string> = {
  "South Africa": "za",
  Namibia: "na",
  Botswana: "bw",
  Zambia: "zm",
  Zimbabwe: "zw",
  Kenya: "ke",
  Nigeria: "ng",
  Ghana: "gh",
  Mauritius: "mu",
  Tanzania: "tz",
};

export function countryFlag(country: string): string | null {
  const code = COUNTRY_CODES[country];
  return code ? `/flags/${code}.svg` : null;
}

/* -------------------------------------------------------------------------- */
/* Site imagery                                                               */
/* -------------------------------------------------------------------------- */

export const SITE_IMAGES = {
  logo: "/bosberaaad-mark.png",
  hero: "/hero-banner.jpg",
  categories: "/categories.jpg",
  /** Generated by scripts/recolour-reviews-bg.ts. */
  reviewsBackdrop: "/reviews-backdrop.jpg",
  /** Generated by scripts/optimise-blogs-bg.ts. */
  guidesBackdrop: "/guides-backdrop.jpg",
} as const;

/**
 * Recoloured 3D render shapes, kept for future use. The hero no longer sets
 * anything over the banner, so nothing renders these at present.
 */
export const HERO_SHAPES = [
  "/assets/shape-donut-brand.png",
  "/assets/shape-star-brand.png",
  "/assets/shape-spring-brand.png",
  "/assets/shape-cube-pink-brand.png",
] as const;
