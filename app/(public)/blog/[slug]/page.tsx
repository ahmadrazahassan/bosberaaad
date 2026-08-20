import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleRow } from "@/components/public/cards";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { Breadcrumbs } from "@/components/public/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatReadTime } from "@/lib/format";
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from "@/lib/queries/content";
import { getSoftwareById } from "@/lib/queries/software";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not found" };

  const description = article.meta_description ?? truncate(article.excerpt, 155);

  return {
    title: article.meta_title ?? article.title,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `/blog/${article.slug}`,
      publishedTime: article.published_date,
      authors: [article.author_name],
    },
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, relatedSoftware] = await Promise.all([
    getRelatedArticles(article, 3),
    article.related_software_id ? getSoftwareById(article.related_software_id) : null,
  ]);

  const initials = article.author_name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <JsonLd
        data={[
          articleSchema(article),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Guides", href: "/blog" },
            { name: article.title, href: `/blog/${article.slug}` },
          ]),
        ]}
      />

      <div className="container-site space-y-14 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/blog" },
            { label: article.category_tag, href: `/blog?tag=${encodeURIComponent(article.category_tag)}` },
            { label: truncate(article.title, 40) },
          ]}
        />

        <article className="mx-auto w-full max-w-3xl">
          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="muted">{article.category_tag}</Badge>
              <time dateTime={article.published_date}>
                {formatDate(article.published_date, "long")}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{formatReadTime(article.read_time_minutes)}</span>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl sm:leading-[1.12]">
              {article.title}
            </h1>

            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3 border-y border-border py-5">
              <Avatar className="size-11">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author_name}</p>
                <p className="text-sm text-muted-foreground">{article.author_title}</p>
              </div>
            </div>
          </header>

          <div
            className="article-content mt-10"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {relatedSoftware ? (
            <aside className="card-modern mt-12 flex flex-col gap-3 p-6">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                Product mentioned
              </p>
              <h2 className="font-heading text-lg font-bold tracking-tight">
                <Link
                  href={`/software/${relatedSoftware.slug}`}
                  className="hover:text-[var(--color-brand-dark)]"
                >
                  Read our full {relatedSoftware.name} review
                </Link>
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {relatedSoftware.description_short}
              </p>
            </aside>
          ) : null}

          <footer className="mt-12 rounded-3xl bg-muted p-6 sm:p-8">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              About the author
            </p>
            <div className="mt-4 flex items-start gap-4">
              <Avatar className="size-12">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {article.author_name}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {article.author_title}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {article.author_bio}
                </p>
              </div>
            </div>
          </footer>
        </article>

        <section aria-labelledby="newsletter-heading" className="mx-auto w-full max-w-3xl">
          <div className="rounded-3xl bg-[var(--color-navy)] p-8 sm:p-10">
            <h2
              id="newsletter-heading"
              className="font-heading text-2xl font-medium tracking-tight text-balance text-white"
            >
              Get the next guide{" "}
              by email
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              One email a month. Consent recorded as POPIA requires, one click unsubscribe.
            </p>
            <NewsletterForm variant="dark" source="article" className="mt-6" />
          </div>
        </section>

        {related.length > 0 ? (
          <section aria-labelledby="related-heading" className="mx-auto w-full max-w-4xl">
            <h2
              id="related-heading"
              className="font-heading text-2xl font-bold tracking-tight"
            >
              Read next
            </h2>
            <div className="mt-4">
              {related.map((item, index) => (
                <ArticleRow
                  key={item.id}
                  index={index + 1}
                  title={item.title}
                  href={`/blog/${item.slug}`}
                  excerpt={item.excerpt}
                  tag={item.category_tag}
                  date={formatDate(item.published_date, "short")}
                  readTime={formatReadTime(item.read_time_minutes)}
                  author={item.author_name}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
