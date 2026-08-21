import Image from "next/image";
import Link from "next/link";

import { CtaButton } from "@/components/public/CtaButton";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { SITE_IMAGES } from "@/lib/assets";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";
import { formatNumber, formatRating } from "@/lib/format";
import type { Review, Software } from "@/lib/types";
import { cn } from "@/lib/utils";

export type MarqueeReview = { review: Review; software: Software };

/* ------------------------------------------------------------------- Card */

function ReviewTile({ review, software }: MarqueeReview) {
  return (
    <article className="flex w-[21rem] shrink-0 flex-col gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm sm:w-[24rem]">
      <div className="flex items-center justify-between gap-4">
        {/* Big, and with nothing drawn around it. */}
        <SoftwareLogo
          name={software.name}
          slug={software.slug}
          logoUrl={software.logo_url}
          brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
          size={44}
          bare
        />

        <span className="flex items-baseline gap-1.5 font-heading tabular-nums">
          <span className="text-2xl font-bold text-white">
            {formatRating(review.overall_rating)}
          </span>
          <span className="text-xs text-white/60">/ 5</span>
        </span>
      </div>

      <div>
        <h3 className="font-heading text-lg leading-snug font-bold text-balance text-white">
          {review.review_title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/60">
          {review.summary}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 font-heading text-xs font-bold text-white/80"
          aria-hidden="true"
        >
          {review.reviewer_name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{review.reviewer_name}</p>
          <p className="truncate text-xs text-white/50">
            {review.reviewer_job_title} &middot; {software.name}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------- Row */

function MarqueeRow({
  items,
  reverse = false,
  seconds,
}: {
  items: MarqueeReview[];
  reverse?: boolean;
  seconds: number;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className="marquee-viewport relative overflow-hidden"
      style={{
        // Feather both ends so cards enter and leave rather than being cut off.
        maskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className="marquee gap-5"
        style={
          {
            "--marquee-duration": `${seconds}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {/* Twice, so the reset lands on an identical frame. The copy is
            hidden from assistive tech to avoid reading every review twice. */}
        {[0, 1].map((pass) => (
          <div key={pass} className="flex gap-5" aria-hidden={pass === 1 ? "true" : undefined}>
            {items.map((item) => (
              <ReviewTile key={`${pass}-${item.review.id}`} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Section */

/**
 * The wall of reviews.
 *
 * A full bleed dark panel carrying the brand arc, with three rows of review
 * cards travelling in alternating directions. The rows are the point: the
 * volume has to be felt rather than stated, which a static grid of six cards
 * never does.
 *
 * The panel breaks the container on purpose and curves back in at the bottom,
 * so the page returns to white beneath it.
 */
export function ReviewsMarquee({
  rows,
  totalReviews,
  productCount,
}: {
  rows: MarqueeReview[][];
  totalReviews: number;
  productCount: number;
}) {
  const durations = [72, 88, 64];

  return (
    <section
      aria-labelledby="reviews-wall-heading"
      className="full-bleed relative isolate overflow-hidden rounded-t-[1.25rem] rounded-b-[2.5rem] bg-[#0b0d13] py-20 sm:rounded-t-[1.75rem] sm:rounded-b-[4rem] sm:py-24 lg:rounded-t-[2.25rem] lg:rounded-b-[5.5rem]"
    >
      <Image
        src={SITE_IMAGES.reviewsBackdrop}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />
      {/* The arc peaks near the top, so the copy needs its own ground. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b0d13]/35 via-[#0b0d13]/70 to-[#0b0d13]"
      />

      <div className="container-site flex flex-col items-center gap-5 text-center">
        <p className="font-heading text-[0.7rem] font-bold tracking-[0.2em] text-[var(--color-brand)] uppercase">
          What buyers actually say
        </p>

        <h2
          id="reviews-wall-heading"
          className="max-w-4xl font-heading text-[2.75rem] leading-[0.98] tracking-[-0.04em] text-balance text-white sm:text-[4rem] lg:text-[5rem]"
        >
          {formatNumber(totalReviews)} reviews.
          <br />
          <span className="font-bold">Across {productCount} products.</span>
        </h2>

        <p className="max-w-xl text-base leading-relaxed text-pretty text-white/55 sm:text-lg">
          Ratings are computed from published reviews rather than written by hand. Vendors
          can respond to any review, and their response is published with it.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-5">
        {rows.map((items, index) => (
          <MarqueeRow
            key={index}
            items={items}
            reverse={index % 2 === 1}
            seconds={durations[index] ?? 72}
          />
        ))}
      </div>

      <div className="container-site mt-16 flex flex-col items-center gap-4">
        <CtaButton href="/software" variant="onDark">
          Read the reviews
        </CtaButton>
        <Link
          href="/editorial-policy"
          className={cn(
            "text-sm text-white/50 underline decoration-white/25 underline-offset-4",
            "transition-colors hover:text-white/80",
          )}
        >
          How we verify and rank them
        </Link>
      </div>
    </section>
  );
}
