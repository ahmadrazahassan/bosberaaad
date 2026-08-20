import { ArrowRightIcon, AwardIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

import { CategoryIcon } from "@/components/public/CategoryIcon";
import { StarRating } from "@/components/public/ratings";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { Badge } from "@/components/ui/badge";
import { FALLBACK_BRAND_COLOR, withAlpha } from "@/lib/brandColors";
import { formatNumber, formatRating, startingPriceLabel } from "@/lib/format";
import type { Category, Software } from "@/lib/types";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------- SoftwareListRow */

export function SoftwareListRow({
  software,
  rank,
  className,
}: {
  software: Software;
  rank?: number;
  className?: string;
}) {
  const price = startingPriceLabel(
    software.starting_price,
    software.price_currency,
    software.billing_period,
  );

  return (
    <article
      className={cn(
        "card-modern card-modern-hover group relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center",
        className,
      )}
    >
      {rank ? (
        <span
          className="hidden w-10 shrink-0 font-heading text-2xl font-extrabold tabular-nums text-muted-foreground/40 sm:block"
          aria-hidden="true"
        >
          {rank}
        </span>
      ) : null}

      <SoftwareLogo
        name={software.name}
        slug={software.slug}
        logoUrl={software.logo_url}
        brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
        size={56}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-lg font-bold tracking-tight">
            <Link
              href={`/software/${software.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {software.name}
            </Link>
          </h3>
          {software.featured ? <Badge variant="success">Featured</Badge> : null}
        </div>

        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {software.description_short}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <StarRating value={software.overall_rating} size="sm" showValue />
          <span className="text-sm tabular-nums text-muted-foreground">
            {formatNumber(software.review_count)} reviews
          </span>
          {software.category ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CategoryIcon name={software.category.icon} className="size-3.5" />
              {software.category.name}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
        <div className="sm:text-right">
          <p className="font-heading text-2xl font-extrabold tabular-nums tracking-tight">
            {price.amount}
          </p>
          <p className="text-xs text-muted-foreground">
            {price.isCustom || price.isFree
              ? price.note
              : `${price.note}${software.price_vat_inclusive ? ", incl VAT" : ", excl VAT"}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {software.free_trial ? <Badge variant="success">Free trial</Badge> : null}
          {software.free_version ? <Badge variant="muted">Free plan</Badge> : null}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------- AlternativeCard */

export function AlternativeCard({
  software,
  reason,
  rank,
}: {
  software: Software;
  reason?: string | null;
  rank?: number;
}) {
  const price = startingPriceLabel(
    software.starting_price,
    software.price_currency,
    software.billing_period,
  );

  return (
    <article className="tray-card group relative flex flex-col gap-4 p-6">
      <div className="flex items-start gap-3">
        <SoftwareLogo
          name={software.name}
          slug={software.slug}
          logoUrl={software.logo_url}
          brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
          size={44}
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-base font-bold tracking-tight">
            <Link
              href={`/software/${software.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {software.name}
            </Link>
          </h3>
          <StarRating value={software.overall_rating} size="sm" showValue className="mt-1" />
        </div>
        {rank ? (
          <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-muted-foreground">
            #{rank}
          </span>
        ) : null}
      </div>

      {reason ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{reason}</p>
      ) : (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {software.description_short}
        </p>
      )}

      <p className="mt-auto font-heading text-lg font-bold tabular-nums tracking-tight">
        {price.amount}
        <span className="ml-1.5 text-xs font-normal text-muted-foreground">{price.note}</span>
      </p>
    </article>
  );
}

/* -------------------------------------------------------------- CategoryCard */

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="card-modern card-modern-hover group relative flex flex-col gap-4 p-6">
      <span
        className="grid size-12 place-items-center rounded-2xl"
        style={{ backgroundColor: withAlpha("#ff5a1f", 0.16) }}
        aria-hidden="true"
      >
        <CategoryIcon name={category.icon} tone="brand" className="size-6" />
      </span>

      <div>
        <h3 className="font-heading text-lg font-bold tracking-tight">
          <Link
            href={`/category/${category.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {category.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>

      <p className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand-dark)]">
        {category.software_count} products reviewed
        <ArrowRightIcon
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </p>
    </article>
  );
}

/* ------------------------------------------------------------ ComparisonCard */

export function ComparisonCard({
  a,
  b,
  summary,
}: {
  a: Software;
  b: Software;
  summary?: string | null;
}) {
  const winner = a.overall_rating >= b.overall_rating ? a : b;

  return (
    <article className="card-modern card-modern-hover group relative flex flex-col gap-5 p-6">
      <div className="flex items-center gap-3">
        <SoftwareLogo
          name={a.name}
          slug={a.slug}
          logoUrl={a.logo_url}
          brandColor={a.brand_color ?? FALLBACK_BRAND_COLOR}
          size={40}
        />
        <span className="font-heading text-sm font-bold text-muted-foreground">vs</span>
        <SoftwareLogo
          name={b.name}
          slug={b.slug}
          logoUrl={b.logo_url}
          brandColor={b.brand_color ?? FALLBACK_BRAND_COLOR}
          size={40}
        />
      </div>

      <h3 className="font-heading text-lg font-bold tracking-tight text-balance">
        <Link
          href={`/compare/${a.slug}-vs-${b.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {a.name} vs {b.name}
        </Link>
      </h3>

      {summary ? (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      ) : null}

      <dl className="mt-auto grid grid-cols-2 gap-2 border-t border-border pt-4 text-sm">
        {[a, b].map((item) => (
          <div key={item.id}>
            <dt className="truncate text-xs text-muted-foreground">{item.name}</dt>
            <dd className="mt-0.5 flex items-center gap-1.5">
              <span className="font-heading font-bold tabular-nums">
                {formatRating(item.overall_rating)}
              </span>
              {item.id === winner.id ? (
                <CheckIcon
                  className="size-3.5 text-[var(--color-brand-dark)]"
                  strokeWidth={3}
                  aria-label="Higher rated"
                />
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/* -------------------------------------------------------------- ArticleRow */

export function ArticleRow({
  index,
  title,
  href,
  excerpt,
  tag,
  date,
  readTime,
  author,
}: {
  index: number;
  title: string;
  href: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
}) {
  return (
    <article className="group relative flex items-start gap-5 border-b border-border py-7 last:border-b-0 sm:gap-8">
      <span
        className="hidden font-heading text-5xl font-extrabold tabular-nums text-muted-foreground/15 transition-colors group-hover:text-[var(--color-brand-dark)] sm:block"
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Badge variant="muted">{tag}</Badge>
          <span>{date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{readTime}</span>
        </div>

        <h3 className="mt-2.5 font-heading text-xl font-bold tracking-tight text-balance">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

        <p className="mt-3 text-sm text-muted-foreground">{author}</p>
      </div>

      <span
        className="mt-1 grid size-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors group-hover:border-[var(--color-brand)] group-hover:bg-[var(--color-brand-deep)] group-hover:text-[var(--color-brand-ink)]"
        aria-hidden="true"
      >
        <ArrowRightIcon className="size-4" />
      </span>
    </article>
  );
}

/* --------------------------------------------------------------- StatusBadge */

export function StatusBadge({ software }: { software: Software }) {
  if (software.featured) {
    return (
      <Badge variant="success" className="gap-1">
        <AwardIcon aria-hidden="true" />
        Editor pick
      </Badge>
    );
  }
  if (software.free_version) return <Badge variant="muted">Free plan available</Badge>;
  if (software.free_trial) return <Badge variant="outline">Free trial</Badge>;
  return null;
}
