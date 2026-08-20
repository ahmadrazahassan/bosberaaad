import { StarIcon } from "lucide-react";
import * as React from "react";

import { withAlpha } from "@/lib/brandColors";
import { formatNumber, formatRating } from "@/lib/format";
import type { StarDistribution } from "@/lib/types";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- StarRating */

const STAR_SIZES = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
  xl: "size-6",
} as const;

/**
 * Colour is never the only signal, so the numeric rating is always available
 * to assistive technology and shown beside the stars wherever there is room.
 */
export function StarRating({
  value,
  size = "default",
  showValue = false,
  reviewCount,
  className,
}: {
  value: number;
  size?: keyof typeof STAR_SIZES;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" role="img" aria-label={`${formatRating(value)} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(1, Math.max(0, rounded - star + 1));
          return (
            <span key={star} className="relative inline-flex" aria-hidden="true">
              <StarIcon className={cn(STAR_SIZES[size], "text-muted-foreground/30")} fill="currentColor" />
              {fill > 0 ? (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <StarIcon
                    className={cn(STAR_SIZES[size], "text-[var(--color-star)]")}
                    fill="currentColor"
                  />
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
      {showValue ? (
        <span className="font-heading text-sm font-bold tabular-nums">{formatRating(value)}</span>
      ) : null}
      {reviewCount !== undefined ? (
        <span className="text-sm tabular-nums text-muted-foreground">
          ({formatNumber(reviewCount)})
        </span>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------- CircularRating */

/**
 * The rating dial, drawn in the product's accent colour. The value is always
 * printed in the middle, so the dial is decoration rather than the only
 * carrier of the information.
 */
export function CircularRating({
  value,
  max = 5,
  size = 132,
  accentColor = "var(--color-brand-dark)",
  label,
  className,
}: {
  value: number;
  max?: number;
  size?: number;
  accentColor?: string;
  label?: string;
  className?: string;
}) {
  const stroke = size >= 120 ? 10 : 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, value / max));
  const offset = circumference * (1 - progress);

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          stroke={withAlpha(accentColor.startsWith("#") ? accentColor : "#9ca3af", 0.18)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={accentColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-dial"
          style={{ "--dial-circumference": `${circumference}px` } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-heading text-3xl font-extrabold tabular-nums tracking-tight">
            {formatRating(value)}
          </p>
          {label ? (
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              {label}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ RatingBar */

export function RatingBar({
  label,
  value,
  count,
  total,
  accentColor = "var(--color-brand)",
  showStar = false,
  className,
}: {
  label: string;
  /** Percentage filled, 0 to 100. */
  value: number;
  count?: number;
  total?: number;
  accentColor?: string;
  showStar?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="flex w-14 shrink-0 items-center gap-1 text-sm font-medium tabular-nums">
        {label}
        {showStar ? (
          <StarIcon className="size-3 text-[var(--color-star)]" fill="currentColor" aria-hidden="true" />
        ) : null}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="animate-fill-bar h-full rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: accentColor }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
        {count !== undefined
          ? formatNumber(count)
          : `${Math.round(value)}%`}
        {total !== undefined && count !== undefined ? (
          <span className="sr-only"> of {formatNumber(total)}</span>
        ) : null}
      </span>
    </div>
  );
}

/* --------------------------------------------------------- StarDistribution */

export function StarDistributionBars({
  distribution,
  accentColor = "var(--color-brand)",
  className,
}: {
  distribution: StarDistribution;
  accentColor?: string;
  className?: string;
}) {
  const total = distribution.reduce((a, b) => a + b, 0) || 1;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = distribution[star - 1];
        return (
          <RatingBar
            key={star}
            label={String(star)}
            showStar
            value={(count / total) * 100}
            count={count}
            total={total}
            accentColor={accentColor}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- SentimentBar */

export function SentimentBar({
  positive,
  neutral,
  critical,
  className,
  showLegend = true,
}: {
  positive: number;
  neutral: number;
  critical: number;
  className?: string;
  showLegend?: boolean;
}) {
  const segments = [
    { key: "positive", value: positive, colour: "var(--color-brand)", label: "Positive" },
    { key: "neutral", value: neutral, colour: "var(--color-amber)", label: "Neutral" },
    { key: "critical", value: critical, colour: "var(--color-error)", label: "Critical" },
  ];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className="flex h-2 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${Math.round(positive)} percent positive, ${Math.round(neutral)} percent neutral, ${Math.round(critical)} percent critical`}
      >
        {segments.map((segment) =>
          segment.value > 0 ? (
            <span
              key={segment.key}
              style={{ width: `${segment.value}%`, backgroundColor: segment.colour }}
              className="h-full first:rounded-l-full last:rounded-r-full"
            />
          ) : null,
        )}
      </div>
      {showLegend ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {segments.map((segment) => (
            <span key={segment.key} className="inline-flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: segment.colour }}
                aria-hidden="true"
              />
              <span className="tabular-nums">{Math.round(segment.value)}%</span> {segment.label.toLowerCase()}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
