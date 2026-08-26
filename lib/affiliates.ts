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

/**
 * Adds a deep link destination and a placement tag to a network link.
 *
 * `u` is Impact's deep link parameter. Without it every Sage CTA lands on
 * sage.com/en-za regardless of which product was being read, so somebody who
 * clicked from the Sage Payroll review arrives at a homepage and has to find
 * payroll themselves. With it they land on the payroll page, and the click id
 * is still minted on the way through.
 *
 * `sharedid` tags the placement, so Impact's reports show which surface a
 * click came from. That is what makes an attribution problem diagnosable: a
 * click count that looks wrong can be traced to the placement that produced
 * it rather than guessed at.
 *
 * Both verified against the live programme before use.
 */
export function withAffiliateContext(
  base: string,
  { destination, placement }: { destination?: string | null; placement?: string },
): string {
  let url: URL;
  try {
    url = new URL(base);
  } catch {
    return base;
  }

  // Only deep link to the advertiser's own site. Pointing `u` anywhere else
  // would send the reader somewhere the programme never agreed to.
  //
  // Compared rather than matched: a regex here is one escaped dot away from
  // treating "notsageXcom" as the advertiser.
  const host = destination ? safeHost(destination).toLowerCase() : "";
  if (host === "sage.com" || host.endsWith(".sage.com")) {
    url.searchParams.set("u", destination as string);
  }
  if (placement) url.searchParams.set("sharedid", placement);

  return url.toString();
}

function safeHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

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
