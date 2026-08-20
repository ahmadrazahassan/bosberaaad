import { Slot } from "radix-ui";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]",
        secondary: "border-transparent bg-[var(--color-navy)] text-white",
        destructive: "border-transparent bg-destructive text-white",
        outline: "border-border text-foreground",
        /* Soft orange wash with deep orange text. Passes AA in both themes. */
        success:
          "border-transparent bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]",
        amber: "border-transparent bg-[var(--color-amber)]/15 text-[var(--color-amber-dark)]",
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean };

export function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
