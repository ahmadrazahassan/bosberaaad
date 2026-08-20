"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Only rendered where a product has real screenshots. Showing stock imagery in
 * place of a product's own interface would be a lie by omission.
 */
export function ScreenshotCarousel({
  screenshots,
  productName,
}: {
  screenshots: string[];
  productName: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  /*
   * Initial values are derived rather than read back from the carousel in an
   * effect: the first slide is always selected, there is never a previous
   * slide, and there is a next one whenever more than one screenshot exists.
   * State is then only ever written from the subscription callback.
   */
  const [selected, setSelected] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(screenshots.length > 1);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (screenshots.length === 0) return null;

  return (
    <div className="tray">
      <div className="tray-card overflow-hidden p-2">
        <div className="overflow-hidden rounded-[1.15rem]" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {screenshots.map((src, index) => (
              <div key={src} className="min-w-0 shrink-0 grow-0 basis-full pr-2 last:pr-0">
                <div className="relative aspect-16/10 overflow-hidden rounded-[1.15rem] bg-muted">
                  <Image
                    src={src}
                    alt={`${productName} screenshot ${index + 1} of ${screenshots.length}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 900px, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-2 pt-3 pb-1">
          <div className="flex gap-1.5" role="tablist" aria-label="Screenshots">
            {screenshots.map((src, index) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={index === selected}
                aria-label={`Screenshot ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === selected
                    ? "w-6 bg-[var(--color-brand)]"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <CarouselButton
              label="Previous screenshot"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
            </CarouselButton>
            <CarouselButton
              label="Next screenshot"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </CarouselButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-deep)] hover:text-[var(--color-brand-ink)] disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
