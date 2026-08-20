"use client";

import * as React from "react";

/** The site is light only. This stays as the single place to hang any future
 *  client side provider, so callers do not have to change. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
