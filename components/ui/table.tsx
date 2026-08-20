import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Wide tables scroll inside their own container. The page body must never
 * scroll horizontally, so the overflow lives here rather than on the layout.
 */
export function Table({
  className,
  containerClassName,
  caption,
  ...props
}: React.ComponentProps<"table"> & { containerClassName?: string; caption?: string }) {
  return (
    <div
      className={cn("w-full overflow-x-auto", containerClassName)}
      tabIndex={0}
      role="region"
      aria-label={caption}
    >
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b border-border transition-colors hover:bg-muted/60", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}

export function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn("mt-3 text-sm text-muted-foreground", className)} {...props} />;
}
