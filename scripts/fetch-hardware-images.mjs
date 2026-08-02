/**
 * Sources real, freely-licensed electronics photography from Wikimedia Commons.
 *
 *   node scripts/fetch-hardware-images.mjs
 *
 * Writes JPEGs to  public/images/hardware/
 * Writes credits to src/data/image-credits.json  (rendered on /about#credits)
 *
 * Re-run any time; existing files are skipped unless you pass --force.
 */

import { writeFile, mkdir, readFile, access, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const OUT_DIR = path.join(process.cwd(), "public", "images", "hardware");
const CREDITS_FILE = path.join(process.cwd(), "src", "data", "image-credits.json");
const FORCE = process.argv.includes("--force");

/** `--only=slug-a,slug-b` limits the run to specific components. */
const ONLY = (() => {
  const flag = process.argv.find((arg) => arg.startsWith("--only="));
  if (!flag) return null;
  return new Set(flag.slice("--only=".length).split(",").map((s) => s.trim()));
})();

/**
 * slug        -> local filename (public/images/hardware/<slug>.jpg)
 * candidates  -> exact Commons "File:" titles, tried in order.
 *                Exact titles beat search: we get the photo we actually vetted.
 */
const TARGETS = [
  { slug: "arduino-uno", candidates: ["File:Arduino Uno board.jpg", "File:Arduino Uno - R3.jpg"], search: "Arduino Uno board" },
  { slug: "arduino-nano", candidates: ["File:Arduino Nano.jpg"], search: "Arduino Nano board" },
  { slug: "esp32", candidates: ["File:ESP32 Dev Board.jpg"], search: "ESP32 development board" },
  { slug: "raspberry-pi-pico", candidates: [], search: "Raspberry Pi Pico" },
  { slug: "breadboard", candidates: ["File:Electronics-White-Breadboard.jpg", "File:400 points breadboard.jpg"], search: "solderless breadboard electronics" },
  { slug: "jumper-wires", candidates: [], search: "jumper wire dupont electronics" },
  { slug: "led", candidates: ["File:RBG-LED.jpg"], search: "light emitting diode 5mm" },
  { slug: "resistor", candidates: ["File:Resistors.jpg"], search: "axial resistors electronic" },
  { slug: "capacitor", candidates: ["File:Electronic-Component-Ceramic-Capacitor.jpg"], search: "ceramic capacitor electronic component" },
  { slug: "servo-motor", candidates: [], search: "hobby servo motor" },
  { slug: "dc-motor", candidates: ["File:Dc motors.jpg"], search: "brushed DC motor toy" },
  { slug: "stepper-motor", candidates: [], search: "stepper motor nema" },
  { slug: "ultrasonic-sensor", candidates: [], search: "HC-SR04 ultrasonic sensor" },
  { slug: "ir-sensor", candidates: [], search: "infrared sensor module arduino" },
  { slug: "pir-sensor", candidates: [], search: "PIR motion sensor module" },
  { slug: "temperature-sensor", candidates: [], search: "DHT11 temperature humidity sensor" },
  { slug: "gas-sensor", candidates: [], search: "MQ gas sensor module" },
  { slug: "bluetooth-module", candidates: [], search: "HC-05 bluetooth module" },
  { slug: "lcd-display", candidates: [], search: "character LCD display module" },
  { slug: "oled-display", candidates: [], search: "OLED display module SSD1306" },
  { slug: "relay-module", candidates: [], search: "relay module arduino" },
  { slug: "motor-driver", candidates: [], search: "L298N motor driver module" },
  { slug: "pcb", candidates: [], search: "printed circuit board closeup" },
  { slug: "soldering", candidates: [], search: "soldering iron electronics" },
  { slug: "multimeter", candidates: [], search: "digital multimeter" },
  { slug: "oscilloscope", candidates: [], search: "digital oscilloscope" },
  { slug: "robot-chassis", candidates: [], search: "mobile robot chassis wheels" },
  { slug: "battery-pack", candidates: ["File:6x AA battery holder with DC plug.jpg"], search: "AA battery holder" },

  /* ---- Full beginner curriculum additions ---- */
  { slug: "rgb-led", candidates: [], search: "RGB LED diode" },
  { slug: "push-button", candidates: [], search: "tactile push button switch electronics" },
  { slug: "buzzer", candidates: [], search: "piezo buzzer electronic component" },
  { slug: "potentiometer", candidates: [], search: "potentiometer knob electronic component" },
  { slug: "ldr", candidates: [], search: "photoresistor LDR light dependent resistor" },
  { slug: "sound-sensor", candidates: [], search: "sound detection sensor module" },
  { slug: "flame-sensor", candidates: [], search: "flame sensor module infrared" },
  { slug: "soil-moisture-sensor", candidates: [], search: "soil moisture sensor probe" },
  { slug: "rain-sensor", candidates: [], search: "rain drop sensor module" },
];

/** Strip the HTML Commons returns in extmetadata fields. */
function stripHtml(value) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Node's built-in fetch (undici) cannot reach the network in some sandboxed
 * environments where curl can, so all HTTP goes through curl.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      const { stdout } = await execFileAsync(
        "curl",
        ["-sS", "-L", "--max-time", "40", "-A", UA, url],
        { maxBuffer: 20 * 1024 * 1024 },
      );
      return JSON.parse(stdout);
    } catch (error) {
      lastError = error;
      // Back off before retrying — Commons rate-limits bursts of queries.
      await sleep(800 * (i + 1));
    }
  }
  throw lastError;
}

