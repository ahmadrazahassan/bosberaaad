import { BadgeCheckIcon, BuildingIcon, QuoteIcon } from "lucide-react";
import Image from "next/image";

import { CountryFlag } from "@/components/public/CountryFlag";
import { StarRating } from "@/components/public/ratings";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/misc";
import { reviewerAvatar } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import type { Review } from "@/lib/types";
import { cn } from "@/lib/utils";

import { HelpfulButton } from "./HelpfulButton";

export function ReviewCard({
  review,
  className,
  showHelpful = true,
}: {
  review: Review;
  className?: string;
  showHelpful?: boolean;
}) {
  const initials = review.reviewer_name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article className={cn("card-modern flex flex-col gap-5 p-6", className)}>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-11">
            <Image
              src={reviewerAvatar(review.reviewer_name, review.reviewer_avatar_url)}
              alt=""
              width={88}
              height={88}
              className="size-full object-cover"
              sizes="44px"
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2 font-medium">
              {review.reviewer_name}
              {review.verified_badge ? (
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-brand-dark)]"
                  title="Identity verified"
                >
                  <BadgeCheckIcon className="size-3.5" aria-hidden="true" />
                  Verified
                </span>
              ) : null}
            </p>
            <p className="text-sm text-muted-foreground">{review.reviewer_job_title}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <BuildingIcon className="size-3" aria-hidden="true" />
                {review.reviewer_industry}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CountryFlag country={review.reviewer_country} />
                {review.reviewer_city ?? review.reviewer_country}
              </span>
              <span>{review.reviewer_company_size}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <StarRating value={review.overall_rating} size="sm" showValue />
          <time className="text-xs text-muted-foreground" dateTime={review.review_date}>
            {formatDate(review.review_date, "short")}
          </time>
        </div>
      </header>

      <div>
        <h3 className="font-heading text-lg font-bold tracking-tight text-balance">
          {review.review_title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.summary}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-[var(--color-brand-light)] p-4">
          <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[var(--color-brand-dark)] uppercase">
            What works
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{review.pros}</p>
        </div>
        <div className="rounded-2xl bg-muted p-4">
          <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
            What does not
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{review.cons}</p>
        </div>
      </div>

      {review.vendor_response ? (
        <div className="rounded-2xl border-l-[3px] border-[var(--color-brand)] bg-muted/60 p-4">
          <p className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
            <QuoteIcon className="size-3" aria-hidden="true" />
            Response from the vendor
            {review.vendor_response_date ? (
              <span className="font-normal tracking-normal normal-case">
                {formatDate(review.vendor_response_date, "short")}
              </span>
            ) : null}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {review.vendor_response}
          </p>
        </div>
      ) : null}

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Badge variant="muted">Used for {review.used_for_duration.toLowerCase()}</Badge>
        {showHelpful ? (
          <HelpfulButton reviewId={review.id} initialCount={review.helpful_count} />
        ) : null}
      </footer>
    </article>
  );
}
