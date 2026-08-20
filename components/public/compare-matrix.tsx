import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";

import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";
import { formatNumber, formatPrice, formatRating } from "@/lib/format";
import type { PricingPlan, Software } from "@/lib/types";
import { cn } from "@/lib/utils";

/* ============================================================================
   The comparison matrix.

   One table, two product columns, and a hairline between every row. The column
   belonging to the higher rated product carries a pale brand wash for its whole
   height so the eye can follow it down the page without re reading the headers.

   The wash is the only thing that colour codes a product. Individual rows mark
   their own winner in weight and in brand coloured text, because a product can
   lead overall and still lose a row.
   ========================================================================== */

export type CompareCell =
  | { kind: "rating"; value: number }
  | { kind: "text"; value: string; note?: string }
  | { kind: "bool"; value: boolean; label?: string };

export type CompareRow = { label: string; a: CompareCell; b: CompareCell };
export type CompareGroup = { title: string; rows: CompareRow[] };

/** Which side a row favours, or null when the row is not a contest. */
function rowWinner(row: CompareRow): "a" | "b" | null {
  if (row.a.kind === "rating" && row.b.kind === "rating") {
    if (row.a.value === row.b.value) return null;
    return row.a.value > row.b.value ? "a" : "b";
  }
  if (row.a.kind === "bool" && row.b.kind === "bool") {
    if (row.a.value === row.b.value) return null;
    return row.a.value ? "a" : "b";
  }
  return null;
}

function Cell({ cell, wins }: { cell: CompareCell; wins: boolean }) {
  if (cell.kind === "bool") {
    return (
      <span className="inline-flex items-center gap-2.5">
        <span
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-full",
            cell.value
              ? "bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
              : "bg-[var(--color-navy)] text-white",
          )}
          aria-hidden="true"
        >
          {cell.value ? (
            <CheckIcon className="size-3" strokeWidth={3.5} />
          ) : (
            <XIcon className="size-3" strokeWidth={3.5} />
          )}
        </span>
        <span className={cn("text-sm", !cell.value && "text-muted-foreground")}>
          {cell.label ?? (cell.value ? "Yes" : "No")}
        </span>
      </span>
    );
  }

  if (cell.kind === "rating") {
    return (
      <span
        className={cn(
          "font-heading text-lg tabular-nums",
          wins ? "font-bold text-[var(--color-brand-dark)]" : "font-semibold",
        )}
      >
        {formatRating(cell.value)}
        {wins ? <span className="sr-only">, higher</span> : null}
      </span>
    );
  }

  return (
    <span className="text-sm">
      <span className="font-heading font-bold tabular-nums">{cell.value}</span>
      {cell.note ? (
        <span className="ml-1.5 text-xs font-normal text-muted-foreground">{cell.note}</span>
      ) : null}
    </span>
  );
}

function ColumnHead({
  software,
  leads,
  position,
}: {
  software: Software;
  leads: boolean;
  position: "a" | "b";
}) {
  return (
    <th
      scope="col"
      className={cn(
        "sticky top-0 z-10 rounded-t-2xl px-5 py-5 text-left align-bottom",
        leads ? "bg-[var(--color-brand-light)]" : "bg-muted",
        position === "a" ? "w-[30%]" : "w-[30%]",
      )}
    >
      <div className="flex items-center gap-3">
        <SoftwareLogo
          name={software.name}
          slug={software.slug}
          logoUrl={software.logo_url}
          brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
          size={34}
        />
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-bold tracking-tight">
            <Link href={`/software/${software.slug}`} className="hover:underline">
              {software.name}
            </Link>
          </p>
          {leads ? (
            <p className="mt-0.5 font-heading text-[0.6rem] font-bold tracking-widest text-[var(--color-brand-dark)] uppercase">
              Higher rated overall
            </p>
          ) : (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {software.vendor_name}
            </p>
          )}
        </div>
      </div>
    </th>
  );
}

