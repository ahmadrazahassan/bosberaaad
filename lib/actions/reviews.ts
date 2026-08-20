"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { COMPANY_SIZES, REVIEWER_COUNTRIES, USAGE_DURATIONS } from "@/lib/site";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { hashIp } from "@/lib/utils";

import type { ActionState } from "./forms";

const RATING_FIELDS = [
  "overall_rating",
  "ease_of_use",
  "value_for_money",
  "customer_service",
  "functionality",
] as const;

/**
 * Submitting a review never writes an aggregate. The five averages and the
 * review count are recomputed by the `update_software_ratings()` trigger, so
 * application code cannot drift from the database.
 */
export async function submitReview(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const softwareId = String(formData.get("software_id") ?? "");
  const softwareSlug = String(formData.get("software_slug") ?? "");
  const trap = String(formData.get("company_website") ?? "");

  if (trap) return { status: "success", message: "Thank you for your review." };

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const rating = (key: string) => Number(formData.get(key) ?? 0);

  const errors: Record<string, string> = {};

  const reviewerName = text("reviewer_name");
  const jobTitle = text("reviewer_job_title");
  const industry = text("reviewer_industry");
  const companySize = text("reviewer_company_size");
  const country = text("reviewer_country");
  const duration = text("used_for_duration");
  const title = text("review_title");
  const summary = text("summary");
  const pros = text("pros");
  const cons = text("cons");

  if (reviewerName.length < 2) errors.reviewer_name = "Please give your name.";
  if (jobTitle.length < 2) errors.reviewer_job_title = "Please give your job title.";
  if (industry.length < 2) errors.reviewer_industry = "Please give your industry.";
  if (!COMPANY_SIZES.includes(companySize as (typeof COMPANY_SIZES)[number])) {
    errors.reviewer_company_size = "Choose a company size.";
  }
  if (!REVIEWER_COUNTRIES.includes(country as (typeof REVIEWER_COUNTRIES)[number])) {
    errors.reviewer_country = "Choose a country.";
  }
  if (!USAGE_DURATIONS.includes(duration as (typeof USAGE_DURATIONS)[number])) {
    errors.used_for_duration = "Tell us how long you have used it.";
  }
  if (title.length < 5) errors.review_title = "Give the review a short headline.";
  if (summary.length < 60) errors.summary = "Please write at least 60 characters, so it is useful to another buyer.";
  if (pros.length < 10) errors.pros = "Name at least one thing it does well.";
  if (cons.length < 10) errors.cons = "Name at least one drawback. A review with no criticism is not a review.";

  for (const field of RATING_FIELDS) {
    const value = rating(field);
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      errors[field] = "Choose a rating from 1 to 5.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", errors };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      status: "success",
      message:
        "Thank you. Connect Supabase to store submissions. Reviews are checked before publication.",
    };
  }

  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for") ?? "";
  const ipHash = await hashIp(forwarded.split(",")[0]?.trim() || "0.0.0.0");

  const { error } = await supabase.from("reviews").insert({
    software_id: softwareId,
    reviewer_name: reviewerName,
    reviewer_job_title: jobTitle,
    reviewer_company: text("reviewer_company") || null,
    reviewer_industry: industry,
    reviewer_company_size: companySize,
    reviewer_country: country,
    reviewer_city: text("reviewer_city") || null,
    used_for_duration: duration,
    overall_rating: rating("overall_rating"),
    ease_of_use: rating("ease_of_use"),
    value_for_money: rating("value_for_money"),
    customer_service: rating("customer_service"),
    functionality: rating("functionality"),
    review_title: title,
    summary,
    pros,
    cons,
    // Held for moderation. Only published reviews affect the aggregates.
    status: "hidden",
    submitted_ip_hash: ipHash,
  });

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  if (softwareSlug) revalidatePath(`/software/${softwareSlug}`);

  return {
    status: "success",
    message:
      "Thank you. We check every review before publishing, which usually takes two working days.",
  };
}

/**
 * Helpfulness voting. Rate limited by IP hash so one person cannot inflate a
 * count, and the increment happens in the database rather than read then write.
 */
export async function markReviewHelpful(reviewId: string): Promise<{ ok: boolean; count?: number }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false };

  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for") ?? "";
  const ipHash = await hashIp(forwarded.split(",")[0]?.trim() || "0.0.0.0");

  const { data, error } = await supabase.rpc("mark_review_helpful", {
    p_review_id: reviewId,
    p_ip_hash: ipHash,
  });

  if (error) return { ok: false };
  return { ok: true, count: typeof data === "number" ? data : undefined };
}
