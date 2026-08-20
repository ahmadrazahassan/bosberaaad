"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import * as React from "react";

import { BrandLogo } from "@/components/public/BrandLogo";
import { CtaButton } from "@/components/public/CtaButton";
import { Input, Label } from "@/components/ui/input";
import { signIn } from "@/lib/actions/admin";
import { IDLE } from "@/lib/actions/forms";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = React.useActionState(signIn, IDLE);
  const next = searchParams.get("next") ?? "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <BrandLogo href={null} markClassName="size-10" />
        </div>

        <form action={formAction} className="card-modern mt-8 flex flex-col gap-5 p-8">
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">Administrator access only.</p>
          </div>

          <input type="hidden" name="next" value={next} />

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5"
            />
          </div>

          {state.status === "error" ? (
            <p role="alert" className="text-sm font-medium text-destructive">
              {state.message}
            </p>
          ) : null}

          <CtaButton size="lg" pending={pending} className="w-full">
            {pending ? "Signing in" : "Sign in"}
          </CtaButton>
        </form>
      </div>
    </div>
  );
}
