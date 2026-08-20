/**
 * Every product carries its own accent colour. Resolution order:
 *   1. software.brand_color set by an admin
 *   2. the slug map below
 *   3. FALLBACK_BRAND_COLOR
 */

/**
 * Used only where a vendor has no published colour and no logo. A neutral
 * slate rather than a brand colour, so an unknown product never borrows the
 * visual authority of one we actually know.
 */
export const FALLBACK_BRAND_COLOR = "#475569";

/**
 * The site's own accent, as a hex rather than a CSS variable, because the
 * chart helpers need to compute alpha variants from it.
 */
export const BRAND_ACCENT = "#ff5a1f";

export const BRAND_COLORS: Record<string, string> = {
  // Accounting
  "sage-accounting": "#00d639",
  xero: "#13b5ea",
  "quickbooks-online": "#2ca01c",
  "zoho-books": "#e42527",
  "sage-50cloud-pastel": "#008849",
  "wave-accounting": "#1c4ed8",
  "freshbooks": "#0075dd",
  "draftworx": "#0f4c81",
  "caseware-working-papers": "#e35205",
  "sage-intacct": "#008849",

  // Payroll
  simplepay: "#1e88e5",
  payspace: "#e4002b",
  "sage-pastel-payroll": "#00754a",
  "sage-business-cloud-payroll": "#00d639",
  "payroll-online": "#1f6feb",
  "vip-payroll": "#00754a",
  "paysoft": "#0b6e4f",

  // HR
  "sage-hr": "#008849",
  bamboohr: "#73c41d",
  "peoplehr": "#ff6b35",
  "labournet": "#0057b8",
  "hr-companion": "#2d6cdf",
  "personio": "#0a2540",

  // CRM
  "zoho-crm": "#e42527",
  salesforce: "#00a1e0",
  hubspot: "#ff7a59",
  pipedrive: "#017737",
  freshsales: "#f04e3e",
  "sage-crm": "#008849",

  // ERP
  odoo: "#714b67",
  "sap-business-one": "#0faaff",
  "sage-200-evolution": "#008849",
  "syspro": "#e2231a",
  "acumatica": "#0075c9",
  "netsuite": "#125a9c",
  "sage-x3": "#008849",

  // Project management
  "monday-com": "#ff3d57",
  asana: "#f06a6a",
  trello: "#0079bf",
  clickup: "#7b68ee",
  notion: "#111111",
  smartsheet: "#00b0b9",
  wrike: "#08cf65",
  basecamp: "#1d2d35",
  jira: "#0052cc",
};

export function getBrandColor(slug: string, override?: string | null): string {
  if (override && /^#[0-9a-f]{3,8}$/i.test(override)) return override;
  return BRAND_COLORS[slug] ?? FALLBACK_BRAND_COLOR;
}

/** Convert a hex colour to rgba() so it can be used as a tint. */
export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.slice(0, 6);

  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return `rgba(71, 85, 105, ${alpha})`;

  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Relative luminance, so a vendor colour never carries text it cannot support.
 * Used to decide whether a recoloured button gets white or near black ink.
 */
export function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.slice(0, 6);
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return 0.4;

  const channels = [(int >> 16) & 255, (int >> 8) & 255, int & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Ink that reads on top of the given fill. */
export function inkOn(hex: string): string {
  return luminance(hex) > 0.55 ? "#14161f" : "#ffffff";
}

/** Normalise any hex to six digits. */
function expand(hex: string): string {
  const value = hex.replace("#", "");
  return value.length === 3
    ? value
        .split("")
        .map((c) => c + c)
        .join("")
    : value.slice(0, 6);
}

/** "255, 90, 31", for building rgba() shadows in CSS custom properties. */
export function rgbTriplet(hex: string): string {
  const int = Number.parseInt(expand(hex), 16);
  if (Number.isNaN(int)) return "71, 85, 105";
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

/** Darken a colour by `amount` (0 to 1), for the second stop of a gradient. */
export function shade(hex: string, amount: number): string {
  const int = Number.parseInt(expand(hex), 16);
  if (Number.isNaN(int)) return hex;

  const factor = 1 - Math.min(1, Math.max(0, amount));
  const channels = [(int >> 16) & 255, (int >> 8) & 255, int & 255].map((c) =>
    Math.round(c * factor),
  );
  return `#${channels.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
