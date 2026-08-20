import { ScaleIcon, TrendingUpIcon } from "lucide-react";
import type { Metadata } from "next";

import { ComparisonCard } from "@/components/public/cards";
import { CompareSelector } from "@/components/public/CompareSelector";
import { Breadcrumbs } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { getComparisons } from "@/lib/queries/content";
import { getAllSoftware } from "@/lib/queries/software";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";
import { stripHtml, truncate } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Compare business software side by side",
  description:
    "Build a head to head comparison of any two products, or read one of our written comparisons with a verdict that names a winner.",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage() {
  const [software, comparisons] = await Promise.all([getAllSoftware(), getComparisons()]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
        ])}
      />

      <div className="container-site space-y-16 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />

        <SectionHeader
          as="h1"
          eyebrow="Head to head"
          icon={ScaleIcon}
          title="Put two products"
          highlight="next to each other"
          subtitle="Ratings, features, compliance coverage and pricing on one page. Any two products, in either order."
        />

        <CompareSelector
          options={software.map((item) => ({
            slug: item.slug,
            name: item.name,
            category: item.category?.name ?? "Other",
          }))}
        />

        <section aria-labelledby="written-heading" className="space-y-10">
          <SectionHeader
            id="written-heading"
            eyebrow="Written comparisons"
            icon={TrendingUpIcon}
            title="The match ups we get"
            highlight="asked about most"
            subtitle="Each of these carries a written verdict. We name a winner rather than listing differences and leaving you to decide."
          />

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comparison) => (
              <ComparisonCard
                key={comparison.id}
                a={comparison.software_a}
                b={comparison.software_b}
                summary={
                  comparison.custom_verdict
                    ? truncate(stripHtml(comparison.custom_verdict), 170)
                    : null
                }
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
