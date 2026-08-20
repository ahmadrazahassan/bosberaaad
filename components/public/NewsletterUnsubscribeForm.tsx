"use client";

import { CheckIcon } from "lucide-react";
import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";
import { FieldError, Input, Label } from "@/components/ui/input";
import { IDLE, unsubscribeFromNewsletter } from "@/lib/actions/forms";

export function NewsletterUnsubscribeForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [state, formAction, pending] = React.useActionState(unsubscribeFromNewsletter, IDLE);
  const id = React.useId();

  if (state.status === "success") {
    return (
      <div className="card-modern flex flex-col items-center gap-4 p-10 text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]">
          <CheckIcon className="size-7" strokeWidth={3} aria-hidden="true" />
        </span>
        <h2 className="font-heading text-2xl font-bold tracking-tight">Unsubscribed</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-modern flex flex-col gap-5 p-6 sm:p-8">
      <div>
        <Label htmlFor={id}>Email address</Label>
        <Input
          id={id}
          type="email"
          name="email"
          required
          defaultValue={defaultEmail}
          autoComplete="email"
          className="mt-1.5"
          aria-invalid={state.errors?.email ? true : undefined}
        />
        <FieldError className="mt-1">{state.errors?.email}</FieldError>
      </div>

      <CtaButton variant="soft" size="lg" pending={pending}>
        {pending ? "Unsubscribing" : "Unsubscribe"}
      </CtaButton>

      <p className="text-xs leading-relaxed text-muted-foreground">
        We keep a record of the address so we do not email you again by mistake. That record holds
        nothing but the address and the date.
      </p>
    </form>
  );
}
