"use client";

import { XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { REVIEW_SORTS } from "@/lib/sorting";
import { COMPANY_SIZES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ReviewFilters({ industries }: { industries: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = React.useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      }
      params.delete("page");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const rating = searchParams.get("rating") ?? "";
  const size = searchParams.get("size") ?? "";
  const industry = searchParams.get("industry") ?? "";
  const sort = searchParams.get("sort") ?? "recent";
  const hasFilters = Boolean(rating || size || industry);

  const selectClasses =
    "h-10 rounded-xl border border-input bg-background px-3 text-sm focus-visible:border-[var(--ring)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const value = String(star);
          const active = rating === value;
          return (
            <button
              key={star}
              type="button"
              onClick={() => setFilter({ rating: active ? null : value })}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium tabular-nums transition-colors",
                active
                  ? "border-transparent bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
                  : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {star} star{star === 1 ? "" : "s"}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="review-size">
          Company size
        </label>
        <select
          id="review-size"
          value={size}
          onChange={(event) => setFilter({ size: event.target.value })}
          className={selectClasses}
        >
          <option value="">Any company size</option>
          {COMPANY_SIZES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="review-industry">
          Industry
        </label>
        <select
          id="review-industry"
          value={industry}
          onChange={(event) => setFilter({ industry: event.target.value })}
          className={selectClasses}
        >
          <option value="">Any industry</option>
          {industries.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="review-sort">
          Sort reviews
        </label>
        <select
          id="review-sort"
          value={sort}
          onChange={(event) => setFilter({ sort: event.target.value })}
          className={selectClasses}
        >
          {REVIEW_SORTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hasFilters ? (
          <button
            type="button"
            onClick={() => setFilter({ rating: null, size: null, industry: null })}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon className="size-3.5" aria-hidden="true" />
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
