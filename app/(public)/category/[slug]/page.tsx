import { BookOpenIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SoftwareListRow } from "@/components/public/cards";
import { CategoryIcon } from "@/components/public/CategoryIcon";
import { Breadcrumbs } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { formatNumber } from "@/lib/format";
import { getCategories, getCategoryBySlug } from "@/lib/queries/content";
import { getSoftwareByCategory } from "@/lib/queries/software";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: PageProps<"/category/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };

  return {
    title: `Best ${category.name.toLowerCase()} in South Africa`,
    description: truncate(category.description, 155),
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const software = await getSoftwareByCategory(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Categories", href: "/categories" },
          { name: category.name, href: `/category/${category.slug}` },
        ])}
      />

      <div className="container-site space-y-14 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category.name },
          ]}
        />

        <div className="flex flex-col items-center gap-6">
          <CategoryIcon name={category.icon} tone="ink" strokeWidth={1.5} className="size-10" />

          <SectionHeader
            as="h1"
            eyebrow={`${category.software_count} products reviewed`}
            title="The best"
            highlight={category.name.toLowerCase()}
            titleAfter="in South Africa"
            subtitle={category.description}
          />
        </div>

        <section aria-labelledby="products-heading" className="space-y-6">
          <h2 id="products-heading" className="sr-only">
            {category.name} ranked
          </h2>
          <p className="border-b border-border pb-4 text-sm text-muted-foreground">
            Ranked by weighted average, so a product with{" "}
            <span className="font-heading font-bold tabular-nums text-foreground">
              {formatNumber(software[0]?.review_count ?? 0)}
            </span>{" "}
            reviews is not outranked by one with eleven.
          </p>

          <div className="flex flex-col gap-2">
            {software.map((item, index) => (
              <SoftwareListRow key={item.id} software={item} rank={index + 1} />
            ))}
          </div>
        </section>

        {category.intro ? (
          <section aria-labelledby="guide-heading" className="space-y-10">
            <SectionHeader
              id="guide-heading"
              eyebrow="Buying guide"
              icon={BookOpenIcon}
              title="What South African buyers"
              highlight="should look for"
              subtitle={`How we assess ${category.name.toLowerCase()}, and what actually separates the products above.`}
            />
            <div
              className="article-content mx-auto max-w-3xl"
              dangerouslySetInnerHTML={{ __html: category.intro }}
            />
          </section>
        ) : null}
      </div>
    </>
  );
}
