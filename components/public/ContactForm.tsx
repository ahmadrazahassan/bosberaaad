"use client";

import { CheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { IDLE, sendContactMessage } from "@/lib/actions/forms";

const SUBJECT_PRESETS: Record<string, string> = {
  listing: "Listing our software on Bosberaaad",
  correction: "A correction to a review",
  advertising: "Advertising enquiry",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = React.useActionState(sendContactMessage, IDLE);
  const id = React.useId();

  const presetKey = searchParams.get("subject") ?? "";
  const defaultSubject = SUBJECT_PRESETS[presetKey] ?? "";

  if (state.status === "success") {
    return (
      <div className="card-modern flex flex-col items-center gap-4 p-10 text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]">
          <CheckIcon className="size-7" strokeWidth={3} aria-hidden="true" />
        </span>
        <h2 className="font-heading text-2xl font-bold tracking-tight">Message sent</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-modern flex flex-col gap-6 p-6 sm:p-8">
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-trap`}>Company website</label>
        <input id={`${id}-trap`} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-name`}>Your name</Label>
          <Input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            className="mt-1.5"
            aria-invalid={state.errors?.name ? true : undefined}
          />
          <FieldError className="mt-1">{state.errors?.name}</FieldError>
        </div>
        <div>
          <Label htmlFor={`${id}-email`}>Email address</Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5"
            aria-invalid={state.errors?.email ? true : undefined}
          />
          <FieldError className="mt-1">{state.errors?.email}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor={`${id}-subject`}>Subject</Label>
        <Input
          id={`${id}-subject`}
          name="subject"
          required
          defaultValue={defaultSubject}
          className="mt-1.5"
          aria-invalid={state.errors?.subject ? true : undefined}
        />
        <FieldError className="mt-1">{state.errors?.subject}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${id}-message`}>Message</Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          rows={7}
          required
          minLength={20}
          className="mt-1.5"
          placeholder="Tell us what you need. If it is a correction, please include the page and what is wrong."
          aria-invalid={state.errors?.message ? true : undefined}
        />
        <FieldError className="mt-1">{state.errors?.message}</FieldError>
      </div>

      {state.status === "error" && !state.errors ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <CtaButton size="lg" pending={pending}>
          {pending ? "Sending" : "Send message"}
        </CtaButton>
        <p className="text-xs leading-relaxed text-muted-foreground">
          We keep contact messages for twenty four months and never add you to the newsletter from
          this form.
        </p>
      </div>
    </form>
  );
}
