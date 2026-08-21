import sharp from "sharp";

/**
 * The guides backdrop. Unlike the reviews artwork this one already sits in the
 * brand's orange, so nothing is retinted; it only needs to stop being a 1.1MB
 * PNG for what is a photograph.
 *
 * Quality is high for a background because the piece is one continuous
 * gradient from the oculus down to the floor, and that is exactly where JPEG
 * banding shows.
 *
 * Run again if the artwork changes:  npx tsx scripts/optimise-blogs-bg.ts
 */

const SOURCE = "public/blogs-section.png";
const OUTPUT = "public/guides-backdrop.jpg";

async function main() {
  const input = sharp(SOURCE);
  const meta = await input.metadata();

  const info = await input
    .clone()
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OUTPUT);

  const sourceKb = Math.round((meta.size ?? 0) / 1024);
  const outputKb = Math.round(info.size / 1024);

  console.log(`Guides backdrop: ${meta.width}x${meta.height} PNG at ${sourceKb}KB`);
  console.log(`  ->  ${info.width}x${info.height} JPEG at ${outputKb}KB (${OUTPUT})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
