import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import {
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  hasServiceRole,
  hasSupabase,
} from "./config";

/**
 * Request scoped client that carries the visitor's session. Use this anywhere
 * row level security should apply, which is everywhere except the service role
 * paths below.
 */
export async function createSupabaseServerClient() {
  if (!hasSupabase()) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies cannot be written.
          // The proxy refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}

/**
 * Read only client for public content. No session, no cookies, so it can be
 * used inside cached and statically rendered segments.
 */
export function createSupabaseReadClient(): SupabaseClient | null {
  if (!hasSupabase()) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Service role client. Bypasses row level security, so it is only used for
 * writes that must succeed regardless of the visitor: affiliate click logging,
 * newsletter signup and contact messages. Never expose this to the browser.
 */
export function createSupabaseAdminClient(): SupabaseClient | null {
  if (!hasServiceRole()) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
