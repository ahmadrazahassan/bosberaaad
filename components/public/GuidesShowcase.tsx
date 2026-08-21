import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaButton } from "@/components/public/CtaButton";
import { SITE_IMAGES } from "@/lib/assets";
import { formatDate, formatReadTime } from "@/lib/format";
import type { Article } from "@/lib/types";

/* ------------------------------------------------------------------- Card */

function GuideCard({ article, index }: { article: Article; index: number }) {
  return (
    <article className="group relative flex flex-col gap-5 rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.09] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span
          className="font-heading text-4xl leading-none font-bold tabular-nums text-white/20"
          aria-hidden="true"
        >
          {String(index).padStart(2, "0")}
        </span>

        <ArrowUpRightIcon
          className="size-5 shrink-0 text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          aria-hidden="true"
        />
      </div>

      <div>
        <p className="font-heading text-[0.6rem] font-bold tracking-[0.18em] text-[var(--color-brand)] uppercase">
          {article.category_tag}
        </p>

        <h3 className="mt-3 font-heading text-xl leading-[1.15] font-bold tracking-tight text-balance text-white">
          <Link
            href={`/blog/${article.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-white/12 pt-4 text-xs text-white/60">
        <span className="font-medium text-white/85">{article.author_name}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={article.published_date}>
          {formatDate(article.published_date, "short")}
        </time>
        <span aria-hidden="true">&middot;</span>
        <span>{formatReadTime(article.read_time_minutes)}</span>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- Section */

/**
 * The guides showcase.
 *
 * The title sits centred in the upper third, inside the oculus rather than
 * beside it, which is the one place in this artwork where type belongs. The
 * cards then sit on the darkened floor below.
 *
 * Full bleed and curved at both ends, matching the review wall, so the two
 * dark panels on this page read as a pair rather than as two ideas.
 */
export function GuidesShowcase({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="guides-heading"
      className="full-bleed relative isolate overflow-hidden rounded-t-[1.25rem] rounded-b-[2.5rem] bg-[#160603] pt-32 pb-20 sm:rounded-t-[1.75rem] sm:rounded-b-[4rem] sm:pt-40 sm:pb-24 lg:rounded-t-[2.25rem] lg:rounded-b-[5.5rem] lg:pt-48"
    >
      <Image
        src={SITE_IMAGES.guidesBackdrop}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/*
       * Weighted to the ends. The title sits over the brightest part of the
       * oculus and needs a veil to hold white type; the cards need the floor
       * near solid. The middle stays lightest so the artwork is still legible
       * as an image rather than as a texture.
       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#160603]/78 via-[#160603]/58 via-35% to-[#160603]"
      />

      <div className="container-site">
        {/* The title block, centred in the upper third */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="font-heading text-[0.7rem] font-bold tracking-[0.2em] text-[var(--color-brand)] uppercase sm:text-[0.78rem]">
            Buying guides
          </p>

          <h2
            id="guides-heading"
            className="mt-5 font-heading text-[2.5rem] leading-[1] tracking-[-0.04em] text-balance text-white sm:text-[3.5rem] lg:text-[4.5rem]"
          >
            Read before you
            <br />
            <span className="font-bold">commit the budget.</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-pretty text-white/65 sm:text-lg">
            Written by people who have implemented this software, not by people who sell it.
          </p>
        </div>

        {/* A run of the artwork between the title and the cards. */}
        <div className="mt-24 grid gap-4 sm:mt-32 md:grid-cols-2 lg:mt-40 lg:grid-cols-3">
          {articles.map((article, index) => (
            <GuideCard key={article.id} article={article} index={index + 1} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CtaButton href="/blog" variant="onDark">
            Read all guides
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
