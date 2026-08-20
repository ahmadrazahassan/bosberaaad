import type { LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The centred section header. Pill eyebrow, large heading, muted subtitle.
 * Used at the top of every section on every page, which is most of what makes
 * the site read as one product.
 *
 * Headings are plain type. `highlight` and `titleAfter` stay in the API because
 * the copy at every call site is written as one sentence split across three
 * props, but nothing is given a coloured pill any more. The typography carries
 * the heading on its own.
 */
export function SectionHeader({
  eyebrow,
  icon: Icon,
  title,
  highlight,
  titleAfter,
  subtitle,
  className,
  align = "center",
  as: Heading = "h2",
  id,
}: {
  eyebrow?: string;
  icon?: LucideIcon;
  title: React.ReactNode;
  /** The middle of the heading sentence. Rendered as ordinary heading text. */
  highlight?: string;
  /** Anything that follows it. */
  titleAfter?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex max-w-xl flex-col gap-5 pb-2",
        centered ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground/80">
          {Icon ? <Icon className="size-4 text-muted-foreground" aria-hidden="true" /> : null}
          {eyebrow}
        </p>
      ) : null}

      <Heading
        id={id}
        className={cn(
          "font-heading tracking-tight text-balance",
          Heading === "h1"
            ? "text-4xl font-bold sm:text-5xl sm:leading-[1.12]"
            : "text-3xl font-medium sm:text-[2.6rem] sm:leading-[1.18]",
        )}
      >
        {title}
        {highlight ? <> {highlight}</> : null}
        {titleAfter ? <> {titleAfter}</> : null}
      </Heading>

      {subtitle ? (
        <p className="text-base leading-relaxed text-pretty text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

/** Small uppercase label used above stats and in card corners. */
export function MicroLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase", className)}
      {...props}
    />
  );
}
