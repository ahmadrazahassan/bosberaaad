import {
  BanknoteIcon,
  BoxesIcon,
  CalculatorIcon,
  ContactIcon,
  KanbanSquareIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Category icons are mapped explicitly rather than resolved dynamically from a
 * string, so the bundle only carries the six icons the site actually uses.
 */
const ICONS: Record<string, LucideIcon> = {
  Calculator: CalculatorIcon,
  Banknote: BanknoteIcon,
  Users: UsersIcon,
  Contact: ContactIcon,
  Boxes: BoxesIcon,
  KanbanSquare: KanbanSquareIcon,
};

export function CategoryIcon({
  name,
  className,
  tone = "default",
  strokeWidth,
}: {
  name: string;
  className?: string;
  tone?: "default" | "brand" | "onDark" | "ink";
  /** Lucide defaults to 2. Drop it for a lighter line at display sizes. */
  strokeWidth?: number;
}) {
  // Read straight from the map. Resolving through a helper that returns a
  // component reads as constructing a component during render.
  const Icon: LucideIcon = ICONS[name] ?? BoxesIcon;
  return (
    <Icon
      className={cn(
        "size-5",
        tone === "brand" && "text-[var(--color-brand-dark)]",
        tone === "onDark" && "text-[var(--color-brand)]",
        tone === "ink" && "text-foreground",
        tone === "default" && "text-muted-foreground",
        className,
      )}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