export function CompareMatrix({
  a,
  b,
  groups,
  caption,
}: {
  a: Software;
  b: Software;
  groups: CompareGroup[];
  caption: string;
}) {
  const aLeads = a.overall_rating >= b.overall_rating;
  const wash = "bg-[var(--color-brand-light)]";
  const plain = "bg-muted/40";

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[42rem] border-separate border-spacing-0 text-left">
        <caption className="sr-only">{caption}</caption>

        <thead>
          <tr>
            <th scope="col" className="w-[40%] px-1 pb-0">
              <span className="sr-only">Compared on</span>
            </th>
            <ColumnHead software={a} leads={aLeads} position="a" />
            <ColumnHead software={b} leads={!aLeads} position="b" />
          </tr>
        </thead>

        {groups.map((group, groupIndex) => {
          const isLastGroup = groupIndex === groups.length - 1;

          return (
            <tbody key={group.title}>
              <tr>
                <th
                  scope="colgroup"
                  className="px-1 pt-9 pb-3 font-heading text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  {group.title}
                </th>
                {/* The wash has to continue through the group break, so these
                    two cells stay painted even though they hold nothing. */}
                <td className={cn("pt-9", aLeads ? wash : plain)} />
                <td className={cn("pt-9", aLeads ? plain : wash)} />
              </tr>

              {group.rows.map((row, rowIndex) => {
                const winner = rowWinner(row);
                const isLastRow = isLastGroup && rowIndex === group.rows.length - 1;

                return (
                  <tr key={row.label} className="group/row">
                    <th
                      scope="row"
                      className="border-b border-border px-1 py-4 text-sm font-medium text-pretty"
                    >
                      {row.label}
                    </th>
                    <td
                      className={cn(
                        "border-b border-border px-5 py-4",
                        aLeads ? wash : plain,
                        isLastRow && "rounded-b-2xl",
                      )}
                    >
                      <Cell cell={row.a} wins={winner === "a"} />
                    </td>
                    <td
                      className={cn(
                        "border-b border-border px-5 py-4",
                        aLeads ? plain : wash,
                        isLastRow && "rounded-b-2xl",
                      )}
                    >
                      <Cell cell={row.b} wins={winner === "b"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

/* ============================================================================
   The glance band. Four figures that state the size of the gap between the two
   products, set large because they are the summary a reader wants first.
   ========================================================================== */

export function CompareGlance({ a, b }: { a: Software; b: Software }) {
  const shared = a.features.filter((feature) => b.features.includes(feature)).length;
  const gap = Math.abs(a.overall_rating - b.overall_rating);

  const priceGap =
    a.starting_price !== null && b.starting_price !== null
      ? formatPrice(Math.abs(a.starting_price - b.starting_price), a.price_currency)
      : null;

  const figures: { label: string; value: string; unit?: string }[] = [
    { label: "Rating gap", value: gap.toFixed(1) },
    { label: "Reviews behind this", value: formatNumber(a.review_count + b.review_count) },
    ...(priceGap
      ? [{ label: "Monthly price gap", value: priceGap }]
      : [{ label: "Priced on scope", value: "Quoted" }]),
    { label: "Features they share", value: String(shared) },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-[2rem] bg-muted px-6 py-10 sm:px-10 lg:grid-cols-4 lg:gap-x-0">
      {figures.map((figure, index) => (
        <div
          key={figure.label}
          className={cn(
            "lg:px-8",
            index > 0 && "lg:border-l lg:border-border",
            index === 0 && "lg:pl-0",
          )}
        >
          <dt className="font-heading text-[0.65rem] leading-relaxed font-bold tracking-widest text-muted-foreground uppercase">
            {figure.label}
          </dt>
          <dd className="mt-8 font-heading text-[2.75rem] leading-none font-bold tabular-nums tracking-[-0.04em] sm:text-[3.25rem]">
            {figure.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ============================================================================
   Pricing. One panel per product, the plan name on the left and the figure set
   large on the right, because the number is what the page is being read for.
   ========================================================================== */

function PlanPrice({ plan, currency }: { plan: PricingPlan; currency: string }) {
  if (plan.price === null) {
    return <span className="font-heading text-xl font-bold tracking-tight">Quoted</span>;
  }
  if (plan.price === 0) {
    return <span className="font-heading text-xl font-bold tracking-tight">Free</span>;
  }

  const suffix = plan.period === "year" ? "/yr" : plan.period === "month" ? "/mo" : "once";

  return (
    <span className="font-heading text-2xl leading-none font-bold tabular-nums tracking-[-0.03em] sm:text-[1.75rem]">
      {formatPrice(plan.price, currency)}
      <span className="ml-1 align-baseline text-xs font-semibold text-muted-foreground">
        {suffix}
      </span>
    </span>
  );
}

export function PricingPanels({ a, b }: { a: Software; b: Software }) {
  const aLeads = a.overall_rating >= b.overall_rating;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[a, b].map((software) => {
        const leads = software.id === (aLeads ? a.id : b.id);

        return (
          <section
            key={software.id}
            aria-label={`${software.name} pricing`}
            className="flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card"
          >
            <header
              className={cn(
                "flex items-center gap-3 px-6 py-5",
                leads ? "bg-[var(--color-brand-light)]" : "bg-muted",
              )}
            >
              <SoftwareLogo
                name={software.name}
                slug={software.slug}
                logoUrl={software.logo_url}
                brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
                size={38}
              />
              <div className="min-w-0">
                <h3 className="truncate font-heading text-base font-bold tracking-tight">
                  {software.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {software.price_vat_inclusive ? "Listed including VAT" : "Listed excluding VAT"}
                </p>
              </div>
            </header>

            {software.pricing_plans.length === 0 ? (
              <p className="px-6 py-8 text-sm text-muted-foreground">
                Pricing is quoted on scope. Ask for a written quote before comparing.
              </p>
            ) : (
              <ul className="flex flex-col px-6">
                {software.pricing_plans.map((plan) => (
                  <li
                    key={plan.name}
                    className="flex items-center justify-between gap-4 border-b border-border py-5 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 font-heading text-sm font-bold tracking-tight">
                        <span className="truncate">{plan.name}</span>
                        {plan.popular ? (
                          <span className="shrink-0 rounded-full bg-[var(--color-brand-tint)] px-2 py-0.5 font-heading text-[0.55rem] font-bold tracking-widest text-[var(--color-brand-dark)] uppercase">
                            Popular
                          </span>
                        ) : null}
                      </p>
                      {plan.user_limit ? (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {plan.user_limit}
                        </p>
                      ) : null}
                    </div>
                    <PlanPrice plan={plan} currency={software.price_currency} />
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-auto border-t border-border px-6 py-4 text-xs leading-relaxed text-muted-foreground">
              {software.pricing_note ?? "Confirm current pricing with the vendor before buying."}
            </p>
          </section>
        );
      })}
    </div>
  );
}
