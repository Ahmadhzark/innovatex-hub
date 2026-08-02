import Fuse, { type IFuseOptions } from "fuse.js";
import { LESSONS } from "@/data/lessons";
import { HARDWARE } from "@/data/hardware";
import { PROJECTS, DIFFICULTY_LABEL } from "@/data/projects";
import { RESOURCES } from "@/data/portal";
import { FAQS } from "@/data/faq";
import type { Lang } from "@/components/providers/LanguageProvider";

export type SearchDocType = "lesson" | "component" | "project" | "resource" | "faq";

export type SearchDoc = {
  id: string;
  type: SearchDocType;
  title: string;
  subtitle: string;
  url: string;
  /** Extra terms that should match without appearing on the result card. */
  keywords: string;
};

/**
 * Where a hardware component "lives" — the lesson section a search hit
 * should deep-link to. Derived from the curriculum data itself (component
 * blocks, then hardware blocks, then a lesson's hero image) rather than
 * hand-maintained, so it can't drift out of sync as lessons change.
 */
function buildHardwareHomes(): Record<string, string> {
  const homes: Record<string, string> = {};
  const fallback: Record<string, string> = {};

  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "component" && !(block.slug in homes)) {
        homes[block.slug] = `/learn/${lesson.slug}#${block.slug}`;
      }
      if (block.type === "hardware" && !(block.slug in fallback)) {
        fallback[block.slug] = `/learn/${lesson.slug}`;
      }
    }
    if (!(lesson.hero in fallback)) fallback[lesson.hero] = `/learn/${lesson.slug}`;
  }

  return { ...fallback, ...homes };
}

const HARDWARE_HOMES = buildHardwareHomes();

/** A few common misspellings/synonyms worth catching explicitly, beyond fuzzy matching. */
const SYNONYMS: Record<string, string> = {
  esp32: "wifi bluetooth microcontroller board",
  "arduino-uno": "atmega328 microcontroller board",
  "ultrasonic-sensor": "hc-sr04 distance sonar",
  ldr: "photoresistor light sensor cds",
  "temperature-sensor": "dht11 humidity weather",
  "gas-sensor": "mq2 mq-2 smoke lpg",
  "bluetooth-module": "hc-05 wireless app control",
  "dc-motor": "wheel drive l298n",
  breadboard: "prototyping board",
  buzzer: "piezo alarm sound",
  "push-button": "switch tactile",
};

export function buildSearchDocs(lang: Lang): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const t = (b: { en: string; ta: string }) => b[lang] || b.en;

  for (const lesson of LESSONS) {
    docs.push({
      id: `lesson-${lesson.slug}`,
      type: "lesson",
      title: t(lesson.title),
      subtitle: t(lesson.subtitle),
      url: `/learn/${lesson.slug}`,
      keywords: `lesson learn academy tutorial`,
    });
  }

  for (const hw of HARDWARE) {
    docs.push({
      id: `component-${hw.slug}`,
      type: "component",
      title: hw.name,
      subtitle: t(hw.blurb),
      url: HARDWARE_HOMES[hw.slug] ?? "/learn",
      // The slug itself often carries the "plain English" name a student
      // would type (e.g. "ultrasonic-sensor" -> "ultrasonic sensor"), which
      // may not appear verbatim in a short product name like "HC-SR04".
      keywords: `${hw.category} ${hw.spec ?? ""} ${hw.slug.replace(/-/g, " ")} ${SYNONYMS[hw.slug] ?? ""}`,
    });
  }

  for (const project of PROJECTS) {
    docs.push({
      id: `project-${project.slug}`,
      type: "project",
      title: t(project.title),
      subtitle: t(project.description),
      url: `/projects#${project.slug}`,
      keywords: `project build ${DIFFICULTY_LABEL[project.difficulty].label.en} ${project.skills.join(" ")}`,
    });
  }

  RESOURCES.forEach((resource, i) => {
    docs.push({
      id: `resource-${i}`,
      type: "resource",
      title: t(resource.title),
      subtitle: t(resource.description),
      url: "/portal",
      keywords: `download resource ${resource.kind}`,
    });
  });

  for (const faq of FAQS) {
    docs.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: t(faq.question),
      subtitle: t(faq.answer),
      url: `/about#faq-${faq.id}`,
      keywords: "faq question help",
    });
  }

  return docs;
}

const FUSE_OPTIONS: IFuseOptions<SearchDoc> = {
  keys: [
    { name: "title", weight: 3 },
    { name: "subtitle", weight: 1 },
    { name: "keywords", weight: 1.5 },
  ],
  threshold: 0.38, // generous — tolerates typos like "ardino" or "ultasonic"
  distance: 60,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
};

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

/**
 * Fuse's fuzzy substring matching sometimes ranks an incidental partial
 * match (e.g. "moter" against the tail of "Potentiometer") ahead of the
 * word it's actually a typo of ("Motor"). This nudges results whose title
 * contains a whole word within edit-distance 1-2 of a single-word query
 * back to the top, without weakening fuzzy matching for anything else.
 */
function titleWordBoost(query: string, title: string): number {
  if (query.includes(" ")) return 0;
  const words = title.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  let best = Infinity;
  for (const word of words) best = Math.min(best, levenshtein(query.toLowerCase(), word));
  if (best <= 1) return -1;
  if (best <= 2) return -0.3;
  return 0;
}

export function createSearchIndex(lang: Lang) {
  const docs = buildSearchDocs(lang);
  const fuse = new Fuse(docs, FUSE_OPTIONS);
  return {
    docs,
    search: (query: string, opts?: { limit?: number }) => {
      const results = fuse.search(query, { limit: (opts?.limit ?? 8) * 2 });
      return results
        .map((r) => ({ ...r, score: (r.score ?? 0) + titleWordBoost(query, r.item.title) }))
        .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
        .slice(0, opts?.limit ?? 8);
    },
  };
}

export const TYPE_LABEL: Record<SearchDocType, { en: string; ta: string }> = {
  lesson: { en: "Lesson", ta: "பாடம்" },
  component: { en: "Component", ta: "பாகம்" },
  project: { en: "Project", ta: "திட்டம்" },
  resource: { en: "Download", ta: "பதிவிறக்கம்" },
  faq: { en: "FAQ", ta: "கேள்வி" },
};
