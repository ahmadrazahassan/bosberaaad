"use client";

import { CheckIcon } from "lucide-react";
import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";
import { FieldError, Input, Label } from "@/components/ui/input";
import { IDLE, subscribeToNewsletter } from "@/lib/actions/forms";
import { NEWSLETTER_INTERESTS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  variant = "light",
  source = "site",
  showInterests = false,
  className,
}: {
  variant?: "light" | "dark";
  source?: string;
  showInterests?: boolean;
  className?: string;
}) {
  const [state, formAction, pending] = React.useActionState(subscribeToNewsletter, IDLE);
  const dark = variant === "dark";
  const inputId = React.useId();

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-2xl p-5",
          dark ? "bg-white/10 text-white" : "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]",
          className,
        )}
        role="status"
      >
        <span
          className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
          aria-hidden="true"
        >
          <CheckIcon className="size-4" strokeWidth={3} />
        </span>
        <p className="text-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("flex flex-col gap-3", className)}>
      <input type="hidden" name="source" value={source} />

      {/* Honeypot. Hidden from people, offered to bots. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${inputId}-trap`}>Company website</label>
        <input id={`${inputId}-trap`} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Label htmlFor={inputId} className="sr-only">
            Email address
          </Label>
          <Input
            id={inputId}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@yourcompany.co.za"
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? `${inputId}-error` : undefined}
            className={cn(
              "h-12",
              dark && "border-white/15 bg-white/5 text-white placeholder:text-white/40",
            )}
          />
        </div>
        {/* A near black pill would disappear into the navy panel, so the dark
            surface takes the light button. */}
        <CtaButton
          size="lg"
          pending={pending}
          variant={dark ? "onDark" : "default"}
          className="h-12 shrink-0"
        >
          {pending ? "Subscribing" : "Subscribe"}
        </CtaButton>
      </div>

      {showInterests ? (
        <fieldset className="mt-2">
          <legend className={cn("mb-2 text-sm font-medium", dark ? "text-white/80" : "text-foreground")}>
            Which categories interest you?
          </legend>
          <div className="flex flex-wrap gap-2">
            {NEWSLETTER_INTERESTS.map((interest) => (
              <label
                key={interest}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  "has-checked:border-[var(--color-brand-deep)] has-checked:bg-[var(--color-brand-deep)] has-checked:text-[var(--color-brand-ink)]",
                  dark ? "border-white/15 text-white/70" : "border-border text-muted-foreground",
                )}
              >
                <input type="checkbox" name="interests" value={interest} className="sr-only" />
                {interest}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <FieldError id={`${inputId}-error`} className={dark ? "text-red-300" : undefined}>
        {state.errors?.email ?? (state.status === "error" ? state.message : "")}
      </FieldError>

      <p className={cn("text-xs leading-relaxed", dark ? "text-white/40" : "text-muted-foreground")}>
        By subscribing you consent to us emailing you. We record the consent as POPIA requires.
        Unsubscribe in one click, any time.
      </p>
    </form>
  );
}
