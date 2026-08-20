import { ScaleIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { Avatar, AvatarFallback } from "@/components/ui/misc";
import { AUTHORS } from "@/lib/data/articles";
import { formatNumber } from "@/lib/format";
import { getSiteStats } from "@/lib/queries/content";
import { breadcrumbSchema, JsonLd, organisationSchema } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_LOCATION, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Bosberaaad",
  description:
    "Who we are, how we assess business software, the compliance yardstick we hold every product to, and how we make money.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: ScaleIcon,
    title: "Independent",
    body: "No vendor pays to be listed and no vendor pays to be ranked higher. Several products we recommend most often earn us nothing at all.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Local by design",
    body: "Every product is measured against the compliance requirements that actually apply here: VAT201, EMP501, IRP5, e@syFile, UIF, ETI, BCEA leave and POPIA.",
  },
  {
    icon: UsersIcon,
    title: "Honest about weaknesses",
    body: "A review that only praises is not a review, and readers can tell. We name what does not work, including in products we rate highly.",
  },
];

export default async function AboutPage() {
  const stats = await getSiteStats();
  const team = Object.values(AUTHORS);

  return (
    <>
      <JsonLd
        data={[
          organisationSchema(),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]),
        ]}
      />

      <div className="container-site space-y-20 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <SectionHeader
          as="h1"
          eyebrow={`About ${SITE_NAME}`}
          title="The place you work out"
          highlight="what to buy"
          subtitle="An independent guide to business software for South African companies, built by people who have implemented it rather than sold it."
        />

        {/* ------------------------------------------------------- The story */}
        <section id="story" aria-labelledby="story-heading" className="scroll-mt-28">
          <div className="mx-auto max-w-3xl">
            <h2
              id="story-heading"
              className="font-heading text-3xl font-medium tracking-tight text-balance"
            >
              Why the name
            </h2>
            <div className="article-content mt-6">
              <p>
                A bosberaad is the offsite where a leadership team goes away, argues it out, and
                comes back having decided something. South African business and government both use
                the word, and it is exactly what this site is for: the place you go to work out
                which software to buy, before you commit the budget.
              </p>
              <p>
                It is pronounced boss beh raad. Non Afrikaans speakers always wonder, so we may as
                well answer it here.
              </p>
              <p>
                We started this because the existing options did not work for buyers in this
                country. International review sites list products that have no South African VAT
                handling and no local bank feeds, and rank them above products that do. Local
                resellers write comparisons that happen to conclude you should buy what they sell.
                Neither is useful when you are the person who has to explain the decision to a board.
              </p>
              <p>
                So we built the thing we wanted: {formatNumber(stats.software)} products assessed
                against the same local checklist, {formatNumber(stats.reviews)} verified reviews from
                people who actually use them, and prices quoted in rand with the VAT basis stated.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Principles */}
        <section id="principles" aria-labelledby="principles-heading" className="scroll-mt-28 space-y-10">
          <SectionHeader
            id="principles-heading"
            eyebrow="How we work"
            title="Three things we"
            highlight="will not trade"
            subtitle="These are not aspirations. They are the rules the site is built on, and you can check them against what we publish."
          />

          <div className="grid gap-2 md:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-modern flex flex-col gap-4 p-7">
                <Icon className="size-6 text-[var(--color-brand-dark)]" aria-hidden="true" />
                <h3 className="font-heading text-lg font-bold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- The method */}
        <section id="method" aria-labelledby="method-heading" className="scroll-mt-28">
          <div className="mx-auto max-w-3xl">
            <h2
              id="method-heading"
              className="font-heading text-3xl font-medium tracking-tight text-balance"
            >
              How we assess
            </h2>
            <div className="article-content mt-6">
              <p>
                Every product is rated on ease of use, value for money, customer service,
                functionality and an overall judgement. Star ratings come from verified user
                reviews and nothing else. Our editorial view shapes what we write, not the average.
              </p>
              <p>
                Ranking is a separate question. We use a Bayesian weighted average rather than a raw
                star average, because a raw average lets a product with eleven reviews at 4.8
                outrank one with four hundred at 4.4, and that is not useful to a buyer. Each
                product is blended towards the platform mean, weighted by its review volume.
              </p>
              <p>
                The full method, including how reviews are verified and how corrections are handled,
                is on the <Link href="/editorial-policy">editorial policy</Link> page.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ The compliance bar */}
        <section id="compliance" aria-labelledby="compliance-heading" className="scroll-mt-28">
          <div className="mx-auto max-w-3xl">
            <h2
              id="compliance-heading"
              className="font-heading text-3xl font-medium tracking-tight text-balance"
            >
              The compliance yardstick
            </h2>
            <div className="article-content mt-6">
              <p>
                This is what separates us from a generic directory. Every product is measured
                against the statutory requirements that apply to a South African business, and where
                a product fails one we say so plainly, including where it is otherwise excellent.
              </p>
              <ul>
                <li>
                  <strong>Accounting:</strong> VAT201 at 15% with correct standard, zero rated and
                  exempt treatment, SARS eFiling transfer, bank feeds across Absa, FNB, Standard
                  Bank, Nedbank and Capitec, and accountant access.
                </li>
                <li>
                  <strong>Payroll:</strong> EMP201, EMP501, IRP5 and IT3(a), e@syFile validation,
                  UIF, SDL, ETI on the correct sliding scale, BCEA leave and the ACB payment file.
                </li>
                <li>
                  <strong>HR:</strong> BCEA annual, sick and family responsibility leave,
                  Employment Equity reporting, skills development submissions and POPIA handling of
                  special personal information.
                </li>
                <li>
                  <strong>CRM and project management:</strong> the real rand cost including exchange
                  rate exposure and seat bands, local support hours, POPIA consent handling and
                  actual adoption.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- The people */}
        <section id="people" aria-labelledby="people-heading" className="scroll-mt-28 space-y-10">
          <SectionHeader
            id="people-heading"
            eyebrow="Who writes this"
            title="Named people who"
            highlight="stand behind it"
            subtitle="Every assessment carries an author. If you disagree with one, you know who to write to."
          />

          <div className="grid gap-2 sm:grid-cols-2">
            {team.map((person) => {
              const initials = person.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();

              return (
                <div key={person.name} className="card-modern flex items-start gap-4 p-6">
                  <Avatar className="size-12">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-heading text-base font-bold tracking-tight">
                      {person.name}
                    </h3>
                    <p className="text-sm text-[var(--color-brand-dark)]">{person.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {person.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --------------------------------------------------------- Contact */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="mx-auto max-w-2xl scroll-mt-28 rounded-3xl bg-muted p-8 text-center sm:p-10"
        >
          <h2 id="contact-heading" className="font-heading text-2xl font-bold tracking-tight">
            Think we have something wrong?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tell us. We correct errors openly rather than quietly, with a dated note explaining what
            changed. Write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[var(--color-brand-dark)] underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or use the <Link href="/contact" className="text-[var(--color-brand-dark)] underline underline-offset-4">contact form</Link>.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{SITE_LOCATION}</p>
        </section>
      </div>
    </>
  );
}
