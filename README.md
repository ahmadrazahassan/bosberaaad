# Bosberaaad

South Africa's independent business software guide. An editorial directory of accounting, payroll,
HR, CRM, ERP and project management software, assessed against the compliance requirements that
actually apply in this country.

Built on Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4 and Supabase.

---

## Running it

```bash
npm install
npm run dev
```

That is the whole setup. **The site renders fully without a database.** Every query falls back to a
bundled editorial dataset of 39 products, 8 099 reviews, 25 articles, 15 comparisons and 7 legal
pages, so local development, previews and the first deploy all work before anyone has run a
migration.

### Connecting Supabase

```bash
cp .env.example .env.local     # fill in your project keys
```

Then run the migrations in `supabase/migrations` **in order**, through the Supabase SQL editor or
the CLI:

| File | What it does |
|---|---|
| `0001_schema.sql` | Tables, indexes, full text search columns |
| `0002_triggers.sql` | Rating aggregation, category counts, audit log, price history, helpful voting |
| `0003_rls.sql` | Row level security on every table, plus storage buckets |

Then:

```bash
npm run create-admin   # reads ADMIN_EMAIL and ADMIN_PASSWORD from .env.local
npm run seed           # pushes the bundled dataset into Postgres
```

Sign in at `/admin/login`.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | The usual |
| `npm run lint` | ESLint |
| `npm run seed` | Full seed |
| `npm run seed:reviews` / `:articles` / `:comparisons` / `:pages` | Scoped re seed |
| `npm run create-admin` | Creates the single administrator account |
| `npm run logos` | Fetches vendor logos into the `logos` bucket |
| `npm run check-prices` | Flags products whose price has not been verified in 90 days |
| `npm run assets` | Regenerates the recoloured logo, the tinted hero shapes and the hero encoding |

---

## The decisions worth knowing

### Aggregate ratings are never written by application code

The five averages and the review count on every product are computed by the
`update_software_ratings()` trigger, from published reviews only. No form, no server action and no
seed script writes them. The admin panel has no field for them, deliberately. If a rating looks
wrong, the fix is a review that should or should not be published.

The bundled dataset mirrors this: `lib/data/software/index.ts` derives every average from the
generated review set rather than using the authored seed value, so the two sources agree about where
a star average comes from.

### Ranking uses a Bayesian weighted average

A raw star average lets a product with eleven reviews at 4.8 outrank one with four hundred at 4.4,
which is not useful to a buyer. `lib/ranking.ts` blends each product towards the platform mean,
weighted by review volume, using the median review count as the prior weight. Priors are computed
from whatever set is being ranked, so a category page ranks within its category.

### A logging failure never costs a click

`/api/track-click` logs the click and redirects. The insert is fire and forget inside a try and
catch, and the 302 is issued regardless. Money first, analytics second. The visitor's IP is hashed
with a server side salt before storage, because POPIA treats a raw IP as personal information.

### Both comparison orderings resolve

`/compare/xero-vs-sage-accounting` and `/compare/sage-accounting-vs-xero` both render, and both
carry the same canonical URL, so a long tail query is never lost to a 404 and the ranking signal is
never split. A pair with no authored verdict still produces a useful page built from the two
products' data.

### The admin writes through a registry

`lib/admin/resources.ts` holds one field map per table. It drives both the form renderer and the
save action, so a field outside the whitelist cannot be written. Adding a database column does not
silently expose it, and a crafted request cannot set something the form does not offer.

### FAQs are generated, not written

`lib/faq.ts` builds each product's FAQ set from its own record: cost with the VAT basis stated, free
trial availability, local compliance coverage with the gaps named, bank support, integrations, what
reviewers say and who it suits. They can never drift from the data on the same page, and every
product has them without an editor writing three hundred answers.

---

## The design system

Everything lives in `app/globals.css`.

**Orange and red, with three roles that are never confused.** A saturated orange is too light to
carry white text, so the system separates the colour you fill with from the colour you set text in.
Getting this wrong is the single easiest way to ship an inaccessible orange site.