/** Resolve one exact Commons file title to {thumburl, license, artist, page}. */
async function resolveTitle(title) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      format: "json",
      titles: title,
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1400",
    });

  const json = await fetchJson(url);
  const pages = json?.query?.pages ?? {};
  for (const key of Object.keys(pages)) {
    if (key === "-1") continue; // page missing
    const page = pages[key];
    const info = page?.imageinfo?.[0];
    if (!info?.thumburl) continue;
    const meta = info.extmetadata ?? {};
    return {
      title: page.title,
      url: info.thumburl,
      descriptionUrl: info.descriptionurl,
      license: stripHtml(meta.LicenseShortName?.value) || "See source",
      artist: stripHtml(meta.Artist?.value) || "Unknown",
    };
  }
  return null;
}

/**
 * Fallback when no exact title matches: search Commons and take the first
 * result that is a real photo (jpg/png, wide enough to use as a hero image).
 */
async function searchCommons(term) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: `${term} filetype:bitmap`,
      gsrnamespace: "6",
      gsrlimit: "12",
      prop: "imageinfo",
      iiprop: "url|size|extmetadata",
      iiurlwidth: "1400",
    });

  const json = await fetchJson(url);
  const pages = Object.values(json?.query?.pages ?? {});

  // Prefer larger, landscape-ish photos; skip diagrams and tiny icons.
  const candidates = pages
    .map((page) => ({ page, info: page?.imageinfo?.[0] }))
    .filter(({ page, info }) => {
      if (!info?.thumburl) return false;
      if (!/\.(jpe?g|png)$/i.test(page.title)) return false;
      if (info.width < 700) return false;
      if (/\b(diagram|schematic|logo|icon|drawing|svg)\b/i.test(page.title)) return false;
      return true;
    })
    .sort((a, b) => b.info.width * b.info.height - a.info.width * a.info.height);

  const best = candidates[0];
  if (!best) return null;

  const meta = best.info.extmetadata ?? {};
  return {
    title: best.page.title,
    url: best.info.thumburl,
    descriptionUrl: best.info.descriptionurl,
    license: stripHtml(meta.LicenseShortName?.value) || "See source",
    artist: stripHtml(meta.Artist?.value) || "Unknown",
  };
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  await execFileAsync(
    "curl",
    ["-sS", "-L", "--max-time", "60", "-A", UA, "-o", dest, url],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  const { size } = await stat(dest);
  if (size < 8000) throw new Error(`suspiciously small (${size}b)`);
  return size;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let credits = {};
  try {
    credits = JSON.parse(await readFile(CREDITS_FILE, "utf8"));
  } catch {
    credits = {};
  }

  let ok = 0;
  let skipped = 0;
  let failed = [];

  for (const target of TARGETS) {
    if (ONLY && !ONLY.has(target.slug)) continue;

    const dest = path.join(OUT_DIR, `${target.slug}.jpg`);

    if (!FORCE && (await exists(dest)) && credits[target.slug]) {
      console.log(`skip  ${target.slug}`);
      skipped++;
      continue;
    }

    let done = false;
    for (const candidate of target.candidates) {
      try {
        const info = await resolveTitle(candidate);
        if (!info) continue;

        const bytes = await download(info.url, dest);
        credits[target.slug] = {
          title: info.title,
          artist: info.artist,
          license: info.license,
          source: info.descriptionUrl,
        };
        console.log(
          `ok    ${target.slug}  <- ${info.title}  [${info.license}]  ${(bytes / 1024).toFixed(0)}KB`,
        );
        ok++;
        done = true;
        break;
      } catch (error) {
        // Try the next candidate title.
        void error;
      }
    }

    // Exact titles missed — fall back to searching Commons.
    if (!done && target.search) {
      try {
        await sleep(1500); // be polite between search queries
        const info = await searchCommons(target.search);
        if (info) {
          const bytes = await download(info.url, dest);
          credits[target.slug] = {
            title: info.title,
            artist: info.artist,
            license: info.license,
            source: info.descriptionUrl,
          };
          console.log(
            `ok*   ${target.slug}  <- ${info.title}  [${info.license}]  ${(bytes / 1024).toFixed(0)}KB`,
          );
          ok++;
          done = true;
        }
      } catch (error) {
        console.log(`      search failed: ${error?.message ?? error}`);
      }
    }

    if (!done) {
      console.log(`MISS  ${target.slug}  (no candidate resolved)`);
      failed.push(target.slug);
    }
  }

  await mkdir(path.dirname(CREDITS_FILE), { recursive: true });
  await writeFile(CREDITS_FILE, JSON.stringify(credits, null, 2) + "\n");

  console.log(
    `\ndownloaded ${ok} · skipped ${skipped} · missing ${failed.length}` +
      (failed.length ? `\nmissing: ${failed.join(", ")}` : ""),
  );
  console.log(`credits -> ${path.relative(process.cwd(), CREDITS_FILE)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
