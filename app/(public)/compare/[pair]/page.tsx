import { ScaleIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AffiliateDisclosureNote } from "@/components/public/affiliate";
import {
  CompareHeader,
  CompareStickyBar,
  ComplianceCompare,
} from "@/components/public/compare";
import {
  CompareGlance,
  CompareMatrix,
  PricingPanels,
  type CompareCell,
} from "@/components/public/compare-matrix";
import { Breadcrumbs } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { SectionIntro } from "@/components/public/SectionIntro";
import { formatNumber, formatRating, startingPriceLabel } from "@/lib/format";
import { getComparisonByPair, getComparisonPairs } from "@/lib/queries/content";
import { RATING_DIMENSIONS } from "@/lib/site";
import { breadcrumbSchema, comparisonSchema, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pairs = await getComparisonPairs();
  return pairs.map((pair) => ({ pair }));
}

export async function generateMetadata(props: PageProps<"/compare/[pair]">): Promise<Metadata> {
  const { pair } = await props.params;
  const result = await getComparisonByPair(pair);
  if (!result) return { title: "Not found" };

  const { comparison, canonicalPair } = result;
  const a = comparison.software_a;
  const b = comparison.software_b;

  return {
    title: `${a.name} vs ${b.name}`,
    description:
      comparison.meta_description ??
      `${a.name} rated ${formatRating(a.overall_rating)} against ${b.name} at ${formatRating(b.overall_rating)}. Ratings, features, compliance and pricing compared for South African buyers.`,
    // Both orderings resolve, and both point at one canonical URL, so a long
    // tail query is never lost and the ranking signal is never split.
    alternates: { canonical: `/compare/${canonicalPair}` },
  };
}

