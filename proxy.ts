import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Renamed from `middleware` in Next.js 16. Two jobs:
 *
 *  1. Consult the redirects table so URLs can be changed without losing
 *     rankings. Redirects are cached in memory for a minute, because this runs
 *     on every request and a database round trip per request is not acceptable.
 *  2. Refresh the Supabase session cookie for the admin area.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

type Redirect = { from_path: string; to_path: string; status_code: number };

let redirectCache: { at: number; rules: Map<string, Redirect> } | null = null;
const CACHE_MS = 60_000;

async function getRedirects(): Promise<Map<string, Redirect>> {
  if (redirectCache && Date.now() - redirectCache.at < CACHE_MS) {
    return redirectCache.rules;
  }
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    redirectCache = { at: Date.now(), rules: new Map() };
    return redirectCache.rules;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/redirects?select=from_path,to_path,status_code`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        cache: "no-store",
      },
    );
    if (!response.ok) throw new Error(String(response.status));

    const rows = (await response.json()) as Redirect[];
    const rules = new Map(rows.map((row) => [row.from_path, row]));
    redirectCache = { at: Date.now(), rules };
    return rules;
  } catch {
    // A redirect lookup failure must never take the site down. Serve the page.
    redirectCache = { at: Date.now(), rules: new Map() };
    return redirectCache.rules;
  }
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const redirects = await getRedirects();
  const rule = redirects.get(path);
  if (rule) {
    const destination = new URL(rule.to_path, request.url);
    destination.search = request.nextUrl.search;
    return NextResponse.redirect(destination, rule.status_code === 302 ? 302 : 301);
  }

  let response = NextResponse.next({ request });

  if (SUPABASE_URL && SUPABASE_ANON_KEY && path.startsWith("/admin")) {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && path !== "/admin/login") {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", path);
      return NextResponse.redirect(login);
    }
    if (user && path === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Everything except static assets, image optimisation and the favicon.
     * The tracking route is excluded so a click never waits on a redirect
     * lookup.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/track-click|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml)$).*)",
  ],
};
