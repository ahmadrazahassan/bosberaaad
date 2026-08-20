import { InfoIcon } from "lucide-react";
import Link from "next/link";

import { CtaButton } from "@/components/public/CtaButton";
import type { Software } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Every commercial link points at the tracking route rather than at the vendor,
 * carries rel="sponsored" and opens in a new tab. There is no undisclosed
 * affiliate link anywhere on this site.
 */
export function AffiliateCTAButton({
  software,
  label,
  className,
  size = "default",
  variant = "default",
}: {
  software: Software;
  label?: string;
  className?: string;
  size?: "xs" | "sm" | "default" | "lg";
  variant?: "default" | "tint";
}) {
  return (
    <CtaButton
      href={`/api/track-click?software=${encodeURIComponent(software.slug)}`}
      target="_blank"
      rel="noopener noreferrer sponsored"
      size={size}
      variant={variant}
      // It leaves the site, so the arrow points out rather than forward.
      icon="external"
      className={className}
    >
      {label ?? `Visit ${software.name}`}
    </CtaButton>
  );
}

export function AffiliateDisclosureNote({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "inline";
}) {
  if (variant === "inline") {
    return (
      <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
        We may earn a commission if you subscribe through this link, at no extra cost to you. It
        never affects our ratings.{" "}
        <Link href="/affiliate-disclosure" className="underline underline-offset-2">
          How we make money
        </Link>
      </p>
    );
  }

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <span
        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-muted"
        aria-hidden="true"
      >
        <InfoIcon className="size-3 text-muted-foreground" />
      </span>
      <p className="text-xs leading-relaxed text-muted-foreground">
        We may earn a commission when you subscribe through this link, at no extra cost to you. It
        never affects a rating or a ranking.{" "}
        <Link
          href="/affiliate-disclosure"
          className="text-[var(--color-brand-dark)] underline underline-offset-2"
        >
          How we make money
        </Link>
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- SponsoredAd */

const AD_SIZES = {
  leaderboard: { width: 728, height: 90, label: "Leaderboard" },
  billboard: { width: 970, height: 250, label: "Billboard" },
  halfPage: { width: 300, height: 600, label: "Half page" },
  video: { width: 300, height: 400, label: "Vertical video" },
} as const;

/**
 * Ad slots render as a labelled, correctly sized placeholder until a network is
 * wired in. Reserving the exact box means adding the script later does not
 * shift the layout, which protects Cumulative Layout Shift.
 */
export function SponsoredAd({
  format = "billboard",
  className,
}: {
  format?: keyof typeof AD_SIZES;
  className?: string;
}) {
  const { width, height, label } = AD_SIZES[format];

  return (
    <aside
      className={cn("flex flex-col items-center gap-2", className)}
      aria-label="Sponsored content"
    >
      <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
        Sponsored
      </p>
      <div
        className="grid w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-border bg-muted/60"
        style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
      >
        <p className="px-4 text-center text-xs text-muted-foreground">
          {label} advertising slot, {width} by {height}
        </p>
      </div>
    </aside>
  );
}
