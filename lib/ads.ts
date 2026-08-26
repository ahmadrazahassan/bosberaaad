/**
 * Sponsored display units, served by Impact for Sage South Africa.
 *
 * Impact supplies each creative as a block of HTML containing an inline
 * `javascript:` handler and a bare tracking pixel. None of that is pasted in.
 * Every URL Impact uses is derived from three numbers, so a creative is
 * declared here as its ad id plus its dimensions and nothing else:
 *
 *   click       https://sagesouthafrica.pxf.io/c/{MEDIA_PARTNER}/{id}/{CAMPAIGN}
 *   creative    https://a.impactradius-go.com/display-ad/{CAMPAIGN}-{id}
 *   poster      https://a.impactradius-go.com/display-clicktoplayimage/{id}.jpeg
 *   impression  https://imp.pxf.io/i/{MEDIA_PARTNER}/{id}/{CAMPAIGN}
 *
 * The impression pixel is fired by the component when the unit is actually
 * seen, not when the page loads. Counting an impression for a unit the reader
 * never scrolled to would overstate delivery to the advertiser.
 */

const MEDIA_PARTNER = "7649214";
const CAMPAIGN = "34654";

export type AdCreative = {
  /** Impact's ad id. Everything else is derived from it. */
  id: string;
  name: string;
  kind: "image" | "video";
  width: number;
  height: number;
  /** Describes the offer, for readers who cannot see the creative. */
  alt: string;
};

export const SAGE_CREATIVES = {
  cashflowMobile: {
    id: "3997319",
    name: "Cash flow",
    kind: "image",
    width: 320,
    height: 50,
    alt: "Sage: cash flow visibility for South African business",
  },
  cashflowLeaderboard: {
    id: "3997317",
    name: "Cash flow visibility",
    kind: "image",
    width: 728,
    height: 90,
    alt: "Sage: cash flow visibility for South African business",
  },
  businessConfidence: {
    id: "3067401",
    name: "Business confidence",
    kind: "image",
    width: 300,
    height: 250,
    alt: "Sage: business confidence starts with knowing your numbers",
  },
  reclaim: {
    id: "2975738",
    name: "Reclaim your time",
    kind: "image",
    width: 300,
    height: 600,
    alt: "Sage Accounting: reclaim the time you spend on admin",
  },
  sageMark: {
    id: "3061825",
    name: "Sage mark",
    kind: "image",
    width: 724,
    height: 1244,
    alt: "Sage",
  },
  accountingVideo: {
    id: "3997706",
    name: "Sage Accounting",
    kind: "video",
    width: 1080,
    height: 1920,
    alt: "Sage Accounting, a short video",
  },
  taxComplianceVideo: {
    id: "3997674",
    name: "Tax compliance",
    kind: "video",
    width: 1080,
    height: 1920,
    alt: "Sage on tax compliance, a short video",
  },
} as const satisfies Record<string, AdCreative>;

export type CreativeKey = keyof typeof SAGE_CREATIVES;

export const adClickUrl = (id: string) =>
  `https://sagesouthafrica.pxf.io/c/${MEDIA_PARTNER}/${id}/${CAMPAIGN}`;

export const adCreativeUrl = (id: string) =>
  `https://a.impactradius-go.com/display-ad/${CAMPAIGN}-${id}`;

export const adPosterUrl = (id: string) =>
  `https://a.impactradius-go.com/display-clicktoplayimage/${id}.jpeg`;

export const adImpressionUrl = (id: string) =>
  `https://imp.pxf.io/i/${MEDIA_PARTNER}/${id}/${CAMPAIGN}`;

/**
 * Named positions rather than pixel sizes at the call site, so a page asks for
 * "the leaderboard" and the registry decides which creative that is. Changing
 * a creative is then one edit here rather than a hunt through the pages.
 *
 * A slot may name a narrow and a wide creative. The component picks one and
 * fires only that one's pixel; rendering both and hiding one with CSS would
 * report two impressions for a unit the reader saw once.
 */
export const AD_SLOTS = {
  leaderboard: { narrow: "cashflowMobile", wide: "cashflowLeaderboard" },
  rectangle: { narrow: "businessConfidence", wide: "businessConfidence" },
  halfPage: { narrow: "businessConfidence", wide: "reclaim" },
  vertical: { narrow: "accountingVideo", wide: "accountingVideo" },
  taxVertical: { narrow: "taxComplianceVideo", wide: "taxComplianceVideo" },
} as const satisfies Record<string, { narrow: CreativeKey; wide: CreativeKey }>;

export type AdSlot = keyof typeof AD_SLOTS;
