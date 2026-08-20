import { CATEGORIES } from "@/lib/data/categories";
import { aggregateFromReviews, getReviewsFor } from "@/lib/data/reviews";
import type { Software } from "@/lib/types";

import { ACCOUNTING_SOFTWARE } from "./accounting";
import { CRM_SOFTWARE } from "./crm";
import { ERP_SOFTWARE } from "./erp";
import { HR_SOFTWARE } from "./hr";
import { PAYROLL_SOFTWARE } from "./payroll";
import { PROJECT_MANAGEMENT_SOFTWARE } from "./project-management";

const CATALOGUE: Software[] = [
  ...ACCOUNTING_SOFTWARE,
  ...PAYROLL_SOFTWARE,
  ...HR_SOFTWARE,
  ...CRM_SOFTWARE,
  ...ERP_SOFTWARE,
  ...PROJECT_MANAGEMENT_SOFTWARE,
];

/**
 * Aggregate ratings are derived from the review set, never authored. This
 * mirrors the `update_software_ratings()` trigger, so the dev dataset and the
 * production database agree on where a star average comes from.
 */
for (const software of CATALOGUE) {
  const aggregates = aggregateFromReviews(getReviewsFor(software));
  Object.assign(software, aggregates);
}

/** Category counts mirror the `update_category_counts()` trigger. */
for (const category of CATEGORIES) {
  category.software_count = CATALOGUE.filter(
    (s) => s.category_id === category.id && s.status === "published",
  ).length;
}

export const SOFTWARE: Software[] = CATALOGUE;

export const SOFTWARE_BY_SLUG = new Map(SOFTWARE.map((s) => [s.slug, s]));
export const SOFTWARE_BY_ID = new Map(SOFTWARE.map((s) => [s.id, s]));

export const TOTAL_REVIEW_COUNT = SOFTWARE.reduce((total, s) => total + s.review_count, 0);
