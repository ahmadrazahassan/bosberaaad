import {
  BarChart3Icon,
  BookmarkIcon,
  CameraIcon,
  CircleHelpIcon,
  CoinsIcon,
  LayoutListIcon,
  MessageSquareQuoteIcon,
  ScaleIcon,
  ShuffleIcon,
  SquareStackIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliateDisclosureNote, SponsoredAd } from "@/components/public/affiliate";
import { AlternativeCard } from "@/components/public/cards";
import { CompanySizeChart, SoftwareRatingsChart } from "@/components/public/charts";
import { RatingsCompare } from "@/components/public/compare";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { ComplianceList, FeatureChecklist, IntegrationList, TopFeatures } from "@/components/public/features";
import { CtaButton } from "@/components/public/CtaButton";
import { Breadcrumbs } from "@/components/public/navigation";
import { PriceNote, PricingCards, PricingTable, VendorSpecSheet } from "@/components/public/pricing";
import { ProfileNav, type ProfileSection } from "@/components/public/ProfileNav";
import { CircularRating, SentimentBar, StarDistributionBars, StarRating } from "@/components/public/ratings";
import { ReviewCard } from "@/components/public/ReviewCard";
import { ScreenshotCarousel } from "@/components/public/ScreenshotCarousel";
import { SectionHeader } from "@/components/public/SectionHeader";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { Badge } from "@/components/ui/badge";
import { buildFaqs } from "@/lib/faq";
import { formatNumber, formatRating } from "@/lib/format";
import {
  getCompanySizeBreakdown,
  getReviewHighlights,
  getReviews,
  getStarDistribution,
  sentimentFromDistribution,
} from "@/lib/queries/reviews";
import { getAlternatives, getSoftwareBySlug, getSoftwareSlugs } from "@/lib/queries/software";
import {
  breadcrumbSchema,
  faqSchema,
  JsonLd,
  productSchema,
} from "@/lib/seo";
import { RATING_DIMENSIONS } from "@/lib/site";
import { truncate } from "@/lib/utils";
import { BRAND_ACCENT, FALLBACK_BRAND_COLOR } from "@/lib/brandColors";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/software/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Not found" };

  const title = software.meta_title ?? `${software.name} review`;
  const description =
    software.meta_description ?? truncate(software.description_short, 155);

  return {
    title,
    description,
    alternates: { canonical: `/software/${software.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/software/${software.slug}`,
      images: [{ url: `/api/og?slug=${software.slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?slug=${software.slug}`],
    },
  };
}

