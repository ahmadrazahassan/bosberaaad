import Image from "next/image";
import Link from "next/link";

import { SITE_IMAGES } from "@/lib/assets";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The supplied geometric mark, cleaned for use across light and dark UI. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={SITE_IMAGES.logo}
      alt=""
      width={1280}
      height={1280}
      priority
      className={cn("size-8 object-contain", className)}
      sizes="48px"
    />
  );
}

export function BrandLogo({
  className,
  markClassName,
  showWordmark = true,
  href = "/",
}: {
  className?: string;
  markClassName?: string;
  /** The navbar hides the wordmark below the sm breakpoint. */
  showWordmark?: boolean;
  href?: string | null;
}) {
  const content = (
    <>
      <LogoMark className={markClassName} />
      {showWordmark ? (
        <span
          className="font-heading text-xl font-medium tracking-[-0.03em] text-foreground"
          aria-hidden="true"
        >
          Bos<span className="font-semibold text-[var(--color-brand-dark)]">beraaad</span>
        </span>
      ) : null}
    </>
  );

  const classes = cn("inline-flex items-center gap-2.5", className);

  if (!href) {
    return (
      <span className={classes}>
        {content}
        <span className="sr-only">{SITE_NAME}</span>
      </span>
    );
  }

  return (
    <Link href={href} className={cn(classes, "rounded-xl")} aria-label={`${SITE_NAME} home`}>
      {content}
    </Link>
  );
}
