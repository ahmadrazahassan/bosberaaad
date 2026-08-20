import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/public/ContactForm";
import { Breadcrumbs } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { Skeleton } from "@/components/ui/misc";
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_LOCATION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Corrections, listing enquiries, advertising and anything else. We read every message and reply within two working days.",
  alternates: { canonical: "/contact" },
};

const REASONS = [
  {
    title: "A correction",
    body: "If something here is wrong, tell us what and where. Corrections that turn out to be justified are made with a dated note explaining what changed.",
  },
  {
    title: "Listing your software",
    body: "Tell us about the product and the South African install base. Nobody pays to be listed, and we add products South African businesses actually shortlist.",
  },
  {
    title: "A vendor response",
    body: "You may respond publicly to any review of your product. We publish the response alongside the review. We do not remove negative reviews on request.",
  },
  {
    title: "Advertising",
    body: "We sell labelled display advertising. Advertisers have no influence on editorial content and are not told in advance what we are publishing.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-site space-y-12 pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <SectionHeader
        as="h1"
        eyebrow="Get in touch"
        icon={MailIcon}
        title="We read"
        highlight="every message"
        subtitle="Corrections, listing enquiries, vendor responses and advertising. We reply within two working days."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
        <Suspense fallback={<Skeleton className="h-[38rem] w-full rounded-3xl" />}>
          <ContactForm />
        </Suspense>

        <aside className="flex flex-col gap-6">
          <div className="card-modern flex flex-col gap-4 p-6">
            <h2 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
              Direct
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MailIcon
                  className="mt-0.5 size-4 shrink-0 text-[var(--color-brand-dark)]"
                  aria-hidden="true"
                />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon
                  className="mt-0.5 size-4 shrink-0 text-[var(--color-brand-dark)]"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="tabular-nums hover:underline"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon
                  className="mt-0.5 size-4 shrink-0 text-[var(--color-brand-dark)]"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{SITE_LOCATION}</span>
              </li>
            </ul>
          </div>

          <div className="card-modern flex flex-col gap-5 p-6">
            <h2 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
              What people write about
            </h2>
            <dl className="flex flex-col gap-4">
              {REASONS.map((reason) => (
                <div key={reason.title}>
                  <dt className="text-sm font-medium">{reason.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {reason.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
