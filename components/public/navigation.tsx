import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { buildQuery, cn } from "@/lib/utils";

/* ------------------------------------------------------------- Breadcrumbs */

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded transition-colors hover:text-[var(--color-brand-dark)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && "font-medium text-foreground")} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRightIcon className="size-3.5 shrink-0 opacity-50" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------- Pagination */

/**
 * Every page link carries the currently active filters forward, so paging
 * never silently resets a filtered view.
 */
export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
  className,
  label = "Pagination",
}: {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | number | undefined | null>;
  className?: string;
  label?: string;
}) {
  if (totalPages <= 1) return null;

  const href = (target: number) =>
    `${basePath}${buildQuery(query, { page: target === 1 ? undefined : target })}`;

  const window = 1;
  const pages: (number | "gap")[] = [];
  for (let i = 1; i <= totalPages; i += 1) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= window) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }

  const linkClasses =
    "grid h-10 min-w-10 place-items-center rounded-xl border border-border px-3 text-sm font-medium tabular-nums transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)]";

  return (
    <nav aria-label={label} className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      {page > 1 ? (
        <Link href={href(page - 1)} className={linkClasses} rel="prev">
          Previous
        </Link>
      ) : (
        <span className={cn(linkClasses, "pointer-events-none opacity-40")} aria-hidden="true">
          Previous
        </span>
      )}

      {pages.map((entry, index) =>
        entry === "gap" ? (
          <span key={`gap-${index}`} className="px-1 text-muted-foreground" aria-hidden="true">
            ...
          </span>
        ) : entry === page ? (
          <span
            key={entry}
            aria-current="page"
            className="grid h-10 min-w-10 place-items-center rounded-xl border border-transparent bg-[var(--color-brand-deep)] px-3 text-sm font-bold tabular-nums text-[var(--color-brand-ink)]"
          >
            {entry}
          </span>
        ) : (
          <Link key={entry} href={href(entry)} className={linkClasses}>
            {entry}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={href(page + 1)} className={linkClasses} rel="next">
          Next
        </Link>
      ) : (
        <span className={cn(linkClasses, "pointer-events-none opacity-40")} aria-hidden="true">
          Next
        </span>
      )}
    </nav>
  );
}
