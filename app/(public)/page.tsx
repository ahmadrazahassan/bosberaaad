import { BookOpenIcon, LayersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AffiliateDisclosureNote } from "@/components/public/affiliate";
import { ArticleRow } from "@/components/public/cards";
import { CategoryIcon } from "@/components/public/CategoryIcon";
import { CountryFlag } from "@/components/public/CountryFlag";
import { CtaButton } from "@/components/public/CtaButton";
import { HomepageExplore } from "@/components/public/HomepageExplore";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { SearchBar } from "@/components/public/SearchBar";
import { FreshCheckCard, RankedCard, VersusCard } from "@/components/public/home-rows";
import { SectionHeader } from "@/components/public/SectionHeader";
import { SectionIntro } from "@/components/public/SectionIntro";
import { formatDate, formatNumber, formatReadTime } from "@/lib/format";
import { getStarDistribution } from "@/lib/queries/reviews";
import {
  getCategories,
  getComparisons,
  getLatestArticles,
  getSiteStats,
} from "@/lib/queries/content";
import {
  getAllSoftware,
  getRecentlyReviewedSoftware,
  getSoftwareByCategory,
  getTopRatedSoftware,
} from "@/lib/queries/software";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { PRODUCT_LOGOS, SITE_IMAGES } from "@/lib/assets";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";
import { HERO_BLUR } from "@/lib/hero-blur";
import { JsonLd, organisationSchema, websiteSchema } from "@/lib/seo";
import { stripHtml, truncate } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const [categories, stats, topRated, recentlyReviewed, comparisons, articles] = await Promise.all([
    getCategories(),
    getSiteStats(),
    getTopRatedSoftware(3),
    getRecentlyReviewedSoftware(3),
    getComparisons(),
    getLatestArticles(3),
  ]);

  // Real star distributions, so the sentiment strip on each card is data.
  const distributions = await Promise.all(topRated.map((software) => getStarDistribution(software)));

  const exploreGroups = await Promise.all(
    categories.map(async (category) => ({
      category,
      software: (await getSoftwareByCategory(category.slug)).slice(0, 6),
    })),
  );

  const popularCategories = categories.slice(0, 4);

  /*
   * The logo strip under the headline. These are products we review, not
   * partners, so the label reads "Reviewed here" rather than implying an
   * endorsement none of them has given.
   *
   * Limited to products we hold a real logo for, then deduplicated by vendor:
   * ordering on review volume alone returns four Sage products, which reads as
   * a Sage advert rather than as the breadth of the catalogue.
   */
  const seenVendors = new Set<string>();
  const covered = (await getAllSoftware())
    .filter((item) => PRODUCT_LOGOS[item.slug])
    .sort((a, b) => b.review_count - a.review_count)
    .filter((item) => {
      const vendor = item.vendor_name ?? item.name;
      if (seenVendors.has(vendor)) return false;
      seenVendors.add(vendor);
      return true;
    })
    .slice(0, 5);

  return (
    <>
      <JsonLd data={[organisationSchema(), websiteSchema()]} />

      <div className="container-site space-y-16 pb-20 sm:space-y-24">
        {/* ------------------------------------------------------------ Hero */}
        <section aria-labelledby="hero-heading" className="space-y-12 sm:space-y-16">
          {/*
           * The banner carries no text. Nothing is set over it, so it needs no
           * darkening wash and the photograph is seen as a photograph.
           */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] sm:aspect-[16/7] sm:rounded-[2rem]">
            <Image
              src={SITE_IMAGES.hero}
              alt=""
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              placeholder="blur"
              blurDataURL={HERO_BLUR}
              className="object-cover"
            />
          </div>

          {/* Headline left, what we cover right, sharing one baseline. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              {/*
               * The line break is authored rather than left to the browser, so
               * the headline always breaks on the comma. `text-balance` is off
               * for the same reason: it would fight the break.
               */}
              {/* The flag states the scope before the headline has to. */}
              <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border py-1.5 pr-4 pl-2 text-xs font-medium">
                <CountryFlag country="South Africa" size="md" decorative />
                South African business software
              </p>

              <h1
                id="hero-heading"
                className="font-heading text-[2.5rem] leading-[1] font-bold tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3.5rem]"
              >
                Find the right software,
                <br />
                priced in rand.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                Independent reviews and side by side comparisons of accounting, payroll, HR, CRM,
                ERP and project management software, checked against SARS, POPIA and the BCEA.
              </p>
            </div>

            <div className="lg:pb-2">
              <p className="text-sm text-muted-foreground">
                Reviewed here
                <span className="sr-only">
                  . These are products we assess independently, not partners or endorsements.
                </span>
              </p>
              <ul className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-5">
                {covered.map((software) => (
                  <li key={software.id}>
                    <Link
                      href={`/software/${software.slug}`}
                      className="flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
                    >
                      <SoftwareLogo
                        name={software.name}
                        slug={software.slug}
                        logoUrl={software.logo_url}
                        brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
                        size={30}
                      />
                      <span className="font-heading text-[0.95rem] font-semibold tracking-tight">
                        {software.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Search, then the categories most people arrive looking for. */}
          <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4">
            <SearchBar />

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5">
              <span className="text-xs text-muted-foreground">Popular</span>
              {popularCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-colors hover:text-[var(--color-brand-ink)] hover:shadow-[inset_0_0_0_1px_var(--color-brand-deep)] hover:[background:var(--color-brand-deep)]"
                >
                  <CategoryIcon name={category.icon} className="size-3" />
                  {category.name.replace(" Software", "")}
                </Link>
              ))}
            </div>
          </div>

          {/* Three figures, on rules rather than in a floating card. */}
          <dl className="grid divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Stat value={formatNumber(stats.reviews)} label="Verified reviews" />
            <Stat value={formatNumber(stats.software)} label="Products reviewed" />
            <Stat value={formatNumber(stats.categories)} label="Categories covered" />
          </dl>
        </section>

        {/* ------------------------------------------------- Category explorer */}
        <section aria-labelledby="explore-heading" className="reveal-on-scroll space-y-10">
          <SectionHeader
            id="explore-heading"
            eyebrow="Browse by category"
            icon={LayersIcon}
            title="Start with the"
            highlight="job to be done"
            subtitle="Six categories, each assessed against the compliance requirements that actually apply in this country."
          />
          <HomepageExplore groups={exploreGroups} />
        </section>

        {/* ------------------------------------------------ Comparisons strip */}
        <section aria-labelledby="compare-heading" className="reveal-on-scroll">
          <SectionIntro
            id="compare-heading"
            eyebrow="Head to head"
            title="The comparisons buyers"
            emphasis="actually run"
            subtitle="Two products, one page, and a verdict that names a winner instead of sitting on the fence."
            cta={{ href: "/compare", label: "Build a comparison" }}
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {comparisons.slice(0, 4).map((comparison) => (
              <VersusCard
                key={comparison.id}
                a={comparison.software_a}
                b={comparison.software_b}
                summary={
                  comparison.custom_verdict
                    ? truncate(stripHtml(comparison.custom_verdict), 150)
                    : null
                }
              />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- Top rated */}
        <section aria-labelledby="top-rated-heading" className="reveal-on-scroll">
          <SectionIntro
            id="top-rated-heading"
            eyebrow="Ranked by weighted average"
            title="The highest rated,"
            emphasis="honestly ranked"
            subtitle="We use a Bayesian weighted average, so four hundred reviews at 4.4 outranks eleven reviews at 4.8. A raw star average is not useful to a buyer."
            cta={{ href: "/software?sort=highest-rated", label: "See the full ranking" }}
          />

          <div className="tray mt-8">
            <div className="grid gap-2 md:grid-cols-3">
              {topRated.map((software, index) => (
                <RankedCard
                  key={software.id}
                  software={software}
                  distribution={distributions[index]}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>

          <AffiliateDisclosureNote className="mt-6 justify-center" />
        </section>

        {/* --------------------------------------------------------- Newsletter */}
        <section aria-labelledby="newsletter-heading" className="reveal-on-scroll">
          <div className="grid gap-10 rounded-[2.5rem] bg-[var(--color-navy)] px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                id="newsletter-heading"
                className="font-heading text-3xl font-medium tracking-tight text-balance text-white sm:text-[2.6rem] sm:leading-[1.18]"
              >
                One email a month,{" "}
                worth opening
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-white/65">
                New reviews, price changes we have verified, and the compliance news that affects
                what you should be running.
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                {[
                  "One email a month. We do not send more, ever.",
                  "Consent recorded and stored as POPIA requires.",
                  "One click unsubscribe in every message.",
                ].map((promise) => (
                  <li key={promise} className="flex items-start gap-3 text-sm text-white/75">
                    <span
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M2.5 6.2 4.8 8.5 9.5 3.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>
            </div>

            <NewsletterForm variant="dark" source="home" showInterests />
          </div>
        </section>

        {/* --------------------------------------------------- Recently reviewed */}
        <section aria-labelledby="recent-heading" className="reveal-on-scroll">
          <SectionIntro
            id="recent-heading"
            eyebrow="Freshly checked"
            title="Recently reviewed and"
            emphasis="re verified"
            subtitle="We re check every product's pricing quarterly and update the assessment when something material changes."
            cta={{ href: "/software?sort=recently-updated", label: "Everything we track" }}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {recentlyReviewed.map((software) => (
              <FreshCheckCard key={software.id} software={software} />
            ))}
          </div>

          <AffiliateDisclosureNote className="mt-6 justify-center" />
        </section>

        {/* -------------------------------------------------------- Blog preview */}
        <section aria-labelledby="guides-heading" className="reveal-on-scroll space-y-10">
          <SectionHeader
            id="guides-heading"
            eyebrow="Buying guides"
            icon={BookOpenIcon}
            title="Read before you"
            highlight="commit the budget"
            subtitle="Written by people who have implemented this software, not by people who sell it."
          />

          <div className="mx-auto max-w-4xl">
            {articles.map((article, index) => (
              <ArticleRow
                key={article.id}
                index={index + 1}
                title={article.title}
                href={`/blog/${article.slug}`}
                excerpt={article.excerpt}
                tag={article.category_tag}
                date={formatDate(article.published_date, "short")}
                readTime={formatReadTime(article.read_time_minutes)}
                author={article.author_name}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <CtaButton href="/blog">Read all guides</CtaButton>
          </div>
        </section>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-7 sm:px-8 sm:first:pl-0">
      <dd className="font-heading text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
        {value}
      </dd>
      <dt className="mt-1 text-sm text-muted-foreground">{label}</dt>
    </div>
  );
}
