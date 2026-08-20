"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export type ProfileSection = { id: string; label: string };

/**
 * Section navigation for a profile page.
 *
 * A rail down the left on a wide screen: a hairline track with the active
 * section marked by a brand coloured segment and a soft wash. It stays put
 * while the page scrolls, so the reader always knows where they are without a
 * bar taking a slice off the top of every screen.
 *
 * There is no room for a rail on a narrow screen, so it collapses to a small
 * disclosure that opens the same list and closes itself once a link is taken.
 */
export function ProfileNav({ sections }: { sections: ProfileSection[] }) {
  const [active, setActive] = React.useState(sections[0]?.id ?? "");
  const disclosureRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // The section closest to the top of the viewport wins, so the marker
        // does not flicker between two sections that are both partly visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: [0, 0.2] },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  function closeDisclosure() {
    if (disclosureRef.current) disclosureRef.current.open = false;
  }

  const linkClass = (isActive: boolean) =>
    cn(
      "-ml-px flex items-center rounded-r-lg border-l-2 py-2 pl-4 text-sm transition-colors",
      isActive
        ? "border-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold text-[var(--color-brand-dark)]"
        : "border-transparent text-muted-foreground hover:border-foreground/20 hover:text-foreground",
    );

  return (
    <>
      {/* Narrow screens */}
      <details
        ref={disclosureRef}
        className="group rounded-2xl border border-border bg-card lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
          <span className="font-heading text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
            On this page
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            {sections.find((section) => section.id === active)?.label}
            <ChevronDownIcon
              className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </span>
        </summary>

        <nav aria-label="Sections of this review" className="border-t border-border p-2">
          <ul className="flex flex-col border-l border-border pl-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={closeDisclosure}
                  aria-current={active === section.id ? "true" : undefined}
                  className={linkClass(active === section.id)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>

      {/* The rail */}
      <nav
        aria-label="Sections of this review"
        className="sticky top-28 hidden self-start lg:block"
      >
        <p className="font-heading text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
          On this page
        </p>

        <ul className="mt-4 flex flex-col border-l border-border">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={linkClass(active === section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
