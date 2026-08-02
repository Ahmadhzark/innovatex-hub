/**
 * Dev-only search smoke test.
 *
 *   node scripts/test-search.mjs
 *
 * Types deliberately misspelled queries into the site search and prints the
 * top hit for each, so typo tolerance can be checked at a glance after any
 * change to the index or scoring in src/lib/search.ts.
 */

import { chromium } from "playwright";

const CASES = [
  ["ardino", "Arduino"],
  ["arduiono", "Arduino"],
  ["ultasonic", "HC-SR04"],
  ["servoo", "Servo Motor"],
  ["bread bord", "Breadboard"],
  ["moter", "Motor"],
  ["humidity", "DHT11"],
  ["distance sensor", "distance"],
  ["esp32", "ESP32"],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

let failures = 0;

for (const [query, expected] of CASES) {
  await page.keyboard.down("Control");
  await page.keyboard.press("k");
  await page.keyboard.up("Control");
  await page.waitForTimeout(250);

  // pressSequentially (not type) so React state keeps up with each keystroke.
  await page.locator('input[type="text"]').pressSequentially(query, { delay: 30 });
  await page.waitForTimeout(300);

  const top =
    (await page
      .locator('[role="option"]')
      .first()
      .innerText()
      .catch(() => "")) || "(no results)";
  const first = top.split("\n")[0];
  const ok = first.toLowerCase().includes(expected.toLowerCase());
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"} "${query}" -> ${first}`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
}

console.log(failures === 0 ? "\nall queries matched" : `\n${failures} query(s) failed`);
await browser.close();
