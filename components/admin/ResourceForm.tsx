"use client";

import Link from "next/link";
import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";
import { FieldError, FieldHint, Input, Label, Textarea } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/misc";
import { saveResource } from "@/lib/actions/admin";
import { IDLE } from "@/lib/actions/forms";
import type { Field, Resource } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";

export type ReferenceOption = { value: string; label: string };

export function ResourceForm({
  resource,
  record,
  references,
}: {
  resource: Resource;
  record?: Record<string, unknown> | null;
  /** Options for select fields that point at another table. */
  references: Record<string, ReferenceOption[]>;
}) {
  const [state, formAction, pending] = React.useActionState(saveResource, IDLE);
  const id = record?.id ? String(record.id) : "";

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <input type="hidden" name="__resource" value={resource.key} />
      {id ? <input type="hidden" name="__id" value={id} /> : null}

      {state.status === "error" ? (
        <p role="alert" className="rounded-2xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        {resource.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={record?.[field.name]}
            error={state.errors?.[field.name]}
            options={references[field.name]}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <CtaButton size="lg" pending={pending} arrow={false}>
          {pending
            ? "Saving"
            : id
              ? `Save ${resource.labelSingular.toLowerCase()}`
              : `Create ${resource.labelSingular.toLowerCase()}`}
        </CtaButton>
        <Link
          href={`/admin/${resource.key}`}
          className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function FormField({
  field,
  value,
  error,
  options,
}: {
  field: Field;
  value: unknown;
  error?: string;
  options?: ReferenceOption[];
}) {
  const id = React.useId();
  const wide = field.wide || field.type === "html" || field.type === "json";

  const selectOptions =
    options ?? field.options?.map((option) => ({ value: option, label: option })) ?? [];

  const stringValue =
    value === null || value === undefined
      ? ""
      : field.type === "json"
        ? JSON.stringify(value, null, 2)
        : field.type === "date" && typeof value === "string"
          ? value.slice(0, 10)
          : String(value);

  return (
    <div className={cn(wide && "md:col-span-2")}>
      {field.type === "checkbox" ? (
        <div className="flex h-full items-center gap-3 rounded-xl border border-border p-4">
          <Checkbox id={id} name={field.name} defaultChecked={value === true} />
          <Label htmlFor={id} className="cursor-pointer">
            {field.label}
          </Label>
        </div>
      ) : (
        <>
          <Label htmlFor={id}>
            {field.label}
            {field.required ? (
              <span className="ml-1 text-destructive" aria-hidden="true">
                *
              </span>
            ) : null}
          </Label>

          {field.type === "select" ? (
            <select
              id={id}
              name={field.name}
              defaultValue={stringValue}
              required={field.required}
              aria-invalid={error ? true : undefined}
              className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm focus-visible:border-[var(--ring)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]"
            >
              <option value="">Choose one</option>
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <Textarea
              id={id}
              name={field.name}
              defaultValue={stringValue}
              required={field.required}
              rows={4}
              className="mt-1.5"
              aria-invalid={error ? true : undefined}
            />
          ) : field.type === "html" || field.type === "json" ? (
            <Textarea
              id={id}
              name={field.name}
              defaultValue={stringValue}
              required={field.required}
              rows={field.type === "json" ? 8 : 16}
              spellCheck={field.type === "html"}
              className="mt-1.5 font-mono text-xs leading-relaxed"
              aria-invalid={error ? true : undefined}
            />
          ) : (
            <Input
              id={id}
              name={field.name}
              type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "color" ? "text" : "text"}
              step={field.type === "number" ? "any" : undefined}
              defaultValue={stringValue}
              required={field.required}
              placeholder={field.placeholder}
              className="mt-1.5"
              aria-invalid={error ? true : undefined}
            />
          )}
        </>
      )}

      {field.help ? <FieldHint className="mt-1.5">{field.help}</FieldHint> : null}
      <FieldError className="mt-1">{error}</FieldError>
    </div>
  );
}
