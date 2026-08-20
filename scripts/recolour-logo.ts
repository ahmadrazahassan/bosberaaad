import sharp from "sharp";

/**
 * Recolours the supplied logo mark into the current brand palette and writes
 * `public/logo-brand.png`.
 *
 * The source artwork is the real mark, in its original geometry. Only the
 * three flat fills are remapped, and the white canvas is knocked out so the
 * mark sits correctly on the navbar, the dark footer and the admin sidebar.
 *
 * Antialiased edge pixels are handled by blending towards whichever source
 * colour they sit closest to, which keeps the curves clean rather than
 * producing a fringe.
 *
 * Run again after any palette change:  npx tsx scripts/recolour-logo.ts
 */

type RGB = [number, number, number];

const SOURCE = "public/logo.png";
const OUTPUT = "public/logo-brand.png";

/** Source fill -> replacement. */
const MAP: { from: RGB; to: RGB }[] = [
  { from: [0, 168, 107], to: [255, 90, 31] }, // green      -> brand orange
  { from: [0, 115, 63], to: [201, 58, 15] }, // dark green -> deep orange, the overlap
  { from: [27, 31, 59], to: [22, 24, 43] }, // navy       -> new navy
];

const WHITE: RGB = [255, 255, 255];

const distance = (a: RGB, b: RGB) =>
  (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

async function main() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += 4) {
    const pixel: RGB = [out[i], out[i + 1], out[i + 2]];

    // Find the nearest source colour, white included.
    let nearest: RGB | null = null;
    let nearestTo: RGB | null = null;
    let best = distance(pixel, WHITE);

    for (const entry of MAP) {
      const d = distance(pixel, entry.from);
      if (d < best) {
        best = d;
        nearest = entry.from;
        nearestTo = entry.to;
      }
    }

    if (!nearest || !nearestTo) {
      // Closest to white: knock it out, keeping partial alpha on soft edges.
      const lightness = (pixel[0] + pixel[1] + pixel[2]) / 3;
      out[i + 3] = Math.round(out[i + 3] * (1 - lightness / 255));
      continue;
    }

    /*
     * Blend by how far the pixel sits from its source fill, so an edge pixel
     * that is 40% green becomes 40% orange rather than snapping to solid.
     */
    const spread = Math.sqrt(best) / 255;
    const weight = Math.max(0, 1 - spread);

    for (let c = 0; c < 3; c += 1) {
      out[i + c] = Math.round(pixel[c] + (nearestTo[c] - nearest[c]) * weight);
    }
  }

  // The source carries a wide transparent margin. Trim it so the mark can be
  // sized directly by the layout instead of every call site compensating.
  const result = await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  console.log(`Wrote ${OUTPUT} at ${result.width}x${result.height}, trimmed from ${info.width}x${info.height}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
