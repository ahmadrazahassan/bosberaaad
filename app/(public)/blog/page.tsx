import { BookOpenIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ArticleRow } from "@/components/public/cards";
import { Breadcrumbs, Pagination } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatReadTime } from "@/lib/format";
import { getArticles, getArticleTags, getFeaturedArticle } from "@/lib/queries/content";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Buying guides and compliance explainers",
  description:
    "Buying guides, compliance explainers and practical advice on choosing business software in South Africa. Written by people who have implemented it.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage(props: PageProps<"/blog">) {
  const searchParams = await props.searchParams;
  const single = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const tag = single("tag");
  const page = Number(single("page")) || 1;

  const [result, tags, featured] = await Promise.all([
    getArticles({ page, perPage: 9, tag }),
    getArticleTags(),
    getFeaturedArticle(),
  ]);

  const showFeatured = page === 1 && !tag && featured;
  const listed = showFeatured
    ? result.items.filter((article) => article.id !== featured.id)
    : result.items;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Guides", href: "/blog" },
        ])}
      />

      <div className="container-site space-y-12 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

        <SectionHeader
          as="h1"
          eyebrow="Buying guides"
          icon={BookOpenIcon}
          title="Read before you"
          highlight="commit the budget"
          subtitle="Buying guides, compliance explainers and the practical detail that decides whether a purchase works out."
        />

        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/blog"
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              !tag
                ? "border-transparent bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
                : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
            )}
          >
            All guides
          </Link>
          {tags.map((item) => (
            <Link
              key={item}
              href={`/blog?tag=${encodeURIComponent(item)}`}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                tag === item
                  ? "border-transparent bg-[var(--color-brand-deep)] text-[var(--color-brand-ink)]"
                  : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {item}
            </Link>
          ))}
        </div>

        {showFeatured ? (
          <article className="card-modern card-modern-hover group relative flex flex-col gap-6 p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge>Latest</Badge>
              <Badge variant="muted">{featured.category_tag}</Badge>
              <span>{formatDate(featured.published_date, "long")}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{formatReadTime(featured.read_time_minutes)}</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              <Link
                href={`/blog/${featured.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {featured.title}
              </Link>
            </h2>

            <p className="max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground">
              {featured.excerpt}
            </p>

            <p className="text-sm text-muted-foreground">
              {featured.author_name}, {featured.author_title}
            </p>
          </article>
        ) : null}

        <div className="mx-auto w-full max-w-4xl">
          {listed.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No guides in this category yet.
            </p>
          ) : (
            listed.map((article, index) => (
              <ArticleRow
                key={article.id}
                index={(result.page - 1) * result.perPage + index + 1}
                title={article.title}
                href={`/blog/${article.slug}`}
                excerpt={article.excerpt}
                tag={article.category_tag}
                date={formatDate(article.published_date, "short")}
                readTime={formatReadTime(article.read_time_minutes)}
                author={article.author_name}
              />
            ))
          )}
        </div>

        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          basePath="/blog"
          query={{ tag }}
        />
      </div>
    </>
  );
}
