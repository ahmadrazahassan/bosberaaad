"use client";

import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandLogo } from "@/components/public/BrandLogo";
import { CtaButton } from "@/components/public/CtaButton";
import { SearchCommand } from "@/components/public/SearchCommand";
import type { SearchIndexEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/software", label: "Software" },
  { href: "/categories", label: "Categories" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
];

/** Scrolled past this and the capsule gains its frosted background. */
const FROST_AT = 8;
/** Scrolling down past this hides the bar. */
const HIDE_AT = 120;

export function Navbar({ searchIndex }: { searchIndex: SearchIndexEntry[] }) {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const lastScroll = React.useRef(0);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [pill, setPill] = React.useState<{ left: number; width: number } | null>(null);

  /**
   * Scroll position is external state, so it is read through
   * useSyncExternalStore rather than mirrored into React state by an effect.
   * That also means a page loaded already scrolled, from an anchor link or a
   * refresh, is frosted on the first paint rather than after the first scroll.
   */
  const scrolled = React.useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > FROST_AT,
    () => false,
  );

  /* Hide going down, reveal going up. This needs the previous position. */
  React.useEffect(() => {
    function onScroll() {
      const y = window.scrollY;

      if (y > HIDE_AT && y > lastScroll.current) {
        setHidden(true);
        setMenuOpen(false);
      } else if (y < lastScroll.current) {
        setHidden(false);
      }
      lastScroll.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * The sticky section nav on profile pages needs to know whether the header
   * is on screen so it can sit flush. A data attribute on the document element
   * is the cheapest way to share that without a context provider.
   */
  React.useEffect(() => {
    document.documentElement.dataset.headerHidden = hidden ? "true" : "false";
  }, [hidden]);

  /* Measure the active link and slide the pill to it. */
  const measurePill = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLElement>("[data-active='true']");
    if (!active) {
      setPill(null);
      return;
    }

    const listBox = list.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    setPill({ left: activeBox.left - listBox.left, width: activeBox.width });
  }, []);

  React.useEffect(() => {
    measurePill();
  }, [pathname, measurePill]);

  React.useEffect(() => {
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // The directory, category pages and profiles all belong under Software.
  const activeHref =
    NAV_LINKS.find((link) => isActive(link.href))?.href ??
    (pathname.startsWith("/category") ? "/categories" : undefined);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 pt-3 transition-transform duration-300 ease-out sm:pt-4",
          hidden && "-translate-y-[130%]",
        )}
      >
        <div className="container-site">
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-4 rounded-2xl border px-3 transition-all duration-300 sm:px-4",
              scrolled
                ? "border-border/80 bg-background/85 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <BrandLogo
              className="shrink-0"
              showWordmark
              markClassName="size-8"
            />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul ref={listRef} className="relative flex items-center gap-1">
                {pill ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -z-10 rounded-xl bg-muted transition-all duration-300 ease-out"
                    style={{ left: pill.left, width: pill.width }}
                  />
                ) : null}
                {NAV_LINKS.map((link) => {
                  const active = activeHref === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        data-active={active ? "true" : "false"}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex h-10 items-center rounded-xl px-4 text-sm font-medium transition-colors",
                          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid size-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)]"
                aria-label="Search"
              >
                <SearchIcon className="size-4" aria-hidden="true" />
              </button>

              <CtaButton href="/contact?subject=listing" size="sm" className="hidden md:inline-flex">
                List your software
              </CtaButton>


              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="grid size-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <XIcon className="size-4" aria-hidden="true" />
                ) : (
                  <MenuIcon className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div
              id="mobile-menu"
              className="mt-2 rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl lg:hidden"
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link) => {
                    const active = activeHref === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          /* Close on the navigation itself rather than by
                             watching the pathname from an effect. */
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                            active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="p-2 pt-3">
                <CtaButton
                  href="/contact?subject=listing"
                  onClick={() => setMenuOpen(false)}
                  className="w-full"
                >
                  List your software
                </CtaButton>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <SearchCommand index={searchIndex} open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
