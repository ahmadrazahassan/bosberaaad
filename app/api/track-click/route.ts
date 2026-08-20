import { type NextRequest, NextResponse } from "next/server";

import { getSoftwareBySlug } from "@/lib/queries/software";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { hashIp } from "@/lib/utils";

/**
 * Affiliate click tracking.
 *
 * The rule this route exists to enforce: a logging failure must never cost a
 * click. Every write is wrapped, and the redirect fires regardless of whether
 * anything was recorded. Money first, analytics second.
 *
 * POPIA: the visitor's IP is hashed with a server side salt before storage.
 * The raw address never reaches the database.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("software");

  if (!slug) {
    return NextResponse.redirect(new URL("/software", request.url), 302);
  }

  const software = await getSoftwareBySlug(slug);
  if (!software) {
    return NextResponse.redirect(new URL("/software", request.url), 302);
  }

  const destination = software.affiliate_url ?? software.vendor_website;
  if (!destination) {
    return NextResponse.redirect(new URL(`/software/${slug}`, request.url), 302);
  }

  // Fire and forget. Nothing below this point may block or fail the redirect.
  void logClick(request, software.id, software.name, destination);

  return NextResponse.redirect(destination, 302);
}

async function logClick(
  request: NextRequest,
  softwareId: string,
  softwareName: string,
  affiliateUrl: string,
) {
  try {
    const supabase = createSupabaseAdminClient();
    if (!supabase) return;

    const forwarded = request.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "0.0.0.0";

    await supabase.from("affiliate_clicks").insert({
      software_id: softwareId,
      software_name: softwareName,
      affiliate_url: affiliateUrl,
      ip_hash: await hashIp(ip),
      user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      referrer: request.headers.get("referer")?.slice(0, 500) ?? null,
      country_code: request.headers.get("x-vercel-ip-country") ?? null,
    });
  } catch {
    // Deliberately swallowed. A failed insert is an analytics gap, not a lost
    // click, and the redirect has already been issued.
  }
}
