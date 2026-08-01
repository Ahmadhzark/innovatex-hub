/** Dev-only: finds the element actually widening the document. */
import { chromium } from "playwright";

const route = process.argv[2] ?? "/";
const width = Number(process.argv[3] ?? 375);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 780 },
  isMobile: true,
  hasTouch: true,
});
await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const result = await page.evaluate((vw) => {
  const doc = document.documentElement.scrollWidth;

  // Walk the tree; report only elements that are NOT clipped by an
  // overflow-hidden/auto ancestor, since those are the ones that can
  // actually widen the document.
  const culprits = [];
  const isClipped = (el) => {
    let node = el.parentElement;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      if (s.overflowX !== "visible") return true;
      node = node.parentElement;
    }
    return false;
  };

  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right <= vw + 1 && r.left >= -1) continue;
    if (isClipped(el)) continue;
    culprits.push({
      tag: el.tagName.toLowerCase(),
      cls: String(el.className).slice(0, 80),
      left: Math.round(r.left),
      right: Math.round(r.right),
    });
    if (culprits.length > 10) break;
  }

  return { doc, vw, culprits };
}, width);

console.log(`route ${route} @ ${result.vw}px -> document ${result.doc}px`);
if (result.doc <= result.vw + 1) {
  console.log("no horizontal scroll");
} else {
  console.log("unclipped elements past the viewport:");
  result.culprits.forEach((c) =>
    console.log(`  ${c.tag}.${c.cls}  [${c.left} → ${c.right}]`),
  );
}

await browser.close();
