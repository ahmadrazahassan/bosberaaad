import sharp from "sharp";

/**
 * The supplied reviews backdrop is a violet arc on near black. Violet belongs
 * to nobody here, so the arc is retinted to the signature orange.
 *
 * tint() maps luminance onto the tint colour and keeps the falloff intact, so
 * the black ground stays black and only the glow takes the brand. Greyscaling
 * first would flatten the arc into a grey smear, and hue rotation turns this
 * particular violet muddy. Neither is needed.
 *
 * Run again if the artwork changes:  npx tsx scripts/recolour-reviews-bg.ts
 */

const SOURCE = "public/reviews-section.png";
const OUTPUT = "public/reviews-backdrop.jpg";
const TINT = "#ff5a1f";

async function main() {
  const input = sharp(SOURCE);
  const meta = await input.metadata();

  const info = await input
    .clone()
    .tint(TINT)
    .resize({ width: 2000, withoutEnlargement: true })
    // A dark gradient is where JPEG banding shows, so this sits higher than
    // the hero's 74 despite carrying far less detail.
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(OUTPUT);

  const sourceKb = Math.round((meta.size ?? 0) / 1024);
  const outputKb = Math.round(info.size / 1024);

  console.log(`Reviews backdrop: ${meta.width}x${meta.height} PNG at ${sourceKb}KB`);
  console.log(`  ->  ${info.width}x${info.height} JPEG at ${outputKb}KB (${OUTPUT})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
