import { MessageSquareQuoteIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SponsoredBanner } from "@/components/public/SponsoredBanner";
import { CtaButton } from "@/components/public/CtaButton";
import { Breadcrumbs, Pagination } from "@/components/public/navigation";
import { CircularRating, SentimentBar, StarDistributionBars } from "@/components/public/ratings";
import { ReviewCard } from "@/components/public/ReviewCard";
import { ReviewFilters } from "@/components/public/ReviewFilters";
import { SectionHeader } from "@/components/public/SectionHeader";
import { formatNumber } from "@/lib/format";
import {
  getReviewArchive,
  getReviewIndustries,
  getStarDistribution,
  sentimentFromDistribution,
} from "@/lib/queries/reviews";
import { getSoftwareBySlug, getSoftwareSlugs } from "@/lib/queries/software";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import type { ReviewSort } from "@/lib/sorting";
import { BRAND_ACCENT } from "@/lib/brandColors";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/software/[slug]/reviews">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Not found" };

  return {
    title: `${software.name} reviews`,
    description: `${formatNumber(software.review_count)} verified reviews of ${software.name} from South African businesses, filterable by rating, industry and company size.`,
    alternates: { canonical: `/software/${software.slug}/reviews` },
  };
}

const SORTS: ReviewSort[] = ["recent", "helpful", "highest", "lowest"];

export default async function ReviewArchivePage(
  props: PageProps<"/software/[slug]/reviews">,
) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;

  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  const single = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const sortParam = single("sort");
  const sort: ReviewSort = SORTS.includes(sortParam as ReviewSort)
    ? (sortParam as ReviewSort)
    : "recent";

  const [archive, distribution, industries] = await Promise.all([
    getReviewArchive(software, {
      rating: Number(single("rating")) || undefined,
      companySize: single("size"),
      industry: single("industry"),
      sort,
      page: Number(single("page")) || 1,
      perPage: 10,
    }),
    getStarDistribution(software),
    getReviewIndustries(software),
  ]);

  const sentiment = sentimentFromDistribution(distribution);
  // Data visualisation wears the site brand, not the vendor colour.
  const accent = BRAND_ACCENT;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Software", href: "/software" },
          { name: software.name, href: `/software/${software.slug}` },
          { name: "Reviews", href: `/software/${software.slug}/reviews` },
        ])}
      />

      <div className="container-site space-y-12 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Software", href: "/software" },
            { label: software.name, href: `/software/${software.slug}` },
            { label: "Reviews" },
          ]}
        />

        <SectionHeader
          as="h1"
          eyebrow={`${formatNumber(software.review_count)} verified reviews`}
          icon={MessageSquareQuoteIcon}
          title={software.name}
          highlight="reviews"
          subtitle={`Every published review of ${software.name}, unedited beyond length and clarity. Vendor responses are shown alongside the review they answer.`}
        />

        <div className="flex justify-center">
          <CtaButton href={`/software/${software.slug}/reviews/new`} size="lg">
            Write a review
          </CtaButton>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-12">
          <div className="min-w-0 space-y-8">
            <ReviewFilters industries={industries} />

            <p className="border-b border-border pb-4 text-sm text-muted-foreground">
              <span className="font-heading font-bold tabular-nums text-foreground">
                {formatNumber(archive.total)}
              </span>{" "}
              {archive.total === 1 ? "review" : "reviews"} match
              {archive.total === 1 ? "es" : ""}
              {archive.totalPages > 1 ? (
                <>
                  {" "}
                  &middot; page {archive.page} of {archive.totalPages}
                </>
              ) : null}
            </p>

            {archive.items.length === 0 ? (
              <div className="card-modern p-12 text-center">
                <h2 className="font-heading text-xl font-bold tracking-tight">
                  No reviews match those filters
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clear a filter to widen the set.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {archive.items.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            <Pagination
              page={archive.page}
              totalPages={archive.totalPages}
              basePath={`/software/${software.slug}/reviews`}
              query={{
                rating: single("rating"),
                size: single("size"),
                industry: single("industry"),
                sort: sortParam,
              }}
              label="Review pagination"
            />
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card-modern flex flex-col items-center gap-5 p-6">
              <CircularRating
                value={software.overall_rating}
                accentColor={accent}
                label="Overall"
                size={124}
              />
              <p className="text-sm tabular-nums text-muted-foreground">
                from {formatNumber(software.review_count)} reviews
              </p>
              <SentimentBar
                positive={sentiment.positive}
                neutral={sentiment.neutral}
                critical={sentiment.critical}
                className="w-full"
              />
            </div>

            <div className="card-modern flex flex-col gap-4 p-6">
              <h2 className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
                Rating distribution
              </h2>
              <StarDistributionBars distribution={distribution} accentColor={accent} />
            </div>

            {software.vendor_name === "Sage Group plc" ? (
              <SponsoredBanner slot="halfPage" />
            ) : null}
          </aside>
        </div>
      </div>
    </>
  );
}
