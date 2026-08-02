/**
 * Dev-only mobile audit.
 *
 *   node scripts/audit-mobile.mjs
 *
 * For each route at a phone viewport it reports:
 *   - horizontal overflow (the #1 mobile bug) and which element causes it
 *   - any tap target smaller than 44x44 CSS px
 *   - text smaller than 12px
 *   - console errors
 */

import { chromium } from "playwright";

const ROUTES = [
  "/",
  "/learn/",
  "/learn/electricity/",
  "/learn/motion-distance-sensors/",
  "/learn/outputs-actuators/",
  "/learn/uploading-code/",
  "/weeks/",
  "/weeks/1/",
  "/weeks/3/",
  "/portal/",
  "/projects/",
  "/team/",
  "/about/",
  "/gallery/",
  "/register/",
];

// iPhone SE is the narrowest phone worth supporting.
const WIDTH = Number(process.argv[2] ?? 375);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: WIDTH, height: 780 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});

let totalProblems = 0;

for (const route of ROUTES) {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 120));
  });

  await page.goto(`http://localhost:3000${route}`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(900);

  const report = await page.evaluate(async (viewportWidth) => {
    // The only thing that matters is whether the page actually scrolls
    // sideways — not whether some decorative element's box extends past the
    // viewport (that's routinely clipped by an ancestor's overflow-hidden,
    // e.g. background blobs, and is not a bug).
    const startX = window.scrollX;
    window.scrollTo(viewportWidth, 0);
    await new Promise((r) => setTimeout(r, 60));
    const reachedX = window.scrollX;
    window.scrollTo(startX, window.scrollY);
    const docWidth = reachedX > 0 ? document.documentElement.scrollWidth : viewportWidth;

    const overflowing = [];
    if (reachedX > 0) {
      // Only walk the DOM for a culprit when a real scroll was confirmed.
      const isClipped = (el) => {
        let node = el.parentElement;
        while (node && node !== document.body) {
          const s = getComputedStyle(node);
          if (s.overflowX !== "visible") return true;
          node = node.parentElement;
        }
        return false;
      };
      for (const el of document.querySelectorAll("body *")) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        if (rect.right <= viewportWidth + 1.5 && rect.left >= -1.5) continue;
        if (isClipped(el)) continue;
        overflowing.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} ` +
            `[${Math.round(rect.left)}→${Math.round(rect.right)}]`,
        );
        if (overflowing.length > 6) break;
      }
    }

    // Tap targets below the 44px accessibility minimum.
    const smallTargets = [];
    for (const el of document.querySelectorAll(
      "a, button, input, select, [role=button]",
    )) {
      // Visually-hidden inputs (e.g. sr-only radios behind a styled label)
      // aren't the real tap target — the label wrapping them is.
      if (el.className && String(el.className).includes("sr-only")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.height < 44 || rect.width < 24) {
        smallTargets.push(
          `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 22)}" ` +
            `${Math.round(rect.width)}x${Math.round(rect.height)}`,
        );
      }
      if (smallTargets.length > 8) break;
    }

    // Text too small to read comfortably on a phone.
    const tinyText = new Set();
    for (const el of document.querySelectorAll("p, span, li, a, td, th")) {
      if (!el.textContent?.trim()) continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size && size < 11.5) {
        tinyText.add(`${size}px "${el.textContent.trim().slice(0, 28)}"`);
      }
      if (tinyText.size > 5) break;
    }

    return {
      docWidth,
      overflowing,
      smallTargets,
      tinyText: [...tinyText],
    };
  }, WIDTH);

  const overflows = report.overflowing.length > 0 || report.docWidth > WIDTH + 1;
  const problems =
    (overflows ? 1 : 0) +
    report.overflowing.length +
    report.smallTargets.length +
    report.tinyText.length +
    errors.length;
  totalProblems += problems;

  const status = problems === 0 ? "OK  " : "WARN";
  console.log(
    `${status} ${route.padEnd(24)} doc=${report.docWidth}px${overflows ? "  ← SCROLLS SIDEWAYS" : ""}`,
  );

  if (report.overflowing.length) {
    console.log("      overflow:");
    report.overflowing.forEach((o) => console.log("        -", o));
  }
  if (report.smallTargets.length) {
    console.log("      small tap targets:");
    report.smallTargets.forEach((s) => console.log("        -", s));
  }
  if (report.tinyText.length) {
    console.log("      tiny text:");
    report.tinyText.forEach((s) => console.log("        -", s));
  }
  if (errors.length) {
    console.log("      console:");
    errors.slice(0, 3).forEach((e) => console.log("        -", e));
  }

  await page.close();
}

console.log(
  `\n${totalProblems === 0 ? "clean" : `${totalProblems} issue(s) found`} at ${WIDTH}px`,
);

await browser.close();
