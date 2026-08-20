import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The tracking route is a redirect, the admin is private, and search
        // result pages are thin. None of them belong in an index.
        disallow: ["/admin", "/admin/", "/api/", "/search", "/newsletter/unsubscribe"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
