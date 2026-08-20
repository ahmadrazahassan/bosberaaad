import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/public/navigation";
import { formatDate } from "@/lib/format";
import { getPageBySlug } from "@/lib/queries/content";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

/**
 * One renderer for all seven legal and trust pages. Content is editable from
 * the admin panel through the `pages` table, so a policy update does not need
 * a deployment.
 */
export async function legalMetadata(slug: string): Promise<Metadata> {
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Not found" };

  return {
    title: page.meta_title ?? page.title,
    description: page.meta_description ?? undefined,
    alternates: { canonical: `/${page.slug}` },
  };
}

export async function LegalPage({ slug }: { slug: string }) {
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: page.title, href: `/${page.slug}` },
        ])}
      />

      <div className="container-site pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />

        <article className="mx-auto mt-10 w-full max-w-3xl">
          <header className="border-b border-border pb-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl sm:leading-[1.12]">
              {page.title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated{" "}
              <time dateTime={page.updated_at}>{formatDate(page.updated_at, "long")}</time>
            </p>
          </header>

          <div
            className="legal-content mt-10"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </div>
    </>
  );
}
