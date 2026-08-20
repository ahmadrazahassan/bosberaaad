import { LayersIcon } from "lucide-react";
import type { Metadata } from "next";

import { SoftwareListRow } from "@/components/public/cards";
import { DirectorySortControl, FilterSidebar } from "@/components/public/FilterSidebar";
import { Breadcrumbs, Pagination } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { formatNumber } from "@/lib/format";
import { getCategories } from "@/lib/queries/content";
import { getDirectory, type DirectorySort } from "@/lib/queries/software";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All business software reviewed",
  description:
    "Every accounting, payroll, HR, CRM, ERP and project management product we have reviewed for the South African market. Filter by category, rating, free trial and business size.",
  alternates: { canonical: "/software" },
};

const SORTS: DirectorySort[] = [
  "most-reviewed",
  "highest-rated",
  "recently-updated",
  "price-low",
];

export default async function DirectoryPage(props: PageProps<"/software">) {
  const searchParams = await props.searchParams;

  const single = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const sortParam = single("sort");
  const sort: DirectorySort = SORTS.includes(sortParam as DirectorySort)
    ? (sortParam as DirectorySort)
    : "most-reviewed";

  const query = {
    category: single("category"),
    rating: single("rating"),
    size: single("size"),
    trial: single("trial"),
    free: single("free"),
    paid: single("paid"),
    sort: sortParam,
  };

  const [categories, result] = await Promise.all([
    getCategories(),
    getDirectory({
      category: single("category"),
      minRating: Number(single("rating")) || 0,
      freeTrial: single("trial") === "1",
      freeVersion: single("free") === "1",
      paidOnly: single("paid") === "1",
      bestForSize: single("size"),
      sort,
      page: Number(single("page")) || 1,
      perPage: 10,
    }),
  ]);

  const activeCategory = categories.find((category) => category.slug === single("category"));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Software", href: "/software" },
        ])}
      />

      <div className="container-site space-y-12 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Software" }]} />

        <SectionHeader
          as="h1"
          eyebrow={`${SITE_NAME} directory`}
          icon={LayersIcon}
          title={activeCategory ? activeCategory.name : "Every product we have"}
          highlight={activeCategory ? "reviewed" : "reviewed"}
          subtitle={
            activeCategory
              ? activeCategory.description
              : "Filter by category, rating and pricing model. Every product is assessed against the same local compliance checklist for its category."
          }
        />

        <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <FilterSidebar categories={categories} />

          <div className="min-w-0 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-heading font-bold tabular-nums text-foreground">
                  {formatNumber(result.total)}
                </span>{" "}
                {result.total === 1 ? "product" : "products"}
                {result.totalPages > 1 ? (
                  <>
                    {" "}
                    &middot; page {result.page} of {result.totalPages}
                  </>
                ) : null}
              </p>
              <DirectorySortControl current={sort} />
            </div>

            {result.items.length === 0 ? (
              <div className="card-modern flex flex-col items-center gap-3 p-12 text-center">
                <h2 className="font-heading text-xl font-bold tracking-tight">
                  Nothing matches those filters
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Try widening the rating, or clearing the pricing filters. Every filter is
                  independent, so the combination can easily exclude everything.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {result.items.map((software, index) => (
                  <SoftwareListRow
                    key={software.id}
                    software={software}
                    rank={(result.page - 1) * result.perPage + index + 1}
                  />
                ))}
              </div>
            )}

            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              basePath="/software"
              query={query}
              className="pt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
