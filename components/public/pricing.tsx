import { CheckIcon, InfoIcon, MinusIcon } from "lucide-react";

import { AffiliateCTAButton, AffiliateDisclosureNote } from "@/components/public/affiliate";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPricePerPeriod, vatLabel } from "@/lib/format";
import type { Software } from "@/lib/types";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------- PricingCards */

export function PricingCards({ software }: { software: Software }) {
  const plans = software.pricing_plans;
  if (plans.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-2",
        plans.length === 1
          ? "max-w-md"
          : plans.length === 2
            ? "sm:grid-cols-2"
            : plans.length === 3
              ? "md:grid-cols-3"
              : "sm:grid-cols-2 xl:grid-cols-4",
      )}
    >
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "tray-card relative flex flex-col gap-5 p-6",
            plan.popular && "ring-2 ring-[var(--color-brand)]",
          )}
        >
          {plan.popular ? (
            <Badge className="absolute -top-2.5 left-6">Most chosen</Badge>
          ) : null}

          <div>
            <h3 className="font-heading text-base font-bold tracking-tight">{plan.name}</h3>
            <p className="mt-3 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
              {plan.price === null
                ? "On quotation"
                : plan.price === 0
                  ? "Free"
                  : formatPricePerPeriod(plan.price, software.price_currency, plan.period)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {plan.price === null || plan.price === 0
                ? " "
                : vatLabel(plan.vat_inclusive)}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

          {plan.user_limit ? (
            <p className="text-xs font-medium text-[var(--color-brand-dark)]">{plan.user_limit}</p>
          ) : null}

          <ul className="mt-auto flex flex-col gap-2.5 border-t border-border pt-5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <CheckIcon
                  className="mt-0.5 size-4 shrink-0 text-[var(--color-brand-dark)]"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span className="leading-relaxed text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- PricingTable */

export function PricingTable({ software }: { software: Software }) {
  const plans = software.pricing_plans;
  if (plans.length < 2) return null;

  // Every distinct feature across every plan, in first appearance order.
  const allFeatures: string[] = [];
  for (const plan of plans) {
    for (const feature of plan.features) {
      if (feature.startsWith("Everything in ")) continue;
      if (!allFeatures.includes(feature)) allFeatures.push(feature);
    }
  }

  /**
   * Tiers inherit through an "Everything in <plan>" line. Resolve each plan's
   * full set once, by name, so a chain of three or four tiers is correct and
   * a plan that does not inherit is not given features it never had.
   */
  const resolved = new Map<string, Set<string>>();
  for (const plan of plans) {
    const own = new Set(plan.features.filter((f) => !f.startsWith("Everything in ")));
    for (const line of plan.features) {
      if (!line.startsWith("Everything in ")) continue;
      const parentName = line.slice("Everything in ".length).trim();
      const parent =
        resolved.get(parentName) ??
        resolved.get(
          plans.find((p) => p.name.toLowerCase().endsWith(parentName.toLowerCase()))?.name ?? "",
        );
      if (parent) for (const feature of parent) own.add(feature);
    }
    resolved.set(plan.name, own);
  }

  const has = (planName: string, feature: string) =>
    resolved.get(planName)?.has(feature) ?? false;

  return (
    <Table caption={`${software.name} feature comparison by plan`}>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-56">Feature</TableHead>
          {plans.map((plan) => (
            <TableHead key={plan.name} className="text-center whitespace-nowrap">
              {plan.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allFeatures.map((feature) => (
          <TableRow key={feature}>
            <TableCell className="text-sm">{feature}</TableCell>
            {plans.map((plan) => (
              <TableCell key={plan.name} className="text-center">
                {has(plan.name, feature) ? (
                  <>
                    <CheckIcon
                      className="mx-auto size-4 text-[var(--color-brand-dark)]"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Included</span>
                  </>
                ) : (
                  <>
                    <MinusIcon className="mx-auto size-4 text-muted-foreground/40" aria-hidden="true" />
                    <span className="sr-only">Not included</span>
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ---------------------------------------------------------------- PriceNote */

/**
 * List prices move. Saying when we last checked, and telling the reader to
 * confirm, is the difference between a review people trust and one they catch
 * out.
 */
export function PriceNote({ software }: { software: Software }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-muted p-4 text-sm">
      <span
        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-muted"
        aria-hidden="true"
      >
        <InfoIcon className="size-3.5 text-muted-foreground" />
      </span>
      <div className="text-muted-foreground">
        <p className="leading-relaxed">
          {software.pricing_note ??
            `Prices are ${software.vendor_name}'s published South African list prices.`}
        </p>
        <p className="mt-1.5 leading-relaxed">
          Last checked {formatDate(software.price_checked_at ?? null, "long")}. Vendors change
          prices and run promotions without notice, so confirm the current figure on the vendor
          website before you buy.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ VendorSpecSheet */

export function VendorSpecSheet({ software }: { software: Software }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Vendor", value: software.vendor_name ?? "Not stated" },
    { label: "Founded", value: software.founded_year ?? "Not stated" },
    {
      label: "Available in",
      value: software.countries_available.slice(0, 4).join(", ") || "South Africa",
    },
    { label: "Languages", value: software.languages.join(", ") || "English" },
    { label: "Support", value: software.support_types.join(", ") || "Not stated" },
    {
      label: "Free trial",
      value: software.free_trial ? (software.trial_note ?? "Yes") : "No",
    },
    { label: "Product demo", value: software.demo_available ? "Available" : "Not advertised" },
  ];

  return (
    <div className="card-modern flex flex-col gap-6 p-6">
      <div>
        <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
          Starting price
        </p>
        <p className="mt-2 font-heading text-3xl font-extrabold tabular-nums tracking-tight">
          {software.starting_price === null
            ? "On quotation"
            : software.starting_price === 0
              ? "Free"
              : formatPricePerPeriod(
                  software.starting_price,
                  software.price_currency,
                  software.billing_period,
                )}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {software.starting_price === null || software.starting_price === 0
            ? "pricing quoted on request"
            : vatLabel(software.price_vat_inclusive)}
        </p>
      </div>

      <dl className="flex flex-col gap-3 border-t border-border pt-5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 border-t border-border pt-5">
        <AffiliateCTAButton software={software} className="w-full" placement="profile-pricing" />
        <AffiliateDisclosureNote />
      </div>
    </div>
  );
}
