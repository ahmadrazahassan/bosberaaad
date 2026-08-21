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

/** Scrolling down past this hides the bar. */
const HIDE_AT = 120;

/**
 * The header has no bar behind it. Every control is its own floating capsule,
 * so the page shows through the gaps between them.
 *
 * That only works if each capsule carries its own surface. The reference this
 * follows sits over one still photograph, where an outline alone is enough.
 * Ours sits over copy that scrolls underneath, so each pill takes a near opaque
 * fill and a blur. The bar is transparent; the pills are not.
 */
export function Navbar({ searchIndex }: { searchIndex: SearchIndexEntry[] }) {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const lastScroll = React.useRef(0);

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // The directory, category pages and profiles all belong under Software.
  const activeHref =
    NAV_LINKS.find((link) => isActive(link.href))?.href ??
    (pathname.startsWith("/category") ? "/categories" : undefined);

  /** One capsule. Shared so the nav links, search and menu button match. */
  const capsule =
    "rounded-full border border-border bg-background/80 backdrop-blur-xl transition-colors";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 pt-3 transition-transform duration-300 ease-out sm:pt-4",
          hidden && "-translate-y-[130%]",
        )}
      >
        <div className="container-site relative flex h-14 items-center justify-between gap-3">
          {/* Logo, in a solid capsule of its own */}
          <BrandLogo
            className={cn(capsule, "h-12 shrink-0 gap-2.5 bg-background pr-5 pl-2.5")}
            showWordmark
            markClassName="size-8"
          />

          {/*
           * Centred on the bar itself rather than balanced between its
           * neighbours, because the logo and the CTA are not the same width and
           * the reference has this group dead centre.
           *
           * Only from xl though. Taken out of the flow it stops pushing its
           * neighbours, and below 1280 the centred group runs straight through
           * the search button. Between lg and xl it stays in the flow and lets
           * justify-between space it instead.
           */}
          <nav
            aria-label="Primary"
            className="hidden lg:block xl:absolute xl:left-1/2 xl:-translate-x-1/2"
          >
            <ul className="flex items-center gap-2">
              {NAV_LINKS.map((link) => {
                const active = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium backdrop-blur-xl transition-colors",
                        active
                          ? "border-transparent bg-foreground text-background"
                          : "border-border bg-background/80 text-foreground hover:border-foreground/25",
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
              className={cn(
                capsule,
                "grid size-11 place-items-center text-foreground hover:border-foreground/25",
              )}
              aria-label="Search"
            >
              <SearchIcon className="size-4" aria-hidden="true" />
            </button>

            <CtaButton
              href="/contact?subject=listing"
              variant="soft"
              plain
              icon="external"
              size="sm"
              className="hidden h-11 pl-5 text-sm md:inline-flex"
            >
              List your software
            </CtaButton>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                capsule,
                "grid size-11 place-items-center text-foreground hover:border-foreground/25 lg:hidden",
              )}
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
          <div className="container-site">
            <div
              id="mobile-menu"
              className="mt-2 rounded-[1.75rem] border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl lg:hidden"
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
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
                            "flex items-center rounded-full px-5 py-3 text-sm font-medium transition-colors",
                            active
                              ? "bg-foreground text-background"
                              : "text-foreground hover:bg-muted",
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
          </div>
        ) : null}
      </header>

      <SearchCommand index={searchIndex} open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
