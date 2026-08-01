import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width:375,height:780}, isMobile:true, hasTouch:true });
await page.goto("http://localhost:3000/", { waitUntil:"networkidle" });
await page.waitForTimeout(1200);
const r = await page.evaluate(async () => {
  window.scrollTo(500, 0);
  await new Promise(res=>setTimeout(res,300));
  const after = window.scrollX;
  window.scrollTo(0,0);
  return {
    after,
    canScrollSideways: after > 0,
    htmlScrollW: document.documentElement.scrollWidth,
    htmlClientW: document.documentElement.clientWidth,
    bodyScrollW: document.body.scrollWidth,
    bodyClientW: document.body.clientWidth,
    htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
  };
});
console.log(r);
await browser.close();
