"use client";

import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";

export type CompareOption = { slug: string; name: string; category: string };
type Option = CompareOption;

/**
 * Pick two products, go to their comparison.
 *
 * One row on a wide screen: product, vs, product, button. The whole thing is
 * width capped, because a control this simple sprawling across 1440px reads as
 * a form to fill in rather than a two second choice.
 */
export function CompareSelector({ options }: { options: Option[] }) {
  const router = useRouter();
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const idA = React.useId();
  const idB = React.useId();

  const grouped = React.useMemo(() => {
    const map = new Map<string, Option[]>();
    for (const option of options) {
      const list = map.get(option.category) ?? [];
      list.push(option);
      map.set(option.category, list);
    }
    return Array.from(map.entries());
  }, [options]);

  const sameProduct = Boolean(a && b && a === b);
  const ready = Boolean(a && b) && !sameProduct;

  function compare(event: React.FormEvent) {
    event.preventDefault();
    if (!ready) return;
    router.push(`/compare/${a}-vs-${b}`);
  }

  return (
    <form
      onSubmit={compare}
      className="mx-auto w-full max-w-4xl rounded-[1.75rem] border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-3">
        <ProductField
          id={idA}
          label="First product"
          value={a}
          onChange={setA}
          grouped={grouped}
          exclude={b}
        />

        <span
          className="hidden shrink-0 pb-3.5 font-heading text-xs font-bold tracking-widest text-muted-foreground uppercase lg:block"
          aria-hidden="true"
        >
          vs
        </span>

        <ProductField
          id={idB}
          label="Second product"
          value={b}
          onChange={setB}
          grouped={grouped}
          exclude={a}
        />

        <CtaButton type="submit" disabled={!ready} className="shrink-0 lg:mb-0">
          Compare
        </CtaButton>
      </div>

      {sameProduct ? (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          Choose two different products.
        </p>
      ) : null}
    </form>
  );
}

function ProductField({
  id,
  label,
  value,
  onChange,
  grouped,
  exclude,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  grouped: [string, Option[]][];
  exclude: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label
        htmlFor={id}
        className="block font-heading text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase"
      >
        {label}
      </label>

      {/* The native chevron differs on every platform, so it is replaced. */}
      <div className="relative mt-1.5">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full cursor-pointer appearance-none truncate rounded-xl border border-input bg-background pr-10 pl-3.5 text-sm font-medium transition-colors hover:border-foreground/25 focus-visible:border-[var(--ring)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]"
        >
          <option value="">Choose a product</option>
          {grouped.map(([category, items]) => (
            <optgroup key={category} label={category}>
              {items.map((item) => (
                <option key={item.slug} value={item.slug} disabled={item.slug === exclude}>
                  {item.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <ChevronDownIcon
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
