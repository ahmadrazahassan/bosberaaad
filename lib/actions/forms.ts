"use server";

import { headers } from "next/headers";

import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { hashIp } from "@/lib/utils";

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field level errors, keyed by input name. */
  errors?: Record<string, string>;
};

export const IDLE: ActionState = { status: "idle", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function requestContext() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || headerList.get("x-real-ip") || "0.0.0.0";

  return {
    ip_hash: await hashIp(ip),
    user_agent: headerList.get("user-agent")?.slice(0, 500) ?? null,
    referrer: headerList.get("referer")?.slice(0, 500) ?? null,
    country_code: headerList.get("x-vercel-ip-country") ?? null,
  };
}

/* -------------------------------------------------------------- Newsletter */

export async function subscribeToNewsletter(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const interests = formData.getAll("interests").map(String).filter(Boolean);
  const source = String(formData.get("source") ?? "site");
  // Honeypot. Real people leave it empty.
  const trap = String(formData.get("company_website") ?? "");

  if (trap) return { status: "success", message: "Thank you. Please check your inbox." };

  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "That email address does not look right.",
      errors: { email: "Enter a valid email address." },
    };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      status: "success",
      message:
        "Thank you. Connect Supabase to store subscriptions, and this will send a confirmation email.",
    };
  }

  const context = await requestContext();
  const confirmToken = crypto.randomUUID();

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email,
      status: "pending",
      interests,
      confirm_token: confirmToken,
      consent_ip_hash: context.ip_hash,
      consent_source: source,
      user_agent: context.user_agent,
    },
    { onConflict: "email" },
  );

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return {
    status: "success",
    message: "Almost there. Check your inbox and confirm to complete your subscription.",
  };
}

export async function unsubscribeFromNewsletter(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "That email address does not look right.",
      errors: { email: "Enter a valid email address." },
    };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { status: "success", message: "You have been unsubscribed." };
  }

  await supabase
    .from("newsletter_subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("email", email);

  // Always report success. Confirming whether an address is on the list would
  // leak whether that person is a subscriber.
  return { status: "success", message: "You have been unsubscribed. Sorry to see you go." };
}

/* ----------------------------------------------------------------- Contact */

export async function sendContactMessage(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const trap = String(formData.get("company_website") ?? "");

  if (trap) return { status: "success", message: "Thank you. We will be in touch." };

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please give us your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (subject.length < 3) errors.subject = "Give the message a subject.";
  if (message.length < 20) errors.message = "Please give us a little more detail, at least 20 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", errors };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      status: "success",
      message: "Thank you. Connect Supabase to store messages, and this will reach the inbox.",
    };
  }

  const context = await requestContext();

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message,
    ip_hash: context.ip_hash,
    user_agent: context.user_agent,
  });

  if (error) return { status: "error", message: "Something went wrong. Please try again." };

  return {
    status: "success",
    message: "Thank you. We read every message and reply within two working days.",
  };
}
