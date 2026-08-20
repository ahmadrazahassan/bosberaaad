import { PenLineIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/public/navigation";
import { ReviewForm } from "@/components/public/ReviewForm";
import { SectionHeader } from "@/components/public/SectionHeader";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { getSoftwareBySlug, getSoftwareSlugs } from "@/lib/queries/software";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/software/[slug]/reviews/new">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Not found" };

  return {
    title: `Write a review of ${software.name}`,
    description: `Share your experience of ${software.name} with other South African businesses. Reviews are checked before publication.`,
    alternates: { canonical: `/software/${software.slug}/reviews/new` },
    robots: { index: false, follow: true },
  };
}

export default async function NewReviewPage(
  props: PageProps<"/software/[slug]/reviews/new">,
) {
  const { slug } = await props.params;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  return (
    <div className="container-site space-y-12 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Software", href: "/software" },
          { label: software.name, href: `/software/${software.slug}` },
          { label: "Write a review" },
        ]}
      />

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <SoftwareLogo
          name={software.name}
          slug={software.slug}
          logoUrl={software.logo_url}
          brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
          size={68}
          ring
        />
        <SectionHeader
          as="h1"
          eyebrow="Help another buyer decide"
          icon={PenLineIcon}
          title="Review"
          highlight={software.name}
          subtitle="Write the review you wish you had read before you bought. Specific, honest, and including what does not work."
          className="max-w-2xl"
        />
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <ReviewForm software={software} />
      </div>
    </div>
  );
}
