"use client";

import * as React from "react";

import {
  AD_SLOTS,
  SAGE_CREATIVES,
  adClickUrl,
  adCreativeUrl,
  adImpressionUrl,
  adPosterUrl,
  type AdSlot,
} from "@/lib/ads";
import { cn } from "@/lib/utils";

/** Below this the narrow creative is used. Matches the sm breakpoint. */
const NARROW_AT = "(max-width: 639px)";

/** Half the unit on screen for a second is the usual bar for a viewable impression. */
const VIEWABLE_RATIO = 0.5;
const VIEWABLE_MS = 1000;

function useIsNarrow() {
  return React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(NARROW_AT);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(NARROW_AT).matches,
    // The server cannot know the viewport. Assuming wide and correcting on
    // mount is safer than the reverse: the wide unit reserves more height, so
    // the correction shrinks the box rather than pushing content down.
    () => false,
  );
}

/**
 * One sponsored display unit.
 *
 * Three things this does that pasting Impact's supplied HTML would not:
 *
 *  - The impression pixel fires once, and only after the unit has actually
 *    been half on screen for a second. Impact's snippet fires it on parse,
 *    which counts an impression for a unit at the bottom of a page nobody
 *    scrolled down.
 *  - The video never preloads. Each of these files is about five megabytes,
 *    and Impact's markup would have the browser fetch it before the reader has
 *    shown any interest.
 *  - No `javascript:` href. Impact's video creative opens the click through
 *    from an inline handler, which does not survive a Content Security Policy
 *    and is not how a link should be written in any case.
 *
 * The box is reserved from the creative's own aspect ratio, so nothing on the
 * page moves when the image arrives.
 */
export function SponsoredBanner({
  slot,
  className,
  label = "Sponsored",
}: {
  slot: AdSlot;
  className?: string;
  /** Shown above the unit. Never hide it: this is a paid placement. */
  label?: string;
}) {
  const isNarrow = useIsNarrow();
  const creative = SAGE_CREATIVES[isNarrow ? AD_SLOTS[slot].narrow : AD_SLOTS[slot].wide];

  const holderRef = React.useRef<HTMLDivElement>(null);
  const [seen, setSeen] = React.useState<string | null>(null);

  /* Fire the impression once the unit has genuinely been on screen. */
  React.useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;

    // Nothing to count twice: an impression is one impression.
    let fired = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Without IntersectionObserver there is no way to tell whether the unit
    // was seen. Counting it is the right way to be wrong: under reporting
    // delivery to the advertiser is worse than counting a unit that was
    // rendered and probably scrolled past.
    if (typeof IntersectionObserver === "undefined") {
      const fallback = setTimeout(() => setSeen(creative.id), VIEWABLE_MS);
      return () => clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const viewable = entry.isIntersecting && entry.intersectionRatio >= VIEWABLE_RATIO;

        if (viewable) {
          // Guard the timer: the callback fires again at each threshold, and
          // starting a second countdown on the way from half to fully visible
          // would leave an orphaned timer behind.
          if (fired || timer) return;
          timer = setTimeout(() => {
            fired = true;
            timer = undefined;
            setSeen(creative.id);
            observer.disconnect();
          }, VIEWABLE_MS);
          return;
        }

        // Scrolled away before the second was up. It was never viewable.
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
      },
      { threshold: [0, VIEWABLE_RATIO, 1] },
    );

    observer.observe(holder);
    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [creative.id]);

  const href = adClickUrl(creative.id);

  return (
    <aside
      className={cn("flex flex-col items-center gap-2.5", className)}
      aria-label="Sponsored content"
    >
      <p className="font-heading text-[0.6rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>

      <div
        ref={holderRef}
        className="w-full overflow-hidden rounded-2xl"
        style={{
          maxWidth: creative.width,
          // Reserving the ratio rather than a fixed height keeps the unit
          // responsive without letting it shift the page as it loads.
          aspectRatio: `${creative.width} / ${creative.height}`,
        }}
      >
        {creative.kind === "video" ? (
          <VideoUnit creative={creative} href={href} />
        ) : (
          <a
            href={href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block size-full"
          >
            {/*
             * A plain img on purpose. next/image would cache and re optimise
             * the creative on our own domain, which breaks the advertiser's
             * ability to rotate it and serves a stale advert.
             */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={adCreativeUrl(creative.id)}
              alt={creative.alt}
              width={creative.width}
              height={creative.height}
              loading="lazy"
              decoding="async"
              className="size-full object-contain"
            />
          </a>
        )}
      </div>

      {/* The counting pixel, mounted only once the unit has been seen. */}
      {seen ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={adImpressionUrl(seen)}
          alt=""
          width={1}
          height={1}
          aria-hidden="true"
          className="pointer-events-none absolute size-px opacity-0"
        />
      ) : null}
    </aside>
  );
}

/**
 * Poster first, then the file. Controls appear on the first play so the reader
 * can pause or scrub, and the click through sits underneath as a real link
 * rather than being bound to the video surface, so playing is not the same
 * gesture as leaving for the advertiser.
 */
function VideoUnit({
  creative,
  href,
}: {
  creative: (typeof SAGE_CREATIVES)[keyof typeof SAGE_CREATIVES];
  href: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  function start() {
    const video = videoRef.current;
    if (!video || playing) return;
    setPlaying(true);
    video.controls = true;
    void video.play();
  }

  return (
    <div className="relative size-full">
      <video
        ref={videoRef}
        poster={adPosterUrl(creative.id)}
        width={creative.width}
        height={creative.height}
        // Five megabytes. Nothing is fetched until the reader asks for it.
        preload="none"
        playsInline
        onClick={start}
        className="size-full cursor-pointer object-cover"
      >
        <source src={adCreativeUrl(creative.id)} type="video/mp4" />
      </video>

      {!playing ? (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 grid place-items-center bg-black/15 transition-colors hover:bg-black/25"
          aria-label={`Play: ${creative.alt}`}
        >
          <span
            className="grid size-14 place-items-center rounded-full bg-white/90 shadow-lg backdrop-blur"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 size-6 fill-[#14161f]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      ) : null}

      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3 text-center text-sm font-semibold text-white"
      >
        Visit Sage
      </a>
    </div>
  );
}
