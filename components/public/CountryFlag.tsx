import Image from "next/image";

import { countryFlag } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * The real flag where we hold one. Renders nothing at all rather than a
 * placeholder glyph for a country we do not have, because a generic marker
 * next to a country name adds no information.
 */
const SIZES = {
  sm: { w: 16, h: 12, className: "h-3 w-4" },
  md: { w: 24, h: 16, className: "h-4 w-6" },
} as const;

export function CountryFlag({
  country,
  className,
  showLabel = false,
  size = "sm",
  decorative = false,
}: {
  country: string;
  className?: string;
  showLabel?: boolean;
  size?: keyof typeof SIZES;
  /** Set when neighbouring text already names the country, so the flag is not
   *  announced a second time. */
  decorative?: boolean;
}) {
  const scale = SIZES[size];
  const source = countryFlag(country);
  if (!source) return showLabel ? <span className={className}>{country}</span> : null;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Image
        src={source}
        alt=""
        width={scale.w}
        height={scale.h}
        className={cn("shrink-0 rounded-[2px] object-cover ring-1 ring-black/10", scale.className)}
      />
      {showLabel ? country : decorative ? null : <span className="sr-only">{country}</span>}
    </span>
  );
}