export default async function ComparePairPage(props: PageProps<"/compare/[pair]">) {
  const { pair } = await props.params;
  const result = await getComparisonByPair(pair);
  if (!result) notFound();

  const { comparison, canonicalPair } = result;
  const a = comparison.software_a;
  const b = comparison.software_b;

  const higher = a.overall_rating >= b.overall_rating ? a : b;
  const lower = higher.id === a.id ? b : a;


  const rating = (value: number): CompareCell => ({ kind: "rating", value });
  const text = (value: string, note?: string): CompareCell => ({ kind: "text", value, note });
  const bool = (value: boolean, label?: string): CompareCell => ({ kind: "bool", value, label });

  const priceA = startingPriceLabel(a.starting_price, a.price_currency, a.billing_period);
  const priceB = startingPriceLabel(b.starting_price, b.price_currency, b.billing_period);

  // Every row the matrix draws. Kept here rather than in the component so the
  // component stays a renderer and the editorial choice of what to compare
  // lives with the page.
  const overviewGroups = [
    {
      title: "What reviewers say",
      rows: [
        { label: "Overall rating", a: rating(a.overall_rating), b: rating(b.overall_rating) },
        ...RATING_DIMENSIONS.map((dimension) => ({
          label: dimension.label,
          a: rating(a[dimension.key]),
          b: rating(b[dimension.key]),
        })),
        {
          label: "Verified reviews",
          a: text(formatNumber(a.review_count)),
          b: text(formatNumber(b.review_count)),
        },
      ],
    },
    {
      title: "What it costs",
      rows: [
        {
          label: "Starting price",
          a: text(priceA.amount, priceA.note),
          b: text(priceB.amount, priceB.note),
        },
        {
          label: "VAT basis",
          a: text(a.price_vat_inclusive ? "Incl VAT" : "Excl VAT"),
          b: text(b.price_vat_inclusive ? "Incl VAT" : "Excl VAT"),
        },
        { label: "Free trial", a: bool(a.free_trial), b: bool(b.free_trial) },
        { label: "Free plan", a: bool(a.free_version), b: bool(b.free_version) },
        {
          label: "Published plans",
          a: text(String(a.pricing_plans.length)),
          b: text(String(b.pricing_plans.length)),
        },
      ],
    },
    {
      title: "Vendor and support",
      rows: [
        { label: "Vendor", a: text(a.vendor_name ?? "Not stated"), b: text(b.vendor_name ?? "Not stated") },
        {
          label: "Founded",
          a: text(a.founded_year ? String(a.founded_year) : "Not stated"),
          b: text(b.founded_year ? String(b.founded_year) : "Not stated"),
        },
        {
          label: "Support channels",
          a: text(a.support_types.length ? a.support_types.join(", ") : "Not stated"),
          b: text(b.support_types.length ? b.support_types.join(", ") : "Not stated"),
        },
        {
          label: "Integrations listed",
          a: text(formatNumber(a.integrations.length)),
          b: text(formatNumber(b.integrations.length)),
        },
        {
          label: "Local bank feeds",
          a: text(formatNumber(a.bank_feeds.length)),
          b: text(formatNumber(b.bank_feeds.length)),
        },
      ],
    },
  ];

  const allFeatures = Array.from(new Set([...a.features, ...b.features])).sort((x, y) =>
    x.localeCompare(y),
  );

  const featureGroups = [
    {
      title: `${allFeatures.length} features across both products`,
      rows: allFeatures.map((feature) => ({
        label: feature,
        a: bool(a.features.includes(feature), a.features.includes(feature) ? "Included" : "Not included"),
        b: bool(b.features.includes(feature), b.features.includes(feature) ? "Included" : "Not included"),
      })),
    },
  ];


  return (
    <>
      <JsonLd
        data={[
          comparisonSchema(a, b, canonicalPair),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Compare", href: "/compare" },
            { name: `${a.name} vs ${b.name}`, href: `/compare/${canonicalPair}` },
          ]),
        ]}
      />

      <div className="container-site space-y-16 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare" },
            { label: `${a.name} vs ${b.name}` },
          ]}
        />

        <SectionHeader
          as="h1"
          eyebrow="Head to head"
          icon={ScaleIcon}
          title={a.name}
          highlight="vs"
          titleAfter={b.name}
          subtitle={`Both products assessed against the same checklist, with ratings drawn from ${(a.review_count + b.review_count).toLocaleString("en-ZA")} verified reviews.`}
        />

        <CompareHeader a={a} b={b} />

        <CompareGlance a={a} b={b} />

        {/* -------------------------------------------------- The whole picture */}
        <section aria-labelledby="matrix-heading">
          <SectionIntro
            id="matrix-heading"
            eyebrow="Side by side"
            title="How they"
            emphasis="compare"
            subtitle="Ratings computed from published reviews, and the specifications that change what a product costs to run. The washed column is the higher rated of the two."
          />
          <div className="mt-8">
            <CompareMatrix
              a={a}
              b={b}
              caption={`${a.name} compared with ${b.name}`}
              groups={overviewGroups}
            />
          </div>
        </section>

        {/* --------------------------------------------------------- Compliance */}
        <section aria-labelledby="compliance-heading">
          <SectionIntro
            id="compliance-heading"
            eyebrow="The local yardstick"
            title="South African"
            emphasis="compliance"
            subtitle="Amber marks a gap rather than a feature. This is usually where the decision is actually made."
          />
          <div className="mt-8">
            <ComplianceCompare a={a} b={b} />
          </div>
        </section>

        {/* ------------------------------------------------------------ Pricing */}
        <section aria-labelledby="pricing-compare-heading">
          <SectionIntro
            id="pricing-compare-heading"
            eyebrow="What they cost"
            title="Pricing,"
            emphasis="compared properly"
            subtitle="Check the VAT basis on each. Vendors are not consistent, and the difference is 15%."
          />
          <div className="mt-8">
            <PricingPanels a={a} b={b} />
          </div>
        </section>

        {/* ----------------------------------------------------- Feature matrix */}
        <section aria-labelledby="features-compare-heading">
          <SectionIntro
            id="features-compare-heading"
            eyebrow="Capability"
            title="The full"
            emphasis="feature matrix"
            subtitle="Every feature either product offers, and whether the other one has it."
          />
          <div className="mt-8">
            <CompareMatrix
              a={a}
              b={b}
              caption={`Feature comparison between ${a.name} and ${b.name}`}
              groups={featureGroups}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- The verdict */}
        <section aria-labelledby="verdict-heading">
          <SectionIntro
            id="verdict-heading"
            eyebrow="Our verdict"
            title="Which one you"
            emphasis="should buy"
            subtitle="We name a winner. Listing differences and leaving the decision to the reader is not a verdict."
          />

          <div className="mt-8 rounded-[2rem] border border-border bg-card p-8 sm:p-10">
            {comparison.custom_verdict ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: comparison.custom_verdict }}
              />
            ) : (
              <div className="prose-content">
                <p>
                  We have not written a full verdict for this pairing yet, so here is the position
                  from the data.
                </p>
                <p>
                  <strong>{higher.name}</strong> holds the higher rating at{" "}
                  {formatRating(higher.overall_rating)} against{" "}
                  {formatRating(lower.overall_rating)}, from{" "}
                  {higher.review_count.toLocaleString("en-ZA")} reviews against{" "}
                  {lower.review_count.toLocaleString("en-ZA")}. Reviewers rate it{" "}
                  {formatRating(higher.ease_of_use_rating)} for ease of use and{" "}
                  {formatRating(higher.value_for_money_rating)} for value for money, against{" "}
                  {formatRating(lower.ease_of_use_rating)} and{" "}
                  {formatRating(lower.value_for_money_rating)}.
                </p>
                <p>
                  Read the compliance comparison below before deciding on the rating alone. A
                  product that scores well overall can still be missing the one statutory output
                  your business cannot do without.
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-2xl">
          <AffiliateDisclosureNote />
        </div>
      </div>

      <CompareStickyBar a={a} b={b} />
    </>
  );
}
