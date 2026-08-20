"use client";

import { ThumbsUpIcon } from "lucide-react";
import * as React from "react";

import { markReviewHelpful } from "@/lib/actions/reviews";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Optimistic, and it never lies. If the write fails the count reverts, because
 * showing a number that did not persist is worse than showing no change.
 */
export function HelpfulButton({
  reviewId,
  initialCount,
}: {
  reviewId: string;
  initialCount: number;
}) {
  const [count, setCount] = React.useState(initialCount);
  const [voted, setVoted] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function vote() {
    if (voted || pending) return;
    const previous = count;
    setCount(previous + 1);
    setVoted(true);

    startTransition(async () => {
      const result = await markReviewHelpful(reviewId);
      if (!result.ok) {
        setCount(previous);
        setVoted(false);
      } else if (typeof result.count === "number") {
        setCount(result.count);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={vote}
      disabled={voted || pending}
      aria-pressed={voted}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-sm transition-colors",
        voted
          ? "border-[var(--color-brand)] bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]"
          : "text-muted-foreground hover:border-[var(--color-brand)] hover:text-foreground",
        pending && "opacity-60",
      )}
    >
      <ThumbsUpIcon className="size-3.5" aria-hidden="true" />
      <span className="tabular-nums">{formatNumber(count)}</span>
      <span>{voted ? "Marked helpful" : "Helpful"}</span>
    </button>
  );
}
