/**
 * Affiliate network links.
 *
 * A managed network link has to be the href the browser actually navigates to.
 * The network sets its click cookie on that request and stamps the click id on
 * the landing URL; putting our own redirect in front of it adds a hop, and
 * several networks treat a click arriving via a third party redirect as
 * unattributable. Impact, which is what Sage runs on, is one of them.
 *
 * So links on these hosts bypass /api/track-click and are rendered directly.
 * Everything else still goes through the tracking route.
 */

/**
 * Sage South Africa, via Impact. One link covers the whole Sage catalogue:
 * the programme is per advertiser, not per product, so every Sage product
 * shares it rather than each carrying a different one.
 */
export const SAGE_AFFILIATE_URL = "https://sagesouthafrica.pxf.io/dyq0qK";

/**
 * Hosts belonging to affiliate networks rather than to a vendor. Impact serves
 * from pxf.io and sjv.io, CJ from the anrdoezrs/dpbolvw/tkqlhce family, Awin
 * from awin1 and prf.hn.
 */
const NETWORK_HOSTS = [
  "pxf.io",
  "sjv.io",
  "ojrq.net",
  "awin1.com",
  "prf.hn",
  "anrdoezrs.net",
  "dpbolvw.net",
  "tkqlhce.com",
  "kqzyfj.com",
  "jdoqocy.com",
  "shareasale.com",
  "partnerize.com",
];

/** Whether a URL is a managed network link that must be clicked directly. */
export function isNetworkAffiliateLink(url: string | null | undefined): boolean {
  if (!url) return false;

  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }

  return NETWORK_HOSTS.some((network) => host === network || host.endsWith(`.${network}`));
}
