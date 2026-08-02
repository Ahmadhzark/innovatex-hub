/**
 * Writes each project's Arduino sketch to public/downloads/<filename>.ino
 * so the "Download the .ino file" button serves exactly the code shown on
 * the page. Run after editing any project's `code` block:
 *
 *   npm run downloads:build
 *
 * Reads src/data/projects.ts directly rather than importing it, so the
 * script stays free of the Next.js/TypeScript toolchain.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const SOURCE = "src/data/projects.ts";
const OUT_DIR = "public/downloads";

const source = readFileSync(SOURCE, "utf8");

// Each sketch is stored as:  code: { filename: "x.ino", content: `...` }
const pattern =
  /filename:\s*"([^"]+\.ino)"\s*,\s*content:\s*`([\s\S]*?)`\s*,?\s*\}/g;

mkdirSync(OUT_DIR, { recursive: true });

// Clear previously generated sketches so a renamed file doesn't linger.
for (const existing of readdirSync(OUT_DIR)) {
  if (existing.endsWith(".ino")) unlinkSync(join(OUT_DIR, existing));
}

let count = 0;
for (const [, filename, raw] of source.matchAll(pattern)) {
  // Undo the escaping needed to sit inside a TypeScript template literal.
  const content = raw.replace(/\\`/g, "`").replace(/\\\$/g, "$").trim();
  writeFileSync(join(OUT_DIR, filename), content + "\n", "utf8");
  console.log(`ok  ${filename}  (${content.split("\n").length} lines)`);
  count++;
}

console.log(
  count === 0
    ? "no sketches found — check the code block format in " + SOURCE
    : `\nwrote ${count} sketch(es) to ${OUT_DIR}`,
);
