import Link from "next/link";

import { CategoryIcon } from "@/components/public/CategoryIcon";
import { CtaButton } from "@/components/public/CtaButton";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { FALLBACK_BRAND_COLOR } from "@/lib/brandColors";
import { formatRating } from "@/lib/format";
import type { Category, Software } from "@/lib/types";

/**
 * A category, with the products a reader would actually recognise.
 *
 * A category name and a count tell nobody anything. Naming the three highest
 * rated products in it does, and it is the fastest way for a reader to know
 * whether this is the shelf they wanted.
 */
export function CategoryPanel({
  category,
  leaders,
}: {
  category: Category;
  leaders: Software[];
}) {
  return (
    <article className="group relative flex flex-col gap-6 rounded-[1.75rem] border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(20,22,31,.35)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <CategoryIcon
          name={category.icon}
          tone="ink"
          strokeWidth={1.5}
          className="size-9 shrink-0"
        />

        <span className="shrink-0 rounded-full bg-muted px-3 py-1.5 font-heading text-[0.6rem] font-bold tracking-widest tabular-nums text-muted-foreground uppercase">
          {category.software_count} reviewed
        </span>
      </div>

      <div>
        <h2 className="font-heading text-xl font-bold tracking-tight">
          <Link
            href={`/category/${category.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {category.name}
          </Link>
        </h2>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>

      <div className="mt-auto border-t border-border pt-5">
        {leaders.length > 0 ? (
          <>
            <p className="font-heading text-[0.6rem] font-bold tracking-widest text-muted-foreground uppercase">
              Highest rated here
            </p>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {leaders.map((software) => (
                <li key={software.id} className="flex items-center gap-2.5">
                  <SoftwareLogo
                    name={software.name}
                    slug={software.slug}
                    logoUrl={software.logo_url}
                    brandColor={software.brand_color ?? FALLBACK_BRAND_COLOR}
                    size={26}
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {software.name}
                  </span>
                  <span className="shrink-0 font-heading text-sm font-bold tabular-nums">
                    {formatRating(software.overall_rating)}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="relative z-10 mt-6">
          <CtaButton href={`/category/${category.slug}`} size="sm">
            Browse {category.name.toLowerCase()}
          </CtaButton>
        </div>
      </div>
    </article>
  );
}
