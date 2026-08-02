/**
 * Dev-only hero gallery smoke test.
 *
 *   node scripts/test-gallery.mjs
 *
 * Drives the slideshow the way a visitor would — arrows, dots, autoplay and
 * hover-to-pause — reading the active slide from the dots' aria-current so
 * the assertions don't race the crossfade.
 */

import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const gallery = page.locator('[aria-roledescription="carousel"]');
const dots = page.locator('button[aria-label^="Go to photo"]');

/** Index of the slide currently marked active. */
const activeIndex = async () => {
  const flags = await dots.evaluateAll((nodes) =>
    nodes.map((n) => n.getAttribute("aria-current") === "true"),
  );
  return flags.indexOf(true);
};

let failures = 0;
const check = (label, ok, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
};

check("gallery renders", await gallery.isVisible());
check("dots match photo count", (await dots.count()) === 3, `${await dots.count()} dots`);
check("starts on first photo", (await activeIndex()) === 0);

await page.locator('button[aria-label="Next photo"]').click();
await page.waitForTimeout(1000);
check("next arrow advances", (await activeIndex()) === 1, `index ${await activeIndex()}`);

await page.locator('button[aria-label="Previous photo"]').click();
await page.waitForTimeout(1000);
check("previous arrow goes back", (await activeIndex()) === 0, `index ${await activeIndex()}`);

await dots.nth(2).click();
await page.waitForTimeout(1000);
check("dot jumps to that photo", (await activeIndex()) === 2, `index ${await activeIndex()}`);

// Autoplay, with the pointer well away from the gallery.
await page.mouse.move(5, 5);
const before = await activeIndex();
await page.waitForTimeout(6500);
const after = await activeIndex();
check("autoplay advances", before !== after, `${before} -> ${after}`);

// Hovering should hold the current slide.
await gallery.hover();
await page.waitForTimeout(500);
const heldFrom = await activeIndex();
await page.waitForTimeout(6500);
check("hover pauses autoplay", (await activeIndex()) === heldFrom);

check("no console errors", errors.length === 0, errors.slice(0, 2).join(" | "));

console.log(failures === 0 ? "\ngallery behaves correctly" : `\n${failures} check(s) failed`);
await browser.close();
process.exit(failures === 0 ? 0 : 1);
