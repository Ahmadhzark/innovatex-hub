import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 375, height: 780 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.getByRole("button", { name: /toggle menu/i }).click();
await page.waitForTimeout(500);

const outDir = path.join(process.cwd(), ".screenshots");
await mkdir(outDir, { recursive: true });
await page.screenshot({ path: path.join(outDir, "nav-open-mobile.png") });
console.log("saved");
await browser.close();
