import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Scripts load .env.local themselves, because tsx does not read it and the
 * seed must never silently run against the wrong project.
 */
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const contents = readFileSync(resolve(process.cwd(), file), "utf8");
      for (const line of contents.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const equals = trimmed.indexOf("=");
        if (equals === -1) continue;
        const key = trimmed.slice(0, equals).trim();
        const value = trimmed.slice(equals + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      // File does not exist, which is fine.
    }
  }
}

loadEnv();

export function getServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      "\nMissing Supabase credentials.\n" +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local,\n" +
        "then run the migrations in supabase/migrations before seeding.\n",
    );
    process.exit(1);
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Insert in batches, because a few thousand rows in one request will time out. */
export async function insertInBatches<T>(
  client: SupabaseClient,
  table: string,
  rows: T[],
  batchSize = 500,
  onConflict?: string,
) {
  let done = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const query = onConflict
      ? client.from(table).upsert(batch as never, { onConflict })
      : client.from(table).insert(batch as never);

    const { error } = await query;
    if (error) {
      console.error(`\nFailed inserting into ${table} at row ${i}:`, error.message);
      process.exit(1);
    }
    done += batch.length;
    process.stdout.write(`\r  ${table}: ${done} of ${rows.length}`);
  }
  process.stdout.write(`\r  ${table}: ${done} of ${rows.length}\n`);
}

export function log(message: string) {
  console.log(message);
}
