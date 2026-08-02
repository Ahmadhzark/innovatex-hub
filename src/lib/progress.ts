"use client";

import { useCallback, useSyncExternalStore } from "react";
import { LESSONS } from "@/data/lessons";

/**
 * Learning progress, entirely local to the visitor's device.
 *
 * Nothing here is sent anywhere or tied to an identity — it's a
 * localStorage record of which lessons this browser has completed, used
 * only to draw progress bars and a "continue learning" shortcut. Clearing
 * browser data resets it, exactly like any other local preference.
 *
 * localStorage is an external store, so it's read through
 * useSyncExternalStore: the server snapshot is empty, the client snapshot is
 * the real value, and React handles the hydration handoff without a mismatch.
 */

const STORAGE_KEY = "innovatex-progress";

export type ProgressState = {
  /** lesson slug -> XP awarded for that completion (60-100) */
  completed: Record<string, number>;
};

export type Level = {
  name: { en: string; ta: string };
  threshold: number;
  icon: string;
};

/** Five levels spread across the ~1250 XP available from all 14 lessons. */
export const LEVELS: Level[] = [
  { name: { en: "Spark", ta: "தீப்பொறி" }, threshold: 0, icon: "⚡" },
  { name: { en: "Circuit Builder", ta: "சுற்று கட்டமைப்பாளர்" }, threshold: 180, icon: "🔧" },
  { name: { en: "Signal Reader", ta: "சிக்னல் வாசகர்" }, threshold: 450, icon: "📡" },
  { name: { en: "System Architect", ta: "அமைப்பு கட்டிடக்கலைஞர்" }, threshold: 780, icon: "🧠" },
  { name: { en: "Innovator", ta: "கண்டுபிடிப்பாளர்" }, threshold: 1100, icon: "🚀" },
];

const EMPTY: ProgressState = { completed: {} };

const listeners = new Set<() => void>();

// useSyncExternalStore requires a stable snapshot reference between reads, so
// the parsed value is cached and only re-parsed when the raw string changes.
let cachedRaw: string | null = null;
let cachedState: ProgressState = EMPTY;

function parse(raw: string | null): ProgressState {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.completed) {
      return parsed as ProgressState;
    }
  } catch {
    // Corrupt or hand-edited value — fall back to a clean slate.
  }
  return EMPTY;
}

function getSnapshot(): ProgressState {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedState = parse(raw);
  }
  return cachedState;
}

function getServerSnapshot(): ProgressState {
  return EMPTY;
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // `storage` only fires in *other* tabs, which is exactly what it's for here;
  // same-tab writes notify through emit() in markComplete.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function getLevelForXp(xp: number): {
  level: Level;
  index: number;
  next: Level | null;
  progress: number;
} {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].threshold) index = i;
  }
  const level = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const progress = next
    ? (xp - level.threshold) / (next.threshold - level.threshold)
    : 1;
  return { level, index, next, progress: Math.min(1, Math.max(0, progress)) };
}

/** The first lesson (in curriculum order) that hasn't been completed yet. */
export function getNextLesson(completed: Record<string, number>) {
  const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
  return sorted.find((lesson) => !(lesson.slug in completed)) ?? null;
}

/** Awards XP for a lesson, keeping the best score if it's retaken. */
export function markLessonComplete(slug: string, xp: number) {
  const current = getSnapshot();
  const existing = current.completed[slug] ?? 0;
  const next: ProgressState = {
    completed: { ...current.completed, [slug]: Math.max(existing, xp) },
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function useProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useIsHydrated();

  const markComplete = useCallback((slug: string, xp: number) => {
    markLessonComplete(slug, xp);
  }, []);

  const totalXp = Object.values(state.completed).reduce((sum, xp) => sum + xp, 0);
  const completedCount = Object.keys(state.completed).length;
  const { level, next, progress } = getLevelForXp(totalXp);

  return {
    hydrated,
    completed: state.completed,
    isComplete: (slug: string) => slug in state.completed,
    markComplete,
    totalXp,
    completedCount,
    totalLessons: LESSONS.length,
    level,
    nextLevel: next,
    levelProgress: progress,
    nextLesson: getNextLesson(state.completed),
  };
}
