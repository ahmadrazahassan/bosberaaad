import Link from "next/link";

import { BrandLogo } from "@/components/public/BrandLogo";
import { CountryFlag } from "@/components/public/CountryFlag";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_LOCATION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";

/**
 * Everything the site publishes, grouped the way a reader would look for it.
 * The legal pages are here in full rather than buried in a single "Legal" link,
 * because POPIA and PAIA obligations are easier to meet when the documents are
 * one click from every page.
 */
const FOOTER_NAV: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Browse",
    links: [
      { href: "/software", label: "All software" },
      { href: "/categories", label: "Categories" },
      { href: "/compare", label: "Compare products" },
      { href: "/blog", label: "Buying guides" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/editorial-policy", label: "How we rate" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/contact?subject=listing", label: "List your software" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of use" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/cookie-policy", label: "Cookie policy" },
      { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
      { href: "/paia-manual", label: "PAIA manual" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24">
      {/* ------------------------------------------------------------- CTA band */}
      <section
        aria-labelledby="footer-cta-heading"
        className="bg-[var(--color-brand)] text-[var(--color-on-brand)]"
      >
        <div className="container-site flex flex-col items-center justify-center gap-6 py-20 text-center sm:py-24 lg:flex-row lg:gap-10">
          <h2
            id="footer-cta-heading"
            className="font-heading text-4xl tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-none"
          >
            {/* Two weights on one line, the way the reference sets it. */}
            Let&rsquo;s work it <span className="font-bold">out</span>
          </h2>

          <nav aria-label="Get in touch" className="flex items-center gap-8">
            {[
              { href: "/contact", label: "Get in Touch" },
              { href: "/contact?subject=listing", label: "List Your Software" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[0.95rem] font-semibold underline decoration-[1.5px] underline-offset-[6px] transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ----------------------------------------------------------- Footer body */}
      <div className="overflow-hidden bg-muted">
        <div className="container-site pt-20 pb-0">
          <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-16">
            {/* Left: who we are and how to reach us */}
            <div className="flex max-w-xs flex-col gap-6">
              <BrandLogo markClassName="size-11" />

              <p className="text-sm leading-relaxed text-muted-foreground">
                {SITE_TAGLINE}. Clear comparisons, local compliance checks and prices in rand.
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <CountryFlag country="South Africa" />
                  Cape Town
                </h3>
                <address className="flex flex-col text-muted-foreground not-italic">
                  <span>{SITE_LOCATION}</span>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="tabular-nums transition-colors hover:text-foreground"
                  >
                    {CONTACT_PHONE}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </address>
              </div>
            </div>

            {/* Right: the three link columns */}
            <nav
              aria-label="Footer"
              className="grid gap-10 text-sm sm:grid-cols-3 sm:gap-12 lg:gap-16"
            >
              {FOOTER_NAV.map((group) => (
                <div key={group.title}>
                  <h3 className="font-heading text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
                    {group.title}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-foreground transition-colors hover:text-[var(--color-brand-dark)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <p className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
            &copy;{new Date().getFullYear()} {SITE_NAME}. {SITE_TAGLINE}.
          </p>
        </div>

        {/*
         * The wordmark, set solid and clipped by the bottom edge. The negative
         * margin is a share of the font size rather than a fixed value, so the
         * amount cropped stays constant as the type scales with the viewport.
         */}
        <p
          aria-hidden="true"
          className="container-site mt-10 -mb-[0.29em] leading-none font-heading font-bold tracking-[-0.055em] text-foreground select-none"
          style={{ fontSize: "clamp(3.5rem, 17.5vw, 15rem)" }}
        >
          {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
