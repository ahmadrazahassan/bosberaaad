import sharp from "sharp";

/**
 * The supplied 3D render shapes are blue and pink, which fights an orange and
 * red brand. Rather than draw replacements, this recolours the real renders
 * and writes them alongside the originals as `*-brand.png`.
 *
 * Rotating the hue was tried first and produced a muddy olive, because the
 * source blues are dark and only partly saturated. Flattening to greyscale and
 * then tinting keeps the specular highlights, the iridescent fringing and the
 * soft shadow intact while giving a clean, predictable brand hue. Redrawing
 * these as flat SVG would lose exactly that.
 *
 * Run again after any palette change:  npx tsx scripts/recolour-shapes.ts
 */

/** Each shape gets its own tint so the set has range rather than one repeated colour. */
const SHAPES: { file: string; tint: string }[] = [
  { file: "shape-donut", tint: "#ff5a1f" }, // brand orange
  { file: "shape-star", tint: "#f04e15" }, // orange
  { file: "shape-spring", tint: "#ff7a45" }, // light orange
  { file: "shape-cube-pink", tint: "#dc2626" }, // brand red
  { file: "shape-cube-blue", tint: "#ff6a2b" },
  { file: "shape-cylinder", tint: "#c93a0f" },
];

async function main() {
  for (const { file, tint } of SHAPES) {
    const source = `public/assets/${file}.png`;
    const output = `public/assets/${file}-brand.png`;

    await sharp(source)
      /*
       * `tint` already works on luminance, so an explicit `greyscale` first
       * only collapses the colourspace and leaves the tint nothing to apply
       * to. The linear lift keeps the result from reading as brown.
       */
      .linear(1.18, 10)
      .tint(tint)
      .png({ compressionLevel: 9 })
      .toFile(output);

    console.log(`${file.padEnd(18)} tinted ${tint}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
