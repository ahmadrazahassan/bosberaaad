"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A pill rather than a rounded rectangle, on a hairline ring rather than a
 * drop shadow. The shadow only appears on focus, so the control sits quietly
 * in the page until someone reaches for it.
 */
export function SearchBar({
  defaultValue = "",
  placeholder = "Search accounting, payroll, CRM and more",
  size = "default",
  className,
}: {
  defaultValue?: string;
  placeholder?: string;
  size?: "sm" | "default";
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(defaultValue);
  const id = React.useId();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  const compact = size === "sm";

  return (
    <form onSubmit={onSubmit} role="search" className={cn("w-full", className)}>
      <label htmlFor={id} className="sr-only">
        Search Bosberaaad
      </label>

      <div
        className={cn(
          "group flex items-center gap-2.5 rounded-full bg-background p-1 transition-shadow",
          "shadow-[inset_0_0_0_1px_var(--input)]",
          "focus-within:shadow-[inset_0_0_0_1.5px_var(--color-brand),0_6px_20px_-10px_rgba(201,58,15,0.4)]",
          compact ? "pl-3.5" : "pl-4",
        )}
      >
        <SearchIcon
          className="size-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-[var(--color-brand-dark)]"
          aria-hidden="true"
        />

        <input
          id={id}
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground",
            compact ? "h-8" : "h-9",
          )}
        />

        {/*
         * The same pill as every other call to action, sized down and without
         * the chip: inside a search field the arrow would read as a second
         * affordance rather than as one.
         */}
        <button
          type="submit"
          className={cn(
            "btn-cta shrink-0 justify-center",
            compact ? "h-8 px-4 text-[0.62rem]" : "h-9 px-5 text-[0.68rem]",
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}
