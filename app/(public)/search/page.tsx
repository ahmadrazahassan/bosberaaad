import { SearchIcon } from "lucide-react";
import type { Metadata } from "next";

import { ArticleRow, SoftwareListRow } from "@/components/public/cards";
import { Breadcrumbs } from "@/components/public/navigation";
import { SearchBar } from "@/components/public/SearchBar";
import { SectionHeader } from "@/components/public/SectionHeader";
import { formatDate, formatNumber, formatReadTime } from "@/lib/format";
import { getCategories } from "@/lib/queries/content";
import { siteSearch } from "@/lib/queries/search";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
  description: "Search software reviews, comparisons and buying guides on Bosberaaad.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default async function SearchPage(props: PageProps<"/search">) {
  const searchParams = await props.searchParams;
  const raw = searchParams.q;
  const query = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  const [results, categories] = await Promise.all([siteSearch(query), getCategories()]);

  return (
    <div className="container-site space-y-12 pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <SectionHeader
        as="h1"
        eyebrow="Search"
        icon={SearchIcon}
        title={query ? "Results for" : "What are you"}
        highlight={query ? `"${query}"` : "looking for?"}
        subtitle={
          query
            ? `${formatNumber(results.total)} ${results.total === 1 ? "result" : "results"} across software reviews and guides.`
            : "Search by product name, vendor, category, or a compliance term such as VAT201 or EMP501."
        }
      />

      <div className="mx-auto w-full max-w-2xl">
        <SearchBar defaultValue={query} />
      </div>

      {!query ? (
        <div className="mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      ) : results.total === 0 ? (
        <div className="card-modern mx-auto max-w-2xl p-12 text-center">
          <h2 className="font-heading text-xl font-bold tracking-tight">
            Nothing matched that search
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Try a vendor name such as Sage or Xero, a category such as payroll, or a compliance
            term such as EMP501.
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {results.software.length > 0 ? (
            <section aria-labelledby="software-results">
              <h2
                id="software-results"
                className="mb-5 text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase"
              >
                Software ({results.software.length})
              </h2>
              <div className="flex flex-col gap-2">
                {results.software.map((software) => (
                  <SoftwareListRow key={software.id} software={software} />
                ))}
              </div>
            </section>
          ) : null}

          {results.articles.length > 0 ? (
            <section aria-labelledby="article-results" className="mx-auto w-full max-w-4xl">
              <h2
                id="article-results"
                className="mb-1 text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase"
              >
                Guides ({results.articles.length})
              </h2>
              {results.articles.map((article, index) => (
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
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
