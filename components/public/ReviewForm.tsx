"use client";

import { CheckIcon, StarIcon } from "lucide-react";
import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";
import { FieldError, FieldHint, Input, Label, Textarea } from "@/components/ui/input";
import { IDLE } from "@/lib/actions/forms";
import { submitReview } from "@/lib/actions/reviews";
import {
  COMPANY_SIZES,
  DEFAULT_REVIEWER_COUNTRY,
  REVIEWER_COUNTRIES,
  REVIEW_RATING_FIELDS,
  USAGE_DURATIONS,
} from "@/lib/site";
import type { Software } from "@/lib/types";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------ StarSelector */

export function StarSelector({
  name,
  label,
  error,
  required = true,
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
}) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const groupId = React.useId();
  const active = hover || value;

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-medium" id={groupId}>
          {label}
          {required ? <span className="sr-only"> (required)</span> : null}
        </legend>

        <div className="mt-2 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              className="cursor-pointer p-0.5"
              onMouseEnter={() => setHover(star)}
            >
              <input
                type="radio"
                name={name}
                value={star}
                checked={value === star}
                onChange={() => setValue(star)}
                required={required}
                className="peer sr-only"
                aria-label={`${star} out of 5`}
              />
              <StarIcon
                className={cn(
                  "size-7 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ring)]",
                  star <= active ? "text-[var(--color-star)]" : "text-muted-foreground/30",
                )}
                fill="currentColor"
                aria-hidden="true"
              />
            </label>
          ))}
          <span className="ml-2 font-heading text-sm font-bold tabular-nums text-muted-foreground">
            {value > 0 ? `${value} of 5` : "Not rated"}
          </span>
        </div>
      </fieldset>
      <FieldError className="mt-1">{error}</FieldError>
    </div>
  );
}

/* --------------------------------------------------------------- ReviewForm */

export function ReviewForm({ software }: { software: Software }) {
  const [state, formAction, pending] = React.useActionState(submitReview, IDLE);
  const id = React.useId();

  if (state.status === "success") {
    return (
      <div className="card-modern flex flex-col items-center gap-4 p-10 text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]">
          <CheckIcon className="size-7" strokeWidth={3} aria-hidden="true" />
        </span>
        <h2 className="font-heading text-2xl font-bold tracking-tight">Review received</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <input type="hidden" name="software_id" value={software.id} />
      <input type="hidden" name="software_slug" value={software.slug} />

      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-trap`}>Company website</label>
        <input id={`${id}-trap`} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Ratings */}
      <section className="card-modern p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold tracking-tight">Your ratings</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Rate all five. The overall score is what appears next to your review.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {REVIEW_RATING_FIELDS.map((field) => (
            <StarSelector
              key={field.key}
              name={field.key}
              label={field.label}
              error={state.errors?.[field.key]}
            />
          ))}
        </div>
      </section>

      {/* The review */}
      <section className="card-modern flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <h2 className="font-heading text-xl font-bold tracking-tight">Your review</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Be specific and be honest. A review with no criticism is not useful to anyone.
          </p>
        </div>

        <Field
          id={`${id}-title`}
          name="review_title"
          label="Headline"
          placeholder="Sum up your experience in a sentence"
          error={state.errors?.review_title}
          required
        />

        <div>
          <Label htmlFor={`${id}-summary`}>Your experience</Label>
          <Textarea
            id={`${id}-summary`}
            name="summary"
            rows={6}
            required
            minLength={60}
            placeholder="What did you use it for, what changed, and what would you tell someone considering it?"
            className="mt-1.5"
            aria-invalid={state.errors?.summary ? true : undefined}
          />
          <FieldHint className="mt-1.5">At least 60 characters.</FieldHint>
          <FieldError className="mt-1">{state.errors?.summary}</FieldError>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor={`${id}-pros`}>What it does well</Label>
            <Textarea
              id={`${id}-pros`}
              name="pros"
              rows={4}
              required
              className="mt-1.5"
              placeholder="The things that genuinely work"
              aria-invalid={state.errors?.pros ? true : undefined}
            />
            <FieldError className="mt-1">{state.errors?.pros}</FieldError>
          </div>
          <div>
            <Label htmlFor={`${id}-cons`}>What it does badly</Label>
            <Textarea
              id={`${id}-cons`}
              name="cons"
              rows={4}
              required
              className="mt-1.5"
              placeholder="The things that frustrate you"
              aria-invalid={state.errors?.cons ? true : undefined}
            />
            <FieldError className="mt-1">{state.errors?.cons}</FieldError>
          </div>
        </div>
      </section>

      {/* About you */}
      <section className="card-modern flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <h2 className="font-heading text-xl font-bold tracking-tight">About you</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Context makes a review useful. Another buyer wants to know whether you are like them.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id={`${id}-name`}
            name="reviewer_name"
            label="Your name"
            autoComplete="name"
            error={state.errors?.reviewer_name}
            required
          />
          <Field
            id={`${id}-job`}
            name="reviewer_job_title"
            label="Job title"
            autoComplete="organization-title"
            placeholder="Financial Manager"
            error={state.errors?.reviewer_job_title}
            required
          />
          <Field
            id={`${id}-company`}
            name="reviewer_company"
            label="Company"
            autoComplete="organization"
            hint="Optional. Leave blank to stay anonymous."
          />
          <Field
            id={`${id}-industry`}
            name="reviewer_industry"
            label="Industry"
            placeholder="Wholesale and distribution"
            error={state.errors?.reviewer_industry}
            required
          />
          <Field
            id={`${id}-city`}
            name="reviewer_city"
            label="City"
            placeholder="Cape Town"
            hint="Optional."
          />

          <SelectField
            id={`${id}-size`}
            name="reviewer_company_size"
            label="Company size"
            options={[...COMPANY_SIZES]}
            error={state.errors?.reviewer_company_size}
          />
          <SelectField
            id={`${id}-country`}
            name="reviewer_country"
            label="Country"
            options={[...REVIEWER_COUNTRIES]}
            defaultValue={DEFAULT_REVIEWER_COUNTRY}
            error={state.errors?.reviewer_country}
          />
          <SelectField
            id={`${id}-duration`}
            name="used_for_duration"
            label="How long have you used it?"
            options={[...USAGE_DURATIONS]}
            error={state.errors?.used_for_duration}
          />
        </div>
      </section>

      <div className="flex flex-col gap-4">
        {state.status === "error" ? (
          <p role="alert" className="text-sm font-medium text-destructive">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <CtaButton size="lg" pending={pending}>
            {pending ? "Submitting" : "Submit review"}
          </CtaButton>
          <p className="text-xs leading-relaxed text-muted-foreground">
            We check every review before publishing. By submitting you confirm you have used{" "}
            {software.name} and are not connected to the vendor.
          </p>
        </div>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------- Fields */

function Field({
  id,
  name,
  label,
  error,
  hint,
  ...props
}: React.ComponentProps<typeof Input> & { label: string; error?: string; hint?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} className="mt-1.5" aria-invalid={error ? true : undefined} {...props} />
      {hint ? <FieldHint className="mt-1.5">{hint}</FieldHint> : null}
      <FieldError className="mt-1">{error}</FieldError>
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  options,
  defaultValue,
  error,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {/* A native select, because it is the most usable control on a phone. */}
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        required
        aria-invalid={error ? true : undefined}
        className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm focus-visible:border-[var(--ring)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]"
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError className="mt-1">{error}</FieldError>
    </div>
  );
}