const SECTIONS: ProfileSection[] = [
  { id: "overview", label: "Overview" },
  { id: "pricing", label: "Pricing" },
  { id: "features", label: "Features" },
  { id: "ratings", label: "Ratings" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Reviews" },
  { id: "alternatives", label: "Alternatives" },
  { id: "faqs", label: "FAQs" },
];

export default async function SoftwareProfilePage(props: PageProps<"/software/[slug]">) {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  const [distribution, highlights, allReviews, companySizes, alternatives] = await Promise.all([
    getStarDistribution(software),
    getReviewHighlights(software, 3),
    getReviews(software),
    getCompanySizeBreakdown(software),
    getAlternatives(software, 3),
  ]);

  /*
   * The vendor's own colour dresses the logo ring only, where it sits beside
   * their real logo and reads as their identity. Everything else, the dial,
   * the bars and the charts, is our interface and wears our brand, so a page
   * about a green vendor does not become a green page.
   */
  const vendorAccent = software.brand_color ?? FALLBACK_BRAND_COLOR;
  const accent = BRAND_ACCENT;
  const sentiment = sentimentFromDistribution(distribution);
  const faqs = buildFaqs(software, distribution);
  const topAlternative = alternatives.items[0]?.software ?? null;

  const sections = SECTIONS.filter((section) => {
    if (section.id === "compare") return Boolean(topAlternative);
    if (section.id === "alternatives") return alternatives.items.length > 0;
    return true;
  });
  if (software.screenshots.length > 0) {
    sections.splice(3, 0, { id: "screenshots", label: "Screenshots" });
  }

  const ratingDimensions = RATING_DIMENSIONS.map((dimension) => ({
    dimension: dimension.label,
    value: software[dimension.key],
  }));

  return (
    <>
      <JsonLd
        data={[
          productSchema(software, highlights),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Software", href: "/software" },
            ...(software.category
              ? [{ name: software.category.name, href: `/category/${software.category.slug}` }]
              : []),
            { name: software.name, href: `/software/${software.slug}` },
          ]),
        ]}
      />

      <div className="container-site space-y-16 pb-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Software", href: "/software" },
            ...(software.category
              ? [{ label: software.category.name, href: `/category/${software.category.slug}` }]
              : []),
            { label: software.name },
          ]}
        />

        {/* ---------------------------------------------------------- Header */}
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <SoftwareLogo
            name={software.name}
            slug={software.slug}
            logoUrl={software.logo_url}
            brandColor={vendorAccent}
            size={84}
            ring
          />

          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl sm:leading-[1.12]">
                {software.name}
              </h1>
              {software.featured ? <Badge variant="success">Featured</Badge> : null}
            </div>
            {software.tagline ? (
              <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                {software.tagline}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-heading text-3xl font-extrabold tabular-nums tracking-tight">
              {formatRating(software.overall_rating)}
            </span>
            <StarRating value={software.overall_rating} size="lg" />
            <Link
              href={`/software/${software.slug}/reviews`}
              className="text-sm tabular-nums text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {formatNumber(software.review_count)} verified reviews
            </Link>
          </div>

          <CtaButton href={`/software/${software.slug}/reviews/new`} size="lg">
            Write a review
          </CtaButton>
        </header>

        <div className="grid gap-8 lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:items-start lg:gap-14">
          <ProfileNav sections={sections} />

          <div className="min-w-0 space-y-20">
            {/* -------------------------------------------------------- Overview */}
            <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-32 space-y-10">
              <SectionHeader
                id="overview-heading"
                eyebrow="The assessment"
                icon={BookmarkIcon}
                title="What"
                highlight={software.name}
                titleAfter="is, honestly"
                subtitle={software.description_short}
              />

              <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
                <div
                  className="prose-content min-w-0"
                  // Editorial copy authored by us, not user submitted.
                  dangerouslySetInnerHTML={{ __html: software.description_full }}
                />

                <div className="flex flex-col gap-6 lg:sticky lg:top-40 lg:self-start">
                  <VendorSpecSheet software={software} />
                  <ComplianceList software={software} />
                </div>
              </div>
            </section>

            {/* --------------------------------------------------------- Pricing */}
            <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-32 space-y-10">
              <SectionHeader
                id="pricing-heading"
                eyebrow="What it costs"
                icon={CoinsIcon}
                title="Plans,"
                highlight="priced in rand"
                subtitle={
                  software.price_vat_inclusive
                    ? "Figures below include 15% VAT."
                    : "Figures below exclude VAT. Add 15% for the amount that lands on your invoice."
                }
              />

              <PricingCards software={software} />
              <PriceNote software={software} />

              {software.pricing_plans.length > 1 ? (
                <div className="card-modern p-2 sm:p-4">
                  <PricingTable software={software} />
                </div>
              ) : null}
            </section>

            {/* -------------------------------------------------------- Features */}
            <section id="features" aria-labelledby="features-heading" className="scroll-mt-32 space-y-10">
              <SectionHeader
                id="features-heading"
                eyebrow="Capability"
                icon={LayoutListIcon}
                title="What it does"
                highlight="better than most"
                subtitle="The four things our reviewers consistently name, then the full capability list."
              />

              <TopFeatures software={software} />

              <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
                <div>
                  <h3 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                    Full feature list
                  </h3>
                  <FeatureChecklist items={software.features} columns={2} className="mt-5" />
                </div>

                <div>
                  <h3 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                    Integrates with
                  </h3>
                  <IntegrationList software={software} />
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------- Screenshots */}
            {software.screenshots.length > 0 ? (
              <section
                id="screenshots"
                aria-labelledby="screenshots-heading"
                className="scroll-mt-32 space-y-10"
              >
                <SectionHeader
                  id="screenshots-heading"
                  eyebrow="The interface"
                  icon={CameraIcon}
                  title="What it actually"
                  highlight="looks like"
                  subtitle="Screenshots of the live product, not marketing renders."
                />
                <ScreenshotCarousel screenshots={software.screenshots} productName={software.name} />
              </section>
            ) : null}

            {/* --------------------------------------------------------- Ratings */}
            <section id="ratings" aria-labelledby="ratings-heading" className="scroll-mt-32 space-y-10">
              <SectionHeader
                id="ratings-heading"
                eyebrow="What reviewers say"
                icon={BarChart3Icon}
                title="The numbers,"
                highlight="not the marketing"
                subtitle={`Every figure below is computed from ${formatNumber(software.review_count)} published reviews. Nothing here is written by hand.`}
              />

              <div className="tray">
                <div className="grid gap-2 lg:grid-cols-3">
                  <div className="tray-card flex flex-col items-center justify-center gap-5 p-8">
                    <CircularRating
                      value={software.overall_rating}
                      accentColor={accent}
                      label="Overall"
                      size={148}
                    />
                    <div className="w-full">
                      <SentimentBar
                        positive={sentiment.positive}
                        neutral={sentiment.neutral}
                        critical={sentiment.critical}
                      />
                    </div>
                  </div>

                  <div className="tray-card flex flex-col gap-5 p-8">
                    <h3 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                      Rating distribution
                    </h3>
                    <StarDistributionBars distribution={distribution} accentColor={accent} />
                  </div>

                  <div className="tray-card flex flex-col gap-5 p-8">
                    <h3 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                      Rated by dimension
                    </h3>
                    <SoftwareRatingsChart data={ratingDimensions} accentColor={accent} />
                  </div>
                </div>
              </div>

              <div className="tray">
                <div className="tray-card p-8">
                  <h3 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                    Who is reviewing it
                  </h3>
                  <CompanySizeChart data={companySizes} accentColor={accent} className="mt-5" />
                </div>
              </div>
            </section>

            {/* --------------------------------------------------------- Compare */}
            {topAlternative ? (
              <section id="compare" aria-labelledby="compare-heading" className="scroll-mt-32 space-y-10">
                <SectionHeader
                  id="compare-heading"
                  eyebrow="Head to head"
                  icon={ScaleIcon}
                  title={`${software.name} against its`}
                  highlight="closest rival"
                  subtitle={`How ${software.name} and ${topAlternative.name} compare on every rating dimension.`}
                />

                <div className="card-modern p-2 sm:p-4">
                  <RatingsCompare a={software} b={topAlternative} />
                </div>

                <div className="flex justify-center">
                  <CtaButton href={`/compare/${software.slug}-vs-${topAlternative.slug}`}>
                    See the full comparison
                  </CtaButton>
                </div>
              </section>
            ) : null}

            {/* --------------------------------------------------------- Reviews */}
            <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-32 space-y-10">
              <SectionHeader
                id="reviews-heading"
                eyebrow="Verified reviews"
                icon={MessageSquareQuoteIcon}
                title="From people who"
                highlight="actually use it"
                subtitle="We lead with the most helpful reviews and always include a critical one. A page of five star reviews tells you nothing."
              />

              <div className="flex flex-col gap-2">
                {highlights.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              <div className="flex justify-center">
                <CtaButton href={`/software/${software.slug}/reviews`}>
                  Read all {formatNumber(software.review_count)} reviews
                </CtaButton>
              </div>
            </section>

            {/* ------------------------------------------------------- Sponsored */}
            <SponsoredAd format="billboard" />

            {/* ---------------------------------------------------- Alternatives */}
            {alternatives.items.length > 0 ? (
              <section
                id="alternatives"
                aria-labelledby="alternatives-heading"
                className="scroll-mt-32 space-y-10"
              >
                <SectionHeader
                  id="alternatives-heading"
                  eyebrow={alternatives.curated ? "Editorially selected" : "Category peers"}
                  icon={ShuffleIcon}
                  title="What to look at"
                  highlight="instead"
                  subtitle={
                    alternatives.curated
                      ? `Chosen because of what they do differently to ${software.name}, with the reason stated.`
                      : `Products in the same category. We have not yet written a curated alternative set for ${software.name}.`
                  }
                />

                <div className="tray">
                  <div className="grid gap-2 md:grid-cols-3">
                    {alternatives.items.map((entry, index) => (
                      <AlternativeCard
                        key={entry.software.id}
                        software={entry.software}
                        reason={entry.reason}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link
                    href={`/software/${software.slug}/alternatives`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)]"
                  >
                    All {software.name} alternatives
                  </Link>
                </div>
              </section>
            ) : null}

            {/* ------------------------------------------------------------ FAQs */}
            <section id="faqs" aria-labelledby="faqs-heading" className="scroll-mt-32 space-y-10">
              <SectionHeader
                id="faqs-heading"
                eyebrow="Common questions"
                icon={CircleHelpIcon}
                title="What buyers"
                highlight="always ask"
                subtitle="Answered from this product's own record, so these can never drift from the data above."
              />
              <FaqAccordion faqs={faqs} />
            </section>

            {/* ------------------------------------------------------ Disclosure */}
            <div className="mx-auto max-w-2xl">
              <AffiliateDisclosureNote />
            </div>

            {/* Total review count is used above; keep the query result meaningful. */}
            <p className="sr-only">
              This assessment draws on {formatNumber(allReviews.length)} published reviews of{" "}
              {software.name}.
            </p>

            <div className="flex justify-center">
              <Link
                href="/software"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                <SquareStackIcon className="size-4" aria-hidden="true" />
                Back to the full directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
