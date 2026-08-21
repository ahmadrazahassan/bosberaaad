import { DEFAULT_CURRENCY, SITE_LOCALE } from "@/lib/site";

export const CURRENCY_SYMBOLS: Record<string, string> = {
  ZAR: "R",
  USD: "US$",
  EUR: "€",
  GBP: "£",
};

/** Non breaking space, so a grouped figure never wraps mid number. */
const NBSP = " ";

/**
 * en-ZA emits U+00A0 or U+202F as the thousands separator depending on the
 * runtime. Normalise every variant to one non breaking space so the same
 * figure looks identical on the server and in the browser.
 */
const GROUPING_SPACES = /[   ]/g;

/**
 * South African digit grouping uses a space, not a comma, which en-ZA handles
 * correctly. Whole rand amounts never show decimals.
 *   R240   R1 375   R23 844
 */
export function formatPrice(
  amount: number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return "Custom pricing";
  }
  if (amount === 0) return "Free";

  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  const formatted = amount.toLocaleString(SITE_LOCALE, {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  });
  return `${symbol}${formatted.replace(GROUPING_SPACES, NBSP)}`;
}

export function formatPricePerPeriod(
  amount: number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
  period: string = "month",
): string {
  const price = formatPrice(amount, currency);
  if (price === "Custom pricing" || price === "Free") return price;
  const suffix = period === "year" ? "/yr" : period === "month" ? "/mo" : `/${period}`;
  return `${price}${suffix}`;
}

export type StartingPriceLabel = {
  /** The headline figure, or the words "Custom pricing". */
  amount: string;
  /** A short qualifier such as "per month, from". */
  note: string;
  /** True when the vendor publishes no list price at all. */
  isCustom: boolean;
  isFree: boolean;
};

export function startingPriceLabel(
  amount: number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
  period: string = "month",
): StartingPriceLabel {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return { amount: "Custom pricing", note: "quoted on request", isCustom: true, isFree: false };
  }
  if (amount === 0) {
    return { amount: "Free", note: "free plan available", isCustom: false, isFree: true };
  }
  return {
    amount: formatPrice(amount, currency),
    note: period === "year" ? "per year, from" : "per month, from",
    isCustom: false,
    isFree: false,
  };
}

export function vatLabel(value: boolean | null, compact = false): string {
  if (value === true) return compact ? "incl VAT" : "including VAT";
  if (value === false) return compact ? "excl VAT" : "excluding VAT";
  return compact ? "VAT not stated" : "VAT basis not stated";
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "0";
  return value.toLocaleString(SITE_LOCALE).replace(GROUPING_SPACES, NBSP);
}

export function formatCompactNumber(value: number): string {
  if (value < 1000) return String(value);
  if (value < 10000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${Math.round(value / 1000)}k`;
}

export function formatDate(
  input: string | Date | null | undefined,
  style: "long" | "short" | "numeric" = "long",
): string {
  if (!input) return "";
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return "";

  if (style === "numeric") {
    return date.toLocaleDateString(SITE_LOCALE, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  return date.toLocaleDateString(SITE_LOCALE, {
    day: "numeric",
    month: style === "short" ? "short" : "long",
    year: "numeric",
  });
}

/** Ratings are always shown to exactly one decimal. */
export function formatRating(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "0.0";
  return value.toFixed(1);
}

export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/** "3 min read" */
export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}

export function pluralise(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
