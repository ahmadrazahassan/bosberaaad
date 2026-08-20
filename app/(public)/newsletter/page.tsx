import { CheckIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/public/navigation";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { SectionHeader } from "@/components/public/SectionHeader";

export const metadata: Metadata = {
  title: "The Bosberaaad newsletter",
  description:
    "One email a month covering new reviews, verified price changes and the compliance news that affects what South African businesses should be running.",
  alternates: { canonical: "/newsletter" },
};

const PROMISES = [
  "One email a month. We do not send more, ever.",
  "New reviews and re assessments of products already listed.",
  "Price changes we have verified against the vendor's own page.",
  "Compliance news that changes what you should be running.",
  "Consent recorded and stored as POPIA requires.",
  "One click unsubscribe in every single message.",
];

export default function NewsletterPage() {
  return (
    <div className="container-site space-y-12 pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Newsletter" }]} />

      <SectionHeader
        as="h1"
        eyebrow="One email a month"
        icon={MailIcon}
        title="The only software email"
        highlight="worth opening"
        subtitle="Written for South African buyers. No product announcements, no vendor press releases, no filler."
      />

      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-[2.5rem] bg-[var(--color-navy)] p-8 sm:p-12">
          <NewsletterForm variant="dark" source="newsletter-page" showInterests />
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <h2 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
          What you are agreeing to
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {PROMISES.map((promise) => (
            <li key={promise} className="flex items-start gap-3 text-sm leading-relaxed">
              <span
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
                aria-hidden="true"
              >
                <CheckIcon className="size-3" strokeWidth={3} />
              </span>
              <span className="text-muted-foreground">{promise}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          We use double opt in, so nothing is sent until you confirm from your inbox. Read the{" "}
          <Link
            href="/privacy-policy"
            className="text-[var(--color-brand-dark)] underline underline-offset-4"
          >
            privacy policy
          </Link>{" "}
          for what we store and for how long, or{" "}
          <Link
            href="/newsletter/unsubscribe"
            className="text-[var(--color-brand-dark)] underline underline-offset-4"
          >
            unsubscribe here
          </Link>{" "}
          at any time.
        </p>
      </div>
    </div>
  );
}
