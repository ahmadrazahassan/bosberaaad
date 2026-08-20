import { type NextRequest, NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

/**
 * Double opt in confirmation. POPIA does not strictly require double opt in,
 * and it is the cleanest way to hold evidence that consent was given by the
 * person who owns the address.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const failed = new URL("/newsletter?confirmed=0", request.url);

  if (!token) return NextResponse.redirect(failed, 302);

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.redirect(failed, 302);

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("confirm_token", token)
    .eq("status", "pending")
    .select("email")
    .maybeSingle();

  if (error || !data) return NextResponse.redirect(failed, 302);

  return NextResponse.redirect(new URL("/newsletter?confirmed=1", request.url), 302);
}
