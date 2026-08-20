import type { Metadata } from "next";

import { CategoryPanel } from "@/components/public/CategoryPanel";
import { Breadcrumbs } from "@/components/public/navigation";
import { SectionIntro } from "@/components/public/SectionIntro";
import { formatNumber } from "@/lib/format";
import { getCategories, getSiteStats } from "@/lib/queries/content";
import { getSoftwareByCategory } from "@/lib/queries/software";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Software categories",
  description:
    "Accounting, payroll, HR, CRM, ERP and project management software for South African businesses. Each category assessed against its own local compliance checklist.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const [categories, stats] = await Promise.all([getCategories(), getSiteStats()]);

  // The three highest rated in each category, so a panel names products rather
  // than only counting them. Ranking is Bayesian, same as everywhere else.
  const panels = await Promise.all(
    categories.map(async (category) => ({
      category,
      leaders: (await getSoftwareByCategory(category.slug)).slice(0, 3),
    })),
  );

  const figures = [
    { label: "Categories", value: formatNumber(stats.categories) },
    { label: "Products reviewed", value: formatNumber(stats.software) },
    { label: "Verified reviews", value: formatNumber(stats.reviews) },
    { label: "Prices checked", value: "Quarterly" },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Categories", href: "/categories" },
        ])}
      />

      <div className="container-site space-y-14 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />

        <SectionIntro
          eyebrow="Six categories"
          title="Start with the"
          emphasis="job to be done"
          subtitle="Each category has its own compliance checklist, because what makes good payroll software is not what makes good project management software."
          cta={{ href: "/software", label: "See every product" }}
        />

        {/* What the shelf is built on, before the shelf itself. */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-[2rem] bg-muted px-6 py-10 sm:px-10 lg:grid-cols-4 lg:gap-x-0">
          {figures.map((figure, index) => (
            <div
              key={figure.label}
              className={index > 0 ? "lg:border-l lg:border-border lg:px-8" : "lg:pr-8"}
            >
              <dt className="font-heading text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase">
                {figure.label}
              </dt>
              <dd className="mt-8 font-heading text-[2.75rem] leading-none font-bold tabular-nums tracking-[-0.04em] sm:text-[3.25rem]">
                {figure.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-4 sm:grid-cols-2">
          {panels.map(({ category, leaders }) => (
            <CategoryPanel key={category.id} category={category} leaders={leaders} />
          ))}
        </div>
      </div>
    </>
  );
}
