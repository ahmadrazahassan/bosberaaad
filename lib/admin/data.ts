import "server-only";

import type { ReferenceOption } from "@/components/admin/ResourceForm";
import { REFERENCE_FIELDS, type Resource } from "@/lib/admin/resources";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Loads the option lists for any select field that points at another table.
 * Driven by the registry, so a new reference field needs no code change here.
 */
export async function loadReferences(
  resource: Resource,
): Promise<Record<string, ReferenceOption[]>> {
  const needed = resource.fields
    .filter((field) => field.type === "select" && field.name in REFERENCE_FIELDS)
    .map((field) => field.name);

  if (needed.length === 0) return {};

  const supabase = await createSupabaseServerClient();
  if (!supabase) return Object.fromEntries(needed.map((name) => [name, []]));

  const tables = new Set(needed.map((name) => REFERENCE_FIELDS[name]));
  const loaded: Record<string, ReferenceOption[]> = {};

  for (const table of tables) {
    const { data } = await supabase.from(table).select("id, name").order("name");
    const options: ReferenceOption[] = (data ?? []).map((row) => ({
      value: String((row as { id: string }).id),
      label: String((row as { name: string }).name),
    }));

    for (const field of needed) {
      if (REFERENCE_FIELDS[field] === table) loaded[field] = options;
    }
  }

  return loaded;
}

export async function loadRecords(resource: Resource, filters: Record<string, string> = {}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { rows: [], available: false as const };

  let query = supabase
    .from(resource.table)
    .select("*")
    .order(resource.orderBy, { ascending: resource.orderBy === "display_order" })
    .limit(200);

  for (const [key, value] of Object.entries(filters)) {
    if (value) query = query.eq(key, value);
  }

  const { data, error } = await query;
  if (error) return { rows: [], available: true as const, error: error.message };

  return { rows: (data ?? []) as Record<string, unknown>[], available: true as const };
}

export async function loadRecord(resource: Resource, id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase.from(resource.table).select("*").eq("id", id).maybeSingle();
  return (data ?? null) as Record<string, unknown> | null;
}
