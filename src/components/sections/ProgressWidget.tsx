"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress, LEVELS } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * A game-like "continue where you left off" widget on the home page.
 * Reads the visitor's local, device-only progress — see src/lib/progress.ts.
 * Before hydration this renders nothing rather than a flash of zero progress.
 */
export function ProgressWidget() {
  const { t } = useLanguage();
  const { hydrated, totalXp, completedCount, totalLessons, level, nextLevel, levelProgress, nextLesson } =
    useProgress();

  if (!hydrated) return null;

  const started = completedCount > 0;

  return (
    <section className="relative -mt-8 mb-4">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <GlassCard glow="primary" interactive={false} className="overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.span
                  key={level.icon}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-2xl ring-1 ring-primary/30"
                >
                  {level.icon}
                </motion.span>
                <div>
                  <p className="mono-label">
                    {started
                      ? t({ en: "YOUR PROGRESS", ta: "உங்கள் முன்னேற்றம்" })
                      : t({ en: "START YOUR JOURNEY", ta: "உங்கள் பயணத்தைத் தொடங்குங்கள்" })}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-ink">
                    {t(level.name)}
                  </p>
                </div>
              </div>

              <Link
                href={nextLesson ? `/learn/${nextLesson.slug}` : "/learn"}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-void transition-shadow hover:shadow-[0_0_28px_-6px_var(--color-primary)]"
              >
                {started
                  ? t({ en: "Continue Learning", ta: "தொடர்ந்து கற்க" })
                  : t({ en: "Start Learning", ta: "கற்க தொடங்கு" })}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* XP bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>
                  <Counter value={totalXp} className="font-bold text-ink" /> XP
                </span>
                <span>
                  {nextLevel
                    ? `${nextLevel.threshold - totalXp} XP ${t({ en: "to", ta: "வரை" })} ${t(nextLevel.name)}`
                    : t({ en: "Max level!", ta: "அதிகபட்ச நிலை!" })}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress * 100}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Level ladder */}
            <div className="mt-5 flex items-center justify-between gap-1">
              {LEVELS.map((lvl, i) => {
                const reached = totalXp >= lvl.threshold;
                return (
                  <div key={lvl.threshold} className="flex flex-1 items-center gap-1">
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full text-xs transition-colors duration-500",
                        reached ? "bg-primary/20 ring-1 ring-primary/40" : "bg-white/5 grayscale opacity-40",
                      )}
                      title={t(lvl.name)}
                    >
                      {lvl.icon}
                    </span>
                    {i < LEVELS.length - 1 && (
                      <span
                        className={cn(
                          "h-px flex-1 transition-colors duration-500",
                          totalXp >= LEVELS[i + 1].threshold ? "bg-primary/50" : "bg-hairline",
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {completedCount === totalLessons && (
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Trophy className="size-4" />
                {t({
                  en: "Every lesson complete — you've mastered the full curriculum!",
                  ta: "ஒவ்வொரு பாடமும் முடிந்தது — முழு பாடத்திட்டத்தையும் தேர்ச்சி பெற்றுவிட்டீர்கள்!",
                })}
              </p>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
