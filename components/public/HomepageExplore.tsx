"use client";

import Link from "next/link";
import * as React from "react";

import { AffiliateCTAButton, AffiliateDisclosureNote } from "@/components/public/affiliate";
import { CategoryIcon } from "@/components/public/CategoryIcon";
import { CtaButton } from "@/components/public/CtaButton";
import { StarRating } from "@/components/public/ratings";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { formatNumber, startingPriceLabel } from "@/lib/format";
import type { Category, Software } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";

export type ExploreGroup = {
  category: Category;
  software: Software[];
};

/**
 * Category tabs with the products inside each. Client side because switching
 * tabs should not be a navigation, and the whole payload is small enough that
 * shipping all six groups is cheaper than fetching on click.
 */
export function HomepageExplore({ groups }: { groups: ExploreGroup[] }) {
  const [activeSlug, setActiveSlug] = React.useState(groups[0]?.category.slug ?? "");
  const active = groups.find((group) => group.category.slug === activeSlug) ?? groups[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {groups.map((group) => {
          const isActive = group.category.slug === active.category.slug;
          return (
            <button
              key={group.category.slug}
              type="button"
              onClick={() => setActiveSlug(group.category.slug)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-transparent bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
                  : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              <CategoryIcon
                name={group.category.icon}
                className={cn("size-4", isActive && "text-[var(--color-brand-ink)]")}
              />
              {group.category.name}
              <span className="tabular-nums opacity-60">{group.category.software_count}</span>
            </button>
          );
        })}
      </div>

      <div className="tray">
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {active.software.map((software) => {
            const price = startingPriceLabel(
              software.starting_price,
              software.price_currency,
              software.billing_period,
            );
            return (
              <article key={software.id} className="tray-card group relative flex flex-col gap-4 p-5">
                <div className="flex items-start gap-3">
                  <SoftwareLogo
                    name={software.name}
                    slug={software.slug}
                    logoUrl={software.logo_url}
                    brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
                    size={42}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-heading text-base font-bold tracking-tight">
                      <Link
                        href={`/software/${software.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {software.name}
                      </Link>
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <StarRating value={software.overall_rating} size="sm" />
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {formatNumber(software.review_count)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {software.tagline ?? software.description_short}
                </p>

                <p className="mt-auto font-heading text-lg font-bold tabular-nums tracking-tight">
                  {price.amount}
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                    {price.note}
                  </span>
                </p>

                {/*
                 * Two destinations, deliberately told apart. The dark button is
                 * ours and stays on the site. The tinted one is commercial and
                 * leaves for the vendor, which is why it looks different and
                 * why its arrow points out.
                 *
                 * The title link lays an overlay across the whole card, so both
                 * have to sit above it or the overlay swallows the click.
                 */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                  <CtaButton href={`/software/${software.slug}`} size="sm">
                    Read review
                  </CtaButton>
                  <AffiliateCTAButton
                    software={software}
                    label="Visit website"
                    size="xs"
                    variant="tint"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Six commercial links sit above, so the disclosure belongs here. */}
      <AffiliateDisclosureNote className="justify-center" />

      <div className="flex justify-center">
        <CtaButton href={`/category/${active.category.slug}`}>
          All {active.category.name.toLowerCase()}
        </CtaButton>
      </div>
    </div>
  );
}
