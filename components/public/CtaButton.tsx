import { ArrowRightIcon, ArrowUpRightIcon, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The only call to action button on the site.
 *
 * A neutral pill with an uppercase label and the brand orange concentrated in
 * a chip on the right. Every CTA uses this, so they are identical rather than
 * merely similar, and there is one place to change them.
 *
 * The chip is a flex sibling of the label, never an absolutely positioned
 * layer, so it cannot land on top of the text at any label length.
 */

type Variant = "default" | "soft" | "onDark" | "tint";
type Size = "xs" | "sm" | "default" | "lg";

const SIZES: Record<Size, { shell: string; label: string; chip: string; icon: string }> = {
  xs: {
    shell: "h-8 gap-2 pr-2.5 pl-3 text-[0.62rem]",
    label: "",
    chip: "size-4 rounded-[0.3rem]",
    icon: "size-3.5",
  },
  sm: {
    shell: "h-10 gap-3 pr-1 pl-4 text-[0.68rem]",
    label: "",
    chip: "size-8 rounded-[0.55rem]",
    icon: "size-3.5",
  },
  default: {
    shell: "h-12 gap-4 pr-1.5 pl-5 text-[0.72rem]",
    label: "",
    chip: "size-9 rounded-[0.65rem]",
    icon: "size-4",
  },
  lg: {
    shell: "h-14 gap-5 pr-1.5 pl-7 text-[0.78rem]",
    label: "",
    chip: "size-11 rounded-[0.75rem]",
    icon: "size-[1.15rem]",
  },
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Hide the chip for actions that are not a step forward, such as Save. */
  arrow?: boolean;
  /** `external` points the arrow out, for links that leave the site. */
  icon?: "forward" | "external";
  /** Swaps the arrow for a spinner while a form action is in flight. */
  pending?: boolean;
  /**
   * Circular chip and a sentence case label. Composes with any variant; the
   * header pairs it with `soft`.
   */
  plain?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Inner({
  size,
  arrow,
  pending,
  icon,
  children,
}: Required<Pick<CommonProps, "size" | "arrow" | "pending" | "icon">> & {
  children: React.ReactNode;
}) {
  const Glyph = icon === "external" ? ArrowUpRightIcon : ArrowRightIcon;
  const scale = SIZES[size];

  return (
    <>
      <span className={scale.label}>{children}</span>
      {arrow ? (
        <span className={cn("btn-cta-chip", scale.chip)} aria-hidden="true">
          {pending ? (
            <LoaderCircleIcon className={cn(scale.icon, "animate-spin")} />
          ) : (
            <Glyph className={scale.icon} strokeWidth={2.5} />
          )}
        </span>
      ) : null}
    </>
  );
}

export function CtaButton({
  variant = "default",
  size = "default",
  arrow = true,
  pending = false,
  plain = false,
  icon = "forward",
  className,
  children,
  href,
  ...props
}: CommonProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<React.ComponentProps<"button">, "className" | "children">)
  )) {
  const classes = cn(
    "btn-cta",
    variant === "soft" && "btn-cta-soft",
    variant === "onDark" && "btn-cta-on-dark",
    variant === "tint" && "btn-cta-tint",
    plain && "btn-cta-plain",
    SIZES[size].shell,
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
    className,
  );

  const inner = (
    <Inner size={size} arrow={arrow} pending={pending} icon={icon}>
      {children}
    </Inner>
  );

  if (typeof href === "string") {
    // The tracking route and any vendor link need a real navigation.
    const isExternal = href.startsWith("http") || href.startsWith("/api/");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...(props as React.ComponentProps<"a">)}>
          {inner}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}
      >
        {inner}
      </Link>
    );
  }

  const buttonProps = props as React.ComponentProps<"button">;

  return (
    <button
      type="button"
      {...buttonProps}
      className={classes}
      // After the spread on purpose: a pending action is always disabled,
      // whatever the caller passed.
      disabled={pending || buttonProps.disabled}
    >
      {inner}
    </button>
  );
}
