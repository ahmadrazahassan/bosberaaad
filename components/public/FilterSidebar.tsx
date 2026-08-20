"use client";

import { XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Checkbox } from "@/components/ui/misc";
import { DIRECTORY_SORTS, type DirectorySort } from "@/lib/sorting";
import { COMPANY_SIZES } from "@/lib/site";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const RATINGS = [
  { value: "4.5", label: "4.5 and above" },
  { value: "4", label: "4.0 and above" },
  { value: "3.5", label: "3.5 and above" },
];

/**
 * Every filter change resets to page one and preserves the other filters.
 * Changing a filter and staying on page four of the previous result set is the
 * classic directory bug.
 */
function useFilterNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return React.useCallback(
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
}

export function FilterSidebar({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const setFilter = useFilterNavigation();

  const category = searchParams.get("category") ?? "";
  const minRating = searchParams.get("rating") ?? "";
  const size = searchParams.get("size") ?? "";
  const freeTrial = searchParams.get("trial") === "1";
  const freeVersion = searchParams.get("free") === "1";
  const paidOnly = searchParams.get("paid") === "1";

  const activeCount = [category, minRating, size].filter(Boolean).length +
    [freeTrial, freeVersion, paidOnly].filter(Boolean).length;

  return (
    <aside className="flex flex-col gap-8" aria-label="Filter software">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-bold tracking-tight">Filter</h2>
        {activeCount > 0 ? (
          <Link
            href="/software"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon className="size-3.5" aria-hidden="true" />
            Clear {activeCount}
          </Link>
        ) : null}
      </div>

      <FilterGroup title="Category">
        <RadioRow
          name="category"
          label="All categories"
          checked={category === ""}
          onSelect={() => setFilter({ category: null })}
        />
        {categories.map((item) => (
          <RadioRow
            key={item.slug}
            name="category"
            label={item.name}
            count={item.software_count}
            checked={category === item.slug}
            onSelect={() => setFilter({ category: item.slug })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Minimum rating">
        <RadioRow
          name="rating"
          label="Any rating"
          checked={minRating === ""}
          onSelect={() => setFilter({ rating: null })}
        />
        {RATINGS.map((rating) => (
          <RadioRow
            key={rating.value}
            name="rating"
            label={rating.label}
            checked={minRating === rating.value}
            onSelect={() => setFilter({ rating: rating.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Pricing">
        <CheckRow
          label="Has a free trial"
          checked={freeTrial}
          onToggle={(next) => setFilter({ trial: next ? "1" : null })}
        />
        <CheckRow
          label="Has a free plan"
          checked={freeVersion}
          onToggle={(next) => setFilter({ free: next ? "1" : null, paid: null })}
        />
        <CheckRow
          label="Paid only"
          checked={paidOnly}
          onToggle={(next) => setFilter({ paid: next ? "1" : null, free: null })}
        />
      </FilterGroup>

      <FilterGroup title="Best for">
        <RadioRow
          name="size"
          label="Any business size"
          checked={size === ""}
          onSelect={() => setFilter({ size: null })}
        />
        {COMPANY_SIZES.map((option) => (
          <RadioRow
            key={option}
            name="size"
            label={option}
            checked={size === option}
            onSelect={() => setFilter({ size: option })}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

export function DirectorySortControl({ current }: { current: DirectorySort }) {
  const setFilter = useFilterNavigation();
  const id = React.useId();

  return (
    <div className="flex items-center gap-2.5">
      <label htmlFor={id} className="shrink-0 text-sm text-muted-foreground">
        Sort by
      </label>
      <select
        id={id}
        value={current}
        onChange={(event) => setFilter({ sort: event.target.value })}
        className="h-10 rounded-xl border border-input bg-background px-3 text-sm focus-visible:border-[var(--ring)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]"
      >
        {DIRECTORY_SORTS.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ------------------------------------------------------------------ Internals */

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
        {title}
      </legend>
      <div className="mt-3 flex flex-col gap-0.5">{children}</div>
    </fieldset>
  );
}

function RadioRow({
  name,
  label,
  count,
  checked,
  onSelect,
}: {
  name: string;
  label: string;
  count?: number;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
        checked ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60",
      )}
    >
      <span className="flex items-center gap-2.5">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onSelect}
          className="size-4 accent-[var(--color-brand-dark)]"
        />
        {label}
      </span>
      {count !== undefined ? (
        <span className="shrink-0 tabular-nums opacity-60">{count}</span>
      ) : null}
    </label>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: (next: boolean) => void;
}) {
  const id = React.useId();
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
        checked ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60",
      )}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={(value) => onToggle(value === true)} />
      <label htmlFor={id} className="cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}