| Token | Role |
|---|---|
| `--color-brand` `#ff5a1f` | The signature orange. Decorative fills, chart bars, icon accents on dark. Never carries a label. |
| `--color-brand-deep` `#c93a0f` | The fill that **does** carry white text. Every solid button, every filled pill with a label. |
| `--color-brand-dark` `#b93815` | Brand coloured *text* and links on light surfaces. Becomes `#ff8a5b` in dark mode. |
| `--color-red` `#dc2626` | The second half of the primary gradient, and secondary accents. |

Measured contrast, both themes:

| Pair | Light | Dark |
|---|---|---|
| Brand text on background | 5.77 | 8.30 |
| White on the button gradient | 5.13 to 4.83 | 5.13 to 4.83 |
| Body on background | 18.04 | 17.55 |
| Muted on background | 4.83 | 7.60 |
| Brand text on the brand wash | 5.23 | passes |

Everything above clears AA. There is no green anywhere in the compiled CSS, verified by scanning
both the stylesheet and every computed colour in the rendered page, in both themes.

**One button.** Every call to action on the site is `CtaButton`, so they are
identical rather than merely similar. A neutral pill, an uppercase label, and
the brand orange concentrated into a chip on the right. Putting the orange in
the chip rather than across the whole field is what makes it read as
deliberate: the accent points somewhere instead of shouting.

The surface is `--foreground` on `--background`, so the button inverts with the
theme and needs no dark mode override. Three variants: `default` (near black),
`soft` (page surface, themed) and `onDark` (fixed white, for panels such as the
navy newsletter band whose colour does not follow the theme).

The chip sits at `#e2480c` rather than the signature orange. The arrow is a
graphic, so 3:1 would pass, but the vivid orange only reaches 3.12:1 against
white and that is too thin to rely on. This is 4.07:1 and still reads as orange.

The chip is a flex sibling of the label, never an absolutely positioned layer.
An earlier version slid it across the button on hover, which meant it could and
did land on top of the text. It also holds the spinner while a form action is in
flight, so `pending` is the only state a form has to pass.

**Headings are plain type.** An earlier revision wrapped two or three words of every heading in a
coloured pill. That is gone. `SectionHeader` still takes `title`, `highlight` and `titleAfter`
because the copy at each call site is written as one sentence split across three props, but nothing
is given a coloured background any more.

**Typography.** Google Sans carries headings, the wordmark, statistics, prices and ratings. Inter
carries body copy, labels, table cells and long form article text. Apply `font-heading` explicitly
on non heading elements that should use Google Sans.

Dark mode is enabled and wired to `next-themes` with `defaultTheme="system"`, with a working toggle
in the navbar.

---

## Imagery

Every image on the site is a real asset from `public`. Nothing is drawn in code.

| What | Where | Notes |
|---|---|---|
| Site mark | `public/logo-brand.png` | The supplied mark, recoloured into the palette by `scripts/recolour-logo.ts` |
| Hero banner | `public/hero-banner.jpg` | Re encoded from `use-this-as-hero.png`, 1.8MB PNG to 93KB, with an inline blur placeholder |
| Product logos | `public/logos` | 28 of 39 products. The rest fall back to a monogram tile |
| Screenshots | `public/screenshots` | 9 products. The carousel renders only where they exist |
| Integration logos | `public/integrations` | Mapped by name |
| Reviewer avatars | `public/avatars` | Assigned deterministically from the reviewer name |
| Country flags | `public/flags` | Shown beside each reviewer's location |

`lib/assets.ts` is the single registry. Where we do not hold a vendor's logo the map simply has no
entry and the component falls back, rather than shipping a broken image or inventing a mark for a
company that did not choose it.

Two of the supplied assets arrived in the old palette: the site mark was green, and the 3D shapes
were blue and pink. Both are recoloured by scripts rather than redrawn, so the geometry, the
specular highlights and the soft shadows are the originals. Re run those scripts after any palette
change.

**Vendor colours are scoped deliberately.** A product's own colour dresses its logo ring, where it
sits beside the real logo and reads as that company's identity. Our own interface, the rating dial,
the distribution bars, the charts and the buttons, wears the Bosberaaad palette. That is why a page
about a green vendor is not a green page, while their logo stays the colour it actually is.

The only marks still drawn as inline SVG are the four social platform icons in the footer. Icon sets
drop and redraw trademarks between versions, and lucide removed them at version 1, so those paths
are owned here. Every other icon comes from lucide.

