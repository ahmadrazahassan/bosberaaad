import { CtaButton } from "@/components/public/CtaButton";
import { cn } from "@/lib/utils";

/**
 * The editorial section header, built on the same language as the footer:
 * a small uppercase label, a large heading set in two weights, the action on
 * the right of the same row, and a hairline closing the block.
 *
 * `SectionHeader` is the older centred treatment and is still used on inner
 * pages. This one is for the home page, where sections need to read as a
 * sequence rather than as a stack of centred announcements.
 */
export function SectionIntro({
  id,
  eyebrow,
  title,
  emphasis,
  subtitle,
  cta,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  /** The closing words, set bold against the regular weight of `title`. */
  emphasis?: string;
  subtitle?: string;
  cta?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-7", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-bold tracking-widest text-muted-foreground uppercase">
            {eyebrow}
          </p>

          <h2
            id={id}
            className="mt-3.5 font-heading text-[2rem] leading-[1.04] tracking-[-0.03em] text-balance sm:text-[2.5rem]"
          >
            {title}
            {emphasis ? (
              <>
                {" "}
                <span className="font-bold">{emphasis}</span>
              </>
            ) : null}
          </h2>

          {subtitle ? (
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>

        {cta ? (
          <CtaButton href={cta.href} className="shrink-0 self-start lg:self-end">
            {cta.label}
          </CtaButton>
        ) : null}
      </div>

      <div className="border-t border-border" aria-hidden="true" />
    </div>
  );
}
