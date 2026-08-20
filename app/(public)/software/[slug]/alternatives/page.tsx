import { ShuffleIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlternativeCard } from "@/components/public/cards";
import { RatingsCompare } from "@/components/public/compare";
import { Breadcrumbs } from "@/components/public/navigation";
import { SectionHeader } from "@/components/public/SectionHeader";
import { getSoftwareBySlug, getAlternatives, getSoftwareSlugs } from "@/lib/queries/software";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/software/[slug]/alternatives">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Not found" };

  return {
    title: `${software.name} alternatives`,
    description: `The best alternatives to ${software.name} for South African businesses, ranked, with the reason each one is on the list.`,
    alternates: { canonical: `/software/${software.slug}/alternatives` },
  };
}

export default async function AlternativesPage(
  props: PageProps<"/software/[slug]/alternatives">,
) {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  const alternatives = await getAlternatives(software, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Software", href: "/software" },
          { name: software.name, href: `/software/${software.slug}` },
          { name: "Alternatives", href: `/software/${software.slug}/alternatives` },
        ])}
      />

      <div className="container-site space-y-14 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Software", href: "/software" },
            { label: software.name, href: `/software/${software.slug}` },
            { label: "Alternatives" },
          ]}
        />

        <SectionHeader
          as="h1"
          eyebrow={alternatives.curated ? "Editorially selected" : "Category peers"}
          icon={ShuffleIcon}
          title={`Alternatives to`}
          highlight={software.name}
          subtitle={
            alternatives.curated
              ? `Each of these is here for a specific reason, and the reason is stated. They are not simply the other products in the same category.`
              : `We have not yet written a curated alternative set for ${software.name}, so these are the other products in its category ranked by weighted average.`
          }
        />

        {alternatives.items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            There are no alternatives listed for this product yet.
          </p>
        ) : (
          <>
            <div className="tray">
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {alternatives.items.map((entry, index) => (
                  <AlternativeCard
                    key={entry.software.id}
                    software={entry.software}
                    reason={entry.reason}
                    rank={index + 1}
                  />
                ))}
              </div>
            </div>

            <section aria-labelledby="head-to-head-heading" className="space-y-8">
              <SectionHeader
                id="head-to-head-heading"
                eyebrow="Side by side"
                title={`${software.name} against the`}
                highlight="top alternative"
                subtitle={`How ${software.name} compares to ${alternatives.items[0].software.name} on every rating dimension.`}
              />
              <div className="card-modern p-2 sm:p-4">
                <RatingsCompare a={software} b={alternatives.items[0].software} />
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
