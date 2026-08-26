import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";

import { AffiliateCTAButton } from "@/components/public/affiliate";
import { CtaButton } from "@/components/public/CtaButton";
import { SentimentBar, StarRating } from "@/components/public/ratings";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { Badge } from "@/components/ui/badge";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";
import { formatDate, formatNumber, startingPriceLabel } from "@/lib/format";
import { sentimentFromDistribution } from "@/lib/queries/reviews";
import type { Software, StarDistribution } from "@/lib/types";
import { cn } from "@/lib/utils";

function AvailabilityBadges({ software }: { software: Software }) {
  if (!software.free_trial && !software.free_version && !software.demo_available) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {software.free_trial ? <Badge variant="success">Free trial</Badge> : null}
      {software.free_version ? <Badge variant="muted">Free plan</Badge> : null}
      {software.demo_available ? <Badge variant="outline">Demo available</Badge> : null}
    </div>
  );
}

/* ------------------------------------------------------------- VersusCard */

/** One side of a head to head. Both panels are identical so the card reads
 *  as a fair fight, with the tint and the tag doing the only differentiating. */
function VersusPanel({ software, wins }: { software: Software; wins: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 px-4 py-7 text-center transition-colors",
        wins ? "bg-[var(--color-brand-light)]" : "bg-card",
      )}
    >
      <SoftwareLogo
        name={software.name}
        slug={software.slug}
        logoUrl={software.logo_url}
        brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
        size={52}
      />

      <div className="flex min-h-[4rem] flex-col justify-end">
        <p className="line-clamp-2 font-heading text-base leading-tight font-bold tracking-tight">
          {software.name}
        </p>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{software.vendor_name}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <StarRating value={software.overall_rating} size="sm" showValue />
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatNumber(software.review_count)} reviews
        </span>
      </div>

      {/* Fixed height whether or not the tag renders, so both panels align. */}
      <div className="mt-auto flex h-4 items-center">
        {wins ? (
          <span className="font-heading text-[0.6rem] font-bold tracking-widest text-[var(--color-brand-dark)] uppercase">
            Higher rated
          </span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * A head to head, built as the thing the section promises: two products set
 * against each other, the verdict underneath, and one button through to the
 * full page.
 */
export function VersusCard({
  a,
  b,
  summary,
}: {
  a: Software;
  b: Software;
  summary: string | null;
}) {
  const aWins = a.overall_rating >= b.overall_rating;

  return (
    <article className="group relative flex flex-col gap-6 rounded-[1.75rem] border border-border bg-card p-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(20,22,31,.35)] sm:p-5">
      {/* gap-px over the border colour paints the hairline between panels. */}
      <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-border">
        <VersusPanel software={a} wins={aWins} />
        <VersusPanel software={b} wins={!aWins} />

        <span
          className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-card bg-[var(--color-brand)] font-heading text-[0.65rem] font-bold tracking-widest text-[var(--color-on-brand)] uppercase"
          aria-hidden="true"
        >
          vs
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 px-1 text-center">
        <h3 className="font-heading text-lg leading-snug font-bold tracking-tight text-balance">
          <Link
            href={`/compare/${a.slug}-vs-${b.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {a.name} <span className="text-muted-foreground">vs</span> {b.name}
          </Link>
        </h3>

        {summary ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        ) : null}

        <div className="relative z-10 mt-auto flex justify-center pt-2 pb-1">
          <CtaButton href={`/compare/${a.slug}-vs-${b.slug}`} size="sm">
            Read the verdict
          </CtaButton>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------- RankedCard */

/**
 * A top rated product, led by an oversized rank numeral. The number is the
 * point of this section, so it is the largest thing in the card.
 */
export function RankedCard({
  software,
  distribution,
  rank,
}: {
  software: Software;
  distribution?: StarDistribution;
  rank: number;
}) {
  const price = startingPriceLabel(
    software.starting_price,
    software.price_currency,
    software.billing_period,
  );
  const sentiment = distribution ? sentimentFromDistribution(distribution) : null;

  return (
    <article className="tray-card group relative flex flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-4">
        <span
          className="font-heading text-5xl leading-none font-bold tabular-nums text-[var(--color-brand-dark)]"
          aria-hidden="true"
        >
          {String(rank).padStart(2, "0")}
        </span>
        <SoftwareLogo
          name={software.name}
          slug={software.slug}
          logoUrl={software.logo_url}
          brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
          size={44}
        />
      </div>

      <div>
        <h3 className="font-heading text-lg font-bold tracking-tight">
          <Link
            href={`/software/${software.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            <span className="sr-only">Ranked {rank}: </span>
            {software.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <StarRating value={software.overall_rating} size="sm" showValue />
          <span className="text-sm tabular-nums text-muted-foreground">
            {formatNumber(software.review_count)} reviews
          </span>
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {software.tagline ?? software.description_short}
      </p>

      <AvailabilityBadges software={software} />

      {sentiment ? (
        <SentimentBar
          positive={sentiment.positive}
          neutral={sentiment.neutral}
          critical={sentiment.critical}
          showLegend={false}
        />
      ) : null}

      <div className="mt-auto border-t border-border pt-4">
        <p className="font-heading text-lg font-bold tabular-nums tracking-tight">
          {price.amount}
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">{price.note}</span>
        </p>

        <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2">
          <CtaButton href={`/software/${software.slug}`} size="sm">
            Read review
          </CtaButton>
          <AffiliateCTAButton
            software={software}
            label="Visit website"
            size="xs"
            variant="tint"
            placement="home-ranked"
          />
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------- FreshCheckCard */

/**
 * A recently re verified product. The section is about freshness, so the date
 * we last checked the price leads the card rather than hiding in a meta line.
 */
export function FreshCheckCard({ software }: { software: Software }) {
  const price = startingPriceLabel(
    software.starting_price,
    software.price_currency,
    software.billing_period,
  );

  return (
    <article className="group relative flex flex-col gap-5 rounded-[1.5rem] border border-border bg-card p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(20,22,31,.35)]">
      {software.price_checked_at ? (
        <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-brand-light)] py-1.5 pr-3 pl-2.5 font-heading text-[0.6rem] font-bold tracking-widest text-[var(--color-brand-dark)] uppercase">
          <CircleCheckIcon className="size-3.5" aria-hidden="true" />
          Checked{" "}
          <time dateTime={software.price_checked_at}>
            {formatDate(software.price_checked_at, "short")}
          </time>
        </p>
      ) : null}

      <div className="flex items-center gap-3.5">
        <SoftwareLogo
          name={software.name}
          slug={software.slug}
          logoUrl={software.logo_url}
          brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
          size={48}
        />
        <div className="min-w-0">
          <h3 className="font-heading text-base leading-tight font-bold tracking-tight">
            <Link
              href={`/software/${software.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {software.name}
            </Link>
          </h3>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {software.category?.name ?? software.vendor_name}
          </p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {software.tagline ?? software.description_short}
      </p>

      <AvailabilityBadges software={software} />

      <div className="mt-auto border-t border-border pt-4">
        <p className="font-heading text-lg font-bold tabular-nums tracking-tight">
          {price.amount}
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">{price.note}</span>
        </p>

        <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2">
          <CtaButton href={`/software/${software.slug}`} size="sm">
            Read review
          </CtaButton>
          <AffiliateCTAButton
            software={software}
            label="Visit website"
            size="xs"
            variant="tint"
            placement="home-fresh"
          />
        </div>
      </div>
    </article>
  );
}
