import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { inkOn } from "@/lib/brandColors";
import { getSoftwareBySlug } from "@/lib/queries/software";
import { SITE_DOMAIN, SITE_TAGLINE } from "@/lib/site";

export const alt = "Bosberaaad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#ff5a1f";
const BRAND_INK = "#ffffff";
const NAVY = "#16182b";
const BRAND_DEEP = "#c93a0f";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const software = slug ? await getSoftwareBySlug(slug) : null;

  const title = software?.name ?? "Bosberaaad";
  const subtitle = software?.tagline ?? SITE_TAGLINE;
  const rating = software ? software.overall_rating.toFixed(1) : null;
  const reviews = software ? software.review_count.toLocaleString("en-ZA") : null;
  const accent = software?.brand_color ?? BRAND_DEEP;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              background: BRAND_DEEP,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: BRAND_INK,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#ffffff", letterSpacing: "-0.03em" }}>
            <span>Bos</span>
            <span style={{ color: BRAND, fontWeight: 600 }}>beraad</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 22 ? 68 : 84,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {rating ? (
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: accent,
                  color: inkOn(accent),
                  padding: "12px 26px",
                  borderRadius: 18,
                  fontSize: 40,
                  fontWeight: 800,
                }}
              >
                {rating}
                <span style={{ fontSize: 26, opacity: 0.75 }}>/ 5</span>
              </div>
              <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
                {reviews} verified reviews
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
              Independent business software reviews
            </div>
          )}

          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.45)" }}>
            {SITE_DOMAIN}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
