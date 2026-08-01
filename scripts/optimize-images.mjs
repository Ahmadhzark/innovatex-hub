/**
 * Compresses the sourced hardware photography for fast static hosting.
 *
 *   node scripts/optimize-images.mjs
 *
 * For every JPEG in public/images/hardware/ this writes:
 *   <slug>.webp        1400px wide  — full-size / hero use
 *   <slug>-sm.webp      640px wide  — cards and grids
 *   <slug>-blur.webp     20px wide  — inlined blur-up placeholder
 *
 * Blur placeholders are also written as base64 data URIs to
 * src/data/image-blur.json so cards can fade in from a blur.
 */

import { readdir, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images", "hardware");
const BLUR_FILE = path.join(process.cwd(), "src", "data", "image-blur.json");

async function main() {
  const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));
  if (!files.length) {
    console.log("no source JPEGs found — run fetch-hardware-images.mjs first");
    return;
  }

  const blurMap = {};
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of files) {
    const slug = file.replace(/\.jpe?g$/i, "");
    const src = path.join(DIR, file);
    beforeTotal += (await stat(src)).size;

    const input = sharp(src).rotate(); // honour EXIF orientation

    // Full size — capped at 1400px, good enough for any hero on the site.
    const full = path.join(DIR, `${slug}.webp`);
    await input
      .clone()
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(full);
    afterTotal += (await stat(full)).size;

    // Card size.
    const small = path.join(DIR, `${slug}-sm.webp`);
    await input
      .clone()
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(small);
    afterTotal += (await stat(small)).size;

    // Tiny blur-up placeholder, inlined as a data URI.
    const blurBuffer = await input
      .clone()
      .resize({ width: 20 })
      .webp({ quality: 40 })
      .toBuffer();
    blurMap[slug] = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

    console.log(`ok  ${slug}`);
  }

  await mkdir(path.dirname(BLUR_FILE), { recursive: true });
  await writeFile(BLUR_FILE, JSON.stringify(blurMap, null, 2) + "\n");

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  console.log(
    `\nsource JPEG ${mb(beforeTotal)}MB -> webp ${mb(afterTotal)}MB ` +
      `(${Math.round((1 - afterTotal / beforeTotal) * 100)}% smaller)`,
  );
  console.log(`blur data -> ${path.relative(process.cwd(), BLUR_FILE)}`);
  console.log(
    "\nThe original .jpg files are kept as masters but are NOT shipped:\n" +
      "public/images/hardware/*.jpg is gitignored — only .webp is deployed.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
