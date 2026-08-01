/**
 * Dev-only visual check: screenshots pages from the running dev server.
 *
 *   node scripts/shoot.mjs [path] [outputName] [viewportWidth]
 *
 * Not part of the site build or deploy.
 */

import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const [, , route = "/", name = "home", width = "1440"] = process.argv;

const OUT_DIR = path.join(process.cwd(), ".screenshots");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width), height: 1000 },
  deviceScaleFactor: 2,
  // Renders every scroll-reveal in its final state, so a full-page capture
  // shows the real layout instead of animations frozen mid-flight.
  reducedMotion: "reduce",
});

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (error) => errors.push(String(error)));

await page.goto(`http://localhost:3000${route}`, {
  waitUntil: "networkidle",
  timeout: 60000,
});

// Let entrance animations settle, then scroll through so
// every scroll-triggered reveal has fired before capture.
await page.waitForTimeout(1600);
await page.evaluate(async () => {
  // Step in small increments and dwell, so every IntersectionObserver
  // reveal actually fires before we capture.
  const step = window.innerHeight * 0.45;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 420));
  }
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 700));
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1600);

await mkdir(OUT_DIR, { recursive: true });
const file = path.join(OUT_DIR, `${name}.png`);
await page.screenshot({ path: file, fullPage: true });

console.log(`saved ${path.relative(process.cwd(), file)}`);
if (errors.length) {
  console.log(`\nconsole errors (${errors.length}):`);
  errors.slice(0, 12).forEach((e) => console.log("  -", e.slice(0, 220)));
} else {
  console.log("no console errors");
}

await browser.close();
