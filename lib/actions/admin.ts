"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getResource, type Field } from "@/lib/admin/resources";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { ActionState } from "./forms";

/**
 * Every write goes through the resource registry. A field that is not in the
 * registry is dropped, so adding a database column never silently exposes it
 * and a crafted request cannot set something the form does not offer.
 */
function coerce(field: Field, raw: FormDataEntryValue | null): unknown {
  if (field.type === "checkbox") return raw === "on" || raw === "true";

  const value = typeof raw === "string" ? raw.trim() : "";

  if (value === "") return field.required ? "" : null;

  switch (field.type) {
    case "number": {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    case "json": {
      try {
        return JSON.parse(value);
      } catch {
        throw new Error(`${field.label} is not valid JSON.`);
      }
    }
    case "date":
      return value;
    default:
      return value;
  }
}

export async function saveResource(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const resourceKey = String(formData.get("__resource") ?? "");
  const id = String(formData.get("__id") ?? "");

  const resource = getResource(resourceKey);
  if (!resource) return { status: "error", message: "Unknown resource." };
  if (!id && !resource.canCreate) {
    return { status: "error", message: `${resource.label} cannot be created here.` };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase is not configured, so nothing can be saved." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "You are not signed in." };

  const payload: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const field of resource.fields) {
    let value: unknown;
    try {
      value = coerce(field, formData.get(field.name));
    } catch (error) {
      errors[field.name] = error instanceof Error ? error.message : "Invalid value.";
      continue;
    }

    if (field.required && (value === "" || value === null || value === undefined)) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }
    payload[field.name] = value;
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", errors };
  }

  const { error } = id
    ? await supabase.from(resource.table).update(payload).eq("id", id)
    : await supabase.from(resource.table).insert(payload);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/", "layout");
  redirect(`/admin/${resource.key}?saved=1`);
}

export async function deleteResource(resourceKey: string, id: string): Promise<ActionState> {
  const resource = getResource(resourceKey);
  if (!resource) return { status: "error", message: "Unknown resource." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "You are not signed in." };

  const { error } = await supabase.from(resource.table).delete().eq("id", id);
  if (error) return { status: "error", message: error.message };

  revalidatePath("/", "layout");
  return { status: "success", message: `${resource.labelSingular} deleted.` };
}

/* ------------------------------------------------------------------- Auth */

export async function signIn(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      status: "error",
      message: "Supabase is not configured. Add your project keys to .env.local first.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { status: "error", message: "Those details did not work." };

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

/* --------------------------------------------------------------- Settings */

export async function saveSettings(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "You are not signed in." };

  const rows = Array.from(formData.entries())
    .filter(([key]) => key.startsWith("setting__"))
    .map(([key, value]) => ({
      key: key.replace("setting__", ""),
      value: String(value),
      updated_at: new Date().toISOString(),
    }));

  if (rows.length === 0) return { status: "idle", message: "" };

  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) return { status: "error", message: error.message };

  revalidatePath("/", "layout");
  return { status: "success", message: "Settings saved." };
}

/* -------------------------------------------------------------- Moderation */

export async function setReviewStatus(
  id: string,
  status: "published" | "hidden",
): Promise<ActionState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "You are not signed in." };

  // The rating trigger recomputes the product's averages from this change.
  const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
  if (error) return { status: "error", message: error.message };

  revalidatePath("/", "layout");
  return {
    status: "success",
    message: status === "published" ? "Review published." : "Review hidden.",
  };
}

export async function markContactHandled(id: string, handled: boolean): Promise<ActionState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "error", message: "Supabase is not configured." };

  const { error } = await supabase.from("contact_messages").update({ handled }).eq("id", id);
  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/contact");
  return { status: "success", message: handled ? "Marked as handled." : "Reopened." };
}
