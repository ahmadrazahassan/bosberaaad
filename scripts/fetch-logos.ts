import { SOFTWARE } from "@/lib/data/software";

import { getServiceClient } from "./_client";

/**
 * Fetches each vendor's logo and stores it in the `logos` bucket, then points
 * the product record at the stored copy.
 *
 * Why store rather than hotlink: a hotlinked logo breaks when the vendor
 * reorganises their site, and it leaks your visitors' requests to them. The
 * monogram tile in SoftwareLogo renders whenever this has not been run, so the
 * site is never broken by a missing logo.
 *
 * Logos are vendor trade marks used for identification. Check each vendor's
 * brand guidelines before publishing, and remove any that ask you not to.
 */
function logoSource(website: string | null): string | null {
  if (!website) return null;
  try {
    const domain = new URL(website).hostname.replace(/^www\./, "");
    // Clearbit serves company logos by domain and is the least worst option
    // for a first pass. Replace with vendor supplied assets where you have them.
    return `https://logo.clearbit.com/${domain}`;
  } catch {
    return null;
  }
}

async function main() {
  const client = getServiceClient();

  let stored = 0;
  let skipped = 0;

  console.log(`\nFetching logos for ${SOFTWARE.length} products\n`);

  for (const item of SOFTWARE) {
    const source = logoSource(item.vendor_website);
    if (!source) {
      skipped += 1;
      continue;
    }

    try {
      const response = await fetch(source);
      if (!response.ok) {
        console.log(`  skip  ${item.name} (${response.status})`);
        skipped += 1;
        continue;
      }

      const contentType = response.headers.get("content-type") ?? "image/png";
      const extension = contentType.includes("svg")
        ? "svg"
        : contentType.includes("jpeg")
          ? "jpg"
          : "png";
      const path = `${item.slug}.${extension}`;
      const bytes = new Uint8Array(await response.arrayBuffer());

      const { error: uploadError } = await client.storage
        .from("logos")
        .upload(path, bytes, { contentType, upsert: true });

      if (uploadError) {
        console.log(`  fail  ${item.name}: ${uploadError.message}`);
        skipped += 1;
        continue;
      }

      const {
        data: { publicUrl },
      } = client.storage.from("logos").getPublicUrl(path);

      await client.from("software").update({ logo_url: publicUrl }).eq("slug", item.slug);
      await client
        .from("media_library")
        .upsert(
          { bucket: "logos", path, public_url: publicUrl, alt_text: `${item.name} logo` },
          { onConflict: "bucket,path" },
        );

      console.log(`  ok    ${item.name}`);
      stored += 1;
    } catch (error) {
      console.log(`  fail  ${item.name}: ${error instanceof Error ? error.message : "unknown"}`);
      skipped += 1;
    }
  }

  console.log(`\nStored ${stored}, skipped ${skipped}.`);
  console.log("Products without a logo fall back to the monogram tile, which is by design.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
