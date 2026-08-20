"use client";

import * as React from "react";

import { CtaButton } from "@/components/public/CtaButton";
import { FieldHint, Input, Label, Textarea } from "@/components/ui/input";
import { saveSettings } from "@/lib/actions/admin";
import { IDLE } from "@/lib/actions/forms";

export type Setting = {
  key: string;
  label: string;
  help: string;
  multiline?: boolean;
  value: string;
};

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [state, formAction, pending] = React.useActionState(saveSettings, IDLE);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {settings.map((setting) => (
        <div key={setting.key}>
          <Label htmlFor={`setting-${setting.key}`}>{setting.label}</Label>
          {setting.multiline ? (
            <Textarea
              id={`setting-${setting.key}`}
              name={`setting__${setting.key}`}
              defaultValue={setting.value}
              rows={3}
              className="mt-1.5"
            />
          ) : (
            <Input
              id={`setting-${setting.key}`}
              name={`setting__${setting.key}`}
              defaultValue={setting.value}
              className="mt-1.5"
            />
          )}
          <FieldHint className="mt-1.5">{setting.help}</FieldHint>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
        <CtaButton size="lg" pending={pending}>
          {pending ? "Saving" : "Save settings"}
        </CtaButton>

        {state.status !== "idle" ? (
          <p
            role="status"
            className={
              state.status === "error"
                ? "text-sm font-medium text-destructive"
                : "text-sm font-medium text-[var(--color-brand-dark)]"
            }
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
