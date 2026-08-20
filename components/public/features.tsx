import { CheckIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

import { integrationLogo } from "@/lib/assets";

import { Badge } from "@/components/ui/badge";
import type { Software } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FeatureChecklist({
  items,
  columns = 2,
  className,
}: {
  items: string[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-3",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-[var(--color-brand-light)]"
            aria-hidden="true"
          >
            <CheckIcon className="size-3 text-[var(--color-brand-dark)]" strokeWidth={3} />
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TopFeatures({ software }: { software: Software }) {
  if (software.top_features.length === 0) return null;

  return (
    <div className="tray">
      <div className="grid gap-2 md:grid-cols-2">
        {software.top_features.map((feature, index) => (
          <div key={feature} className="tray-card flex items-start gap-4 p-6">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-brand-deep)] font-heading text-sm font-bold text-[var(--color-brand-ink)]"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The local yardstick. Every product is measured against the same compliance
 * list for its category, and this is where the reader sees the result.
 */
export function ComplianceList({ software }: { software: Software }) {
  if (software.compliance.length === 0) return null;

  return (
    <div className="card-modern flex flex-col gap-5 p-6">
      <div className="flex items-center gap-2.5">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-brand-light)]"
          aria-hidden="true"
        >
          <ShieldCheckIcon className="size-5 text-[var(--color-brand-dark)]" />
        </span>
        <h3 className="font-heading text-base font-bold tracking-tight">
          South African compliance
        </h3>
      </div>

      <ul className="flex flex-col gap-2.5">
        {software.compliance.map((item) => {
          // Statements of absence are marked plainly rather than shown as ticks.
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
              <span
                className={cn(
                  "leading-relaxed",
                  negative ? "text-muted-foreground" : "text-foreground/85",
                )}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>

      {software.bank_feeds.length > 0 ? (
        <div className="border-t border-border pt-5">
          <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
            {/* Payroll produces ACB payment files. Only ledgers have feeds. */}
            {software.category_id === "cat-payroll" ? "ACB payment files" : "Bank support"}
          </p>
          {/* A single long entry is a sentence, not a set of bank names. */}
          {software.bank_feeds.length === 1 && software.bank_feeds[0].length > 28 ? (
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {software.bank_feeds[0]}
            </p>
          ) : (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {software.bank_feeds.map((bank) => (
                <Badge key={bank} variant="muted">
                  {bank}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Real logos where we hold them, a plain chip where we do not. Entries such as
 * "Open REST API" are not companies at all, so they correctly never get a mark.
 */
export function IntegrationList({ software }: { software: Software }) {
  if (software.integrations.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {software.integrations.map((integration) => {
        const logo = integrationLogo(integration);
        return (
          <li
            key={integration}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card py-1.5 pr-3 pl-1.5 text-sm"
          >
            {logo ? (
              <Image
                src={logo}
                alt=""
                width={40}
                height={40}
                className="size-5 shrink-0 rounded-md object-contain"
              />
            ) : (
              <span
                className="grid size-5 shrink-0 place-items-center rounded-md bg-muted text-[0.6rem] font-bold text-muted-foreground"
                aria-hidden="true"
              >
                {integration.slice(0, 1)}
              </span>
            )}
            <span className="text-muted-foreground">{integration}</span>
          </li>
        );
      })}
    </ul>
  );
}
