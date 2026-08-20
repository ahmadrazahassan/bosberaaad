"use client";

import { CheckIcon, UndoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { markContactHandled } from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

export function HandledToggle({ id, handled }: { id: string; handled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function toggle() {
    startTransition(async () => {
      const result = await markContactHandled(id, !handled);
      if (result.status === "error") toast.error(result.message);
      else {
        toast.success(result.message);
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-sm font-medium transition-colors",
        handled ? "hover:bg-muted" : "hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)]",
        pending && "opacity-60",
      )}
    >
      {handled ? (
        <>
          <UndoIcon className="size-4" aria-hidden="true" />
          Reopen
        </>
      ) : (
        <>
          <CheckIcon className="size-4" aria-hidden="true" />
          Mark handled
        </>
      )}
    </button>
  );
}