### The footer

Three bands, following a reference the client supplied.

1. A full bleed accent band carrying the closing call to action, set in two
   weights on one line with the links inline beside it. Dark ink on the vivid
   orange at 6.04:1, which is the one place that pairing is used.
2. A light body: social marks as bare glyphs, the copyright and legal row
   beneath them, and two detail columns on the right.
3. The wordmark, set solid and clipped by the bottom edge. The crop is a share
   of the font size rather than a fixed value, so it stays constant as the type
   scales. Dark mode steps the fill back, because pure white at that size
   glares.

The previous footer carried five columns of links, including live category and
popular review lists. Those are gone in favour of the cleaner layout. That
removes roughly twenty internal links from every page, which is a real SEO
trade off on a site of this kind, and it was a deliberate client decision
rather than an oversight.

### Asset scripts

| Command | Purpose |
|---|---|
| `npx tsx scripts/recolour-logo.ts` | Recolours the site mark and trims its transparent margin |
| `npx tsx scripts/recolour-shapes.ts` | Tints the 3D hero shapes into the brand palette |
| `npx tsx scripts/optimise-hero.ts` | Re encodes the hero and regenerates the blur placeholder |

---

## Project layout

```
app/
  (public)/     Navbar and footer shell. Every public route.
  (admin)/      Admin shell. Login, dashboard, generic CRUD, audience, settings.
  api/          track-click, og, newsletter/confirm
  sitemap.ts    Generated from the data, 178 URLs
  robots.ts
components/
  ui/           Primitives: button, badge, card, input, select, table, overlays, misc
  public/       Everything the site renders
  admin/        Shell and the registry driven form
lib/
  data/         The bundled editorial dataset and the review generator
  queries/      Supabase reads with a local fallback for every one
  actions/      Server actions: forms, reviews, admin
  admin/        The resource registry
  ranking.ts    Bayesian weighted average
  faq.ts        Generated FAQs
  seo.tsx       JSON-LD builders
proxy.ts        Redirects table plus admin session refresh (renamed from middleware in Next 16)
supabase/       Migrations
scripts/        Seed, admin bootstrap, logos, price check
```

---

## Before you launch

Two things in the bundled dataset need a human before this goes live.

**1. Verify every price.** Prices are researched figures carrying a `price_checked_at` of
1 July 2026, and every product page shows that date and tells the reader to confirm with the vendor.
Vendors change prices without notice and publish inconsistently, some including VAT and some
excluding, and the difference is 15%. Work through `npm run check-prices` and confirm each figure
against the vendor's own South African pricing page before launch, then re verify quarterly.

**2. The review corpus is generated seed data.** `lib/data/reviews.ts` composes 8 099 reviews
deterministically from a South African identity corpus and a category aware phrase corpus, matched
to each product's target rating with a realistic J shaped star distribution. It exists so the site
has honest structure and volume to develop against, and so the ranking maths has something real to
work on. It is **not** genuine user feedback. Replace it with real submissions before publishing, or
label it clearly. Publishing generated reviews as verified user reviews would break the editorial
promise the entire site is built on.

Also worth doing: seed real vendor logos with `npm run logos` and check each vendor's brand
guidelines, and add real product screenshots. The screenshots section only renders when a product
has them, so nothing looks broken until you do.

---

## Definition of done

- [x] Google Sans on headings, Inter on body, verified in the browser
- [x] Light and dark themes both correct, no unreadable brand text in either
- [x] Every price in rand with en-ZA space grouping and the VAT basis stated
- [x] Aggregate ratings written only by the database trigger
- [x] Affiliate redirect fires when the click log write fails
- [x] Disclosure visible next to every commercial CTA
- [x] JSON-LD on profiles, articles, comparisons, breadcrumbs, organisation and website
- [x] Sitemap lists every published entity
- [x] Zero em dashes or hyphen punctuation in any published copy
- [x] Keyboard reaches every interactive element, with a visible focus ring
- [x] Skip to content link, `prefers-reduced-motion` respected globally
- [x] Seeded with 39 products, 8 099 reviews, 25 articles, 15 comparisons
- [ ] Prices verified against vendor pages by a human
- [ ] Generated review corpus replaced with real submissions
- [ ] Lighthouse run against a production deploy
