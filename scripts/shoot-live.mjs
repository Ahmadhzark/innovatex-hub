import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// PowerShell drops an empty-string CLI arg entirely, so "." is the sentinel
// for the site root rather than "".
const rawRoute = process.argv[2] ?? ".";
const route = rawRoute === "." ? "" : rawRoute;
const name = process.argv[3] ?? "live";
const width = Number(process.argv[4] ?? 390);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 2,
  isMobile: width < 500,
  hasTouch: width < 500,
});
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(`https://ahmadhzark.github.io/innovatex-hub/${route}`, {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(1500);

const outDir = path.join(process.cwd(), ".screenshots");
await mkdir(outDir, { recursive: true });
await page.screenshot({ path: path.join(outDir, `${name}.png`) });
console.log(`saved ${name}.png`);
console.log(errors.length ? `errors: ${errors.slice(0, 5).join(" | ")}` : "no console errors");

await browser.close();
