import { SOFTWARE } from "@/lib/data/software";
import { formatPrice } from "@/lib/format";

import { getServiceClient } from "./_client";

/**
 * Weekly price freshness check.
 *
 * This does not scrape vendor sites, because a scraper against forty vendors
 * breaks constantly and quietly produces wrong numbers, which is worse than no
 * check at all. What it does is flag every product whose stored price has not
 * been verified recently, so a human re checks it against the vendor's own
 * page. That is the job that actually protects credibility.
 *
 * Run it from a scheduled task and send the output to whoever owns pricing.
 */
const STALE_AFTER_DAYS = 90;

type Row = {
  name: string;
  slug: string;
  starting_price: number | null;
  price_currency: string;
  price_checked_at: string | null;
  vendor_website: string | null;
};

async function main() {
  const client = getServiceClient();

  const { data, error } = await client
    .from("software")
    .select("name, slug, starting_price, price_currency, price_checked_at, vendor_website")
    .eq("status", "published")
    .order("price_checked_at", { ascending: true, nullsFirst: true });

  // Fall back to the bundled dataset so the check is useful before the database
  // exists, which is exactly when someone is setting the schedule up.
  const rows: Row[] =
    error || !data || data.length === 0
      ? SOFTWARE.map((item) => ({
          name: item.name,
          slug: item.slug,
          starting_price: item.starting_price,
          price_currency: item.price_currency,
          price_checked_at: item.price_checked_at ?? null,
          vendor_website: item.vendor_website,
        }))
      : (data as Row[]);

  const now = Date.now();
  const stale = rows.filter((row) => {
    if (!row.price_checked_at) return true;
    const age = (now - new Date(row.price_checked_at).getTime()) / 86_400_000;
    return age > STALE_AFTER_DAYS;
  });

  const foreign = rows.filter((row) => row.price_currency !== "ZAR" && row.starting_price !== null);

  console.log(`\nPrice check across ${rows.length} published products\n`);

  if (stale.length === 0) {
    console.log(`  Every price has been verified within ${STALE_AFTER_DAYS} days.\n`);
  } else {
    console.log(`  ${stale.length} need re verification against the vendor's own page:\n`);
    for (const row of stale) {
      const age = row.price_checked_at
        ? `${Math.round((now - new Date(row.price_checked_at).getTime()) / 86_400_000)} days`
        : "never checked";
      console.log(
        `    ${row.name.padEnd(30)} ${formatPrice(row.starting_price, row.price_currency).padStart(14)}  ${age}`,
      );
      if (row.vendor_website) console.log(`      ${row.vendor_website}`);
    }
    console.log("");
  }

  if (foreign.length > 0) {
    console.log(
      `  ${foreign.length} products are billed in a foreign currency, so the rand cost moves\n` +
        "  with the exchange rate. Confirm the page copy still says so:\n",
    );
    for (const row of foreign) {
      console.log(`    ${row.name.padEnd(30)} ${row.price_currency}`);
    }
    console.log("");
  }

  // A non zero exit makes this usable as a failing step in a scheduled job.
  if (stale.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
