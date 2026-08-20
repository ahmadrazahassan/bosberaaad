import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * CSV of confirmed subscribers only. Pending and unsubscribed addresses are
 * excluded, because exporting them is how an unsubscribed person ends up back
 * on a send list.
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authorised." }, { status: 401 });

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email, interests, confirmed_at, consent_source")
    .eq("status", "confirmed")
    .order("confirmed_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const header = ["email", "interests", "confirmed_at", "consent_source"];
  const rows = (data ?? []).map((row) =>
    [
      row.email,
      Array.isArray(row.interests) ? row.interests.join("; ") : "",
      row.confirmed_at,
      row.consent_source,
    ]
      .map(escape)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bosberaaad-subscribers-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
