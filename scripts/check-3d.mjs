/** Dev-only: verifies the lazy-loaded 3D viewer mounts and renders. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
});

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto("http://localhost:3000/weeks/1/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// The ESP32 hero on the week page carries a model, so it exposes the toggle.
const button = page.getByRole("button", { name: /View in 3D/i }).first();
await button.waitFor({ state: "attached", timeout: 15000 });
await button.click({ force: true });

// Give the dynamic import + first WebGL frames time to land.
await page.waitForTimeout(6000);

const canvasInfo = await page.evaluate(() => {
  const canvas = document.querySelector("canvas:not([aria-hidden])");
  if (!canvas) return { found: false };
  const rect = canvas.getBoundingClientRect();
  const gl =
    canvas.getContext("webgl2") || canvas.getContext("webgl");
  return {
    found: true,
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    hasWebGL: Boolean(gl),
  };
});

console.log("3D canvas:", canvasInfo);

const outDir = path.join(process.cwd(), ".screenshots");
await mkdir(outDir, { recursive: true });
await page.screenshot({ path: path.join(outDir, "viewer-3d.png") });
console.log("saved .screenshots/viewer-3d.png");

if (errors.length) {
  console.log(`errors (${errors.length}):`);
  errors.slice(0, 8).forEach((e) => console.log("  -", e.slice(0, 200)));
} else {
  console.log("no console errors");
}

await browser.close();
