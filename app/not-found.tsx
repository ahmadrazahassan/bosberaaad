import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/public/BrandLogo";
import { CtaButton } from "@/components/public/CtaButton";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { StarRating } from "@/components/public/ratings";
import { getTopRatedSoftware } from "@/lib/queries/software";
import { getCategories } from "@/lib/queries/content";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";

export const revalidate = 3600;

/**
 * A 404 that suggests somewhere to go instead of being a dead end. Most people
 * who land here mistyped a product slug, so the popular products are the most
 * useful thing to put in front of them.
 */
export default async function NotFound() {
  const [popular, categories] = await Promise.all([getTopRatedSoftware(4), getCategories()]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container-site flex flex-1 flex-col items-center justify-center gap-12 py-20">
        <BrandLogo href="/" markClassName="size-10" />

        <div className="flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground/80">
            Error 404
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            That page is not{" "}
            here
          </h1>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground">
            The address may have changed, or the product may be listed under a different name. Here
            is where most people were heading.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href="/software" size="lg">
              Browse all software
            </CtaButton>
            <Link
              href="/search"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-medium transition-colors hover:border-[var(--color-brand)]"
            >
              <SearchIcon className="size-4" aria-hidden="true" />
              Search instead
            </Link>
          </div>
        </div>

        <section aria-labelledby="popular-heading" className="w-full max-w-4xl">
          <h2
            id="popular-heading"
            className="mb-4 text-center text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase"
          >
            Most read reviews
          </h2>
          <div className="tray">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((software) => (
                <Link
                  key={software.id}
                  href={`/software/${software.slug}`}
                  className="tray-card flex items-center gap-3 p-4 transition-colors hover:border-[var(--color-brand)]"
                >
                  <SoftwareLogo
                    name={software.name}
                    slug={software.slug}
                    logoUrl={software.logo_url}
                    brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
                    size={38}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-heading text-sm font-bold tracking-tight">
                      {software.name}
                    </span>
                    <StarRating value={software.overall_rating} size="sm" className="mt-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Categories" className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)]"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
