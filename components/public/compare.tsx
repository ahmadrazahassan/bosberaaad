import Link from "next/link";

import { AffiliateCTAButton } from "@/components/public/affiliate";
import { StarRating } from "@/components/public/ratings";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber, formatRating, startingPriceLabel } from "@/lib/format";
import { RATING_DIMENSIONS } from "@/lib/site";
import type { Software } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";

/* ------------------------------------------------------------- CompareHeader */

export function CompareHeader({ a, b }: { a: Software; b: Software }) {
  return (
    <div className="tray">
      <div className="grid gap-2 md:grid-cols-2">
        {[a, b].map((software) => {
          const price = startingPriceLabel(
            software.starting_price,
            software.price_currency,
            software.billing_period,
          );
          return (
            <div key={software.id} className="tray-card flex flex-col gap-5 p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <SoftwareLogo
                  name={software.name}
                  slug={software.slug}
                  logoUrl={software.logo_url}
                  brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
                  size={64}
                  ring
                />
                <div>
                  <h2 className="font-heading text-xl font-bold tracking-tight">
                    <Link href={`/software/${software.slug}`} className="hover:underline">
                      {software.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {software.category?.name ?? software.vendor_name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <StarRating value={software.overall_rating} size="lg" />
                <p className="font-heading text-3xl font-extrabold tabular-nums tracking-tight">
                  {formatRating(software.overall_rating)}
                </p>
                <p className="text-sm tabular-nums text-muted-foreground">
                  {formatNumber(software.review_count)} verified reviews
                </p>
              </div>

              <div>
                <p className="font-heading text-2xl font-extrabold tabular-nums tracking-tight">
                  {price.amount}
                </p>
                <p className="text-xs text-muted-foreground">
                  {price.isCustom || price.isFree
                    ? price.note
                    : `${price.note}, ${software.price_vat_inclusive ? "incl VAT" : "excl VAT"}`}
                </p>
              </div>

              <AffiliateCTAButton software={software} className="w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ RatingsCompare */

export function RatingsCompare({ a, b }: { a: Software; b: Software }) {
  const rows = [
    { label: "Overall", key: "overall_rating" as const },
    ...RATING_DIMENSIONS.map((dimension) => ({ label: dimension.label, key: dimension.key })),
  ];

  return (
    <Table caption={`Ratings for ${a.name} compared with ${b.name}`}>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-40">Rating</TableHead>
          <TableHead className="text-center">{a.name}</TableHead>
          <TableHead className="text-center">{b.name}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          const valueA = a[row.key] as number;
          const valueB = b[row.key] as number;
          return (
            <TableRow key={row.key}>
              <TableCell className="text-sm font-medium">{row.label}</TableCell>
              <RatingCell value={valueA} wins={valueA > valueB} />
              <RatingCell value={valueB} wins={valueB > valueA} />
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell className="text-sm font-medium">Reviews</TableCell>
          <TableCell className="text-center tabular-nums">{formatNumber(a.review_count)}</TableCell>
          <TableCell className="text-center tabular-nums">{formatNumber(b.review_count)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function RatingCell({ value, wins }: { value: number; wins: boolean }) {
  return (
    <TableCell className="text-center">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-heading font-bold tabular-nums",
          wins && "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]",
        )}
      >
        {formatRating(value)}
        {wins ? <span className="sr-only">, higher</span> : null}
      </span>
    </TableCell>
  );
}

/* ---------------------------------------------------------- ComplianceCompare */

export function ComplianceCompare({ a, b }: { a: Software; b: Software }) {
  return (
    <div className="tray">
      <div className="grid gap-2 md:grid-cols-2">
        {[a, b].map((software) => (
          <div key={software.id} className="tray-card flex flex-col gap-4 p-6">
            <h3 className="font-heading text-base font-bold tracking-tight">{software.name}</h3>
            <ul className="flex flex-col gap-2.5">
              {software.compliance.map((item) => {
                const negative = /^(no |not |limited |manual |generic )/i.test(item);
                return (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        "mt-1.5 size-1.5 shrink-0 rounded-full",
                        negative ? "bg-[var(--color-amber)]" : "bg-[var(--color-brand)]",
                      )}
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- CompareStickyBar */

export function CompareStickyBar({ a, b }: { a: Software; b: Software }) {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-2">
        <AffiliateCTAButton software={a} label={a.name} size="sm" className="flex-1" />
        <AffiliateCTAButton software={b} label={b.name} size="sm" className="flex-1" />
      </div>
    </div>
  );
}
