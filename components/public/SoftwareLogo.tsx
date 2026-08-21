import Image from "next/image";

import { productLogo } from "@/lib/assets";
import { inkOn, withAlpha } from "@/lib/brandColors";
import { cn } from "@/lib/utils";

/**
 * The vendor's real logo wherever we hold one. Where we do not, a monogram
 * tile in the product's accent colour, which is deliberate rather than a
 * failure: it always renders, it is theme aware, and it never ships a broken
 * image or a mark we invented for a company that did not choose it.
 */
export function SoftwareLogo({
  name,
  slug,
  logoUrl,
  brandColor,
  size = 56,
  className,
  ring = false,
  bare = false,
}: {
  name: string;
  slug: string;
  logoUrl?: string | null;
  brandColor: string;
  size?: number;
  className?: string;
  /** Draws a tinted ring in the product's colour, used on profile headers. */
  ring?: boolean;
  /**
   * No tile, no hairline, no crop: the mark alone at the given size. For dark
   * panels, where our own hairline reads as a box drawn around the logo.
   */
  bare?: boolean;
}) {
  const source = productLogo(slug, logoUrl);

  const initials = name
    .replace(/[^A-Za-z0-9 .]/g, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  // Bare drops the tile only where there is a real mark to drop it around.
  // The monogram still needs its rounded plate to read as anything.
  const radius = bare && source ? 0 : Math.round(size * 0.24);

  return (
    <div
      /*
       * Decorative. The logo always sits beside the product name, so labelling
       * it would make a screen reader announce the name twice.
       */
      aria-hidden="true"
      className={cn("relative grid shrink-0 place-items-center overflow-hidden", className)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        // Real logos arrive with their own background, so the tile stays clear.
        backgroundColor: source ? "transparent" : brandColor,
        boxShadow: bare && source
          ? undefined
          : ring
          ? `0 0 0 1px ${withAlpha(brandColor, 0.2)}, 0 0 0 6px ${withAlpha(brandColor, 0.08)}`
          : source
            ? "inset 0 0 0 1px rgba(20,22,31,0.08)"
            : `0 0 0 1px ${withAlpha(brandColor, 0.22)}`,
      }}
    >
      {source ? (
        <Image
          src={source}
          alt=""
          width={size * 2}
          height={size * 2}
          className={cn("size-full", bare ? "object-contain" : "object-cover")}
          sizes={`${size}px`}
        />
      ) : (
        <span
          className="font-heading font-bold tracking-tight select-none"
          style={{ color: inkOn(brandColor), fontSize: Math.round(size * 0.38) }}
        >
          {initials || slug.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
