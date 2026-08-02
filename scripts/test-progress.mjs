/**
 * Dev-only progress/XP smoke test.
 *
 *   node scripts/test-progress.mjs
 *
 * Completes a lesson quiz in a real browser and checks that XP is awarded,
 * persists across a reload, and shows up on the home page widget.
 */

import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

// 1. Complete a quiz
await page.goto("http://localhost:3000/learn/electricity/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);

const optionCount = await page.locator('label:has(input[type="radio"])').count();
console.log("quiz options found:", optionCount);

// Pick the first option of each question.
const questions = await page.locator("fieldset, [data-question]").count();
const radios = page.locator('input[type="radio"]');
const total = await radios.count();
const seen = new Set();
for (let i = 0; i < total; i++) {
  const name = await radios.nth(i).getAttribute("name");
  if (seen.has(name)) continue;
  seen.add(name);
  await radios.nth(i).click({ force: true });
}
console.log("answered question groups:", seen.size);

await page.getByRole("button", { name: /check my answers|பதில்களை/i }).click();
await page.waitForTimeout(700);

const xpBanner = await page
  .locator("text=/\\+\\d+ XP/")
  .first()
  .innerText()
  .catch(() => "(no XP banner)");
console.log("XP banner:", xpBanner);

// 2. Persists across reload
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(700);
const completedBadge = await page
  .locator("text=/Completed|முடிந்தது/")
  .first()
  .isVisible()
  .catch(() => false);
console.log("lesson shows Completed after reload:", completedBadge);

// 3. Home widget reflects it
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const widget = page
  .locator("section", { hasText: /YOUR PROGRESS|START YOUR JOURNEY/ })
  .first();
const visible = await widget.isVisible().catch(() => false);

// The XP figure counts up only once scrolled into view, so scroll then settle.
await widget.scrollIntoViewIfNeeded();
await page.waitForTimeout(2500);
const xpText = (await widget.innerText()).match(/\d+ XP/)?.[0] ?? "(none)";
console.log("home widget shows progress:", visible, "| XP:", xpText);

console.log("console errors:", errors.length ? errors.slice(0, 3) : "none");
await browser.close();
