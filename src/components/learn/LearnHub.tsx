"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Trophy } from "lucide-react";
import { getLesson } from "@/data/lessons";
import { LESSON_CATEGORIES } from "@/data/learnCategories";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function LearnHub() {
  const { t } = useLanguage();
  const { hydrated, isComplete, totalXp, completedCount, totalLessons, level, nextLesson } =
    useProgress();

  return (
    <>
      <PageHeader
        eyebrow={{ en: "LEARN ACADEMY", ta: "கற்றல் அகாடமி" }}
        title={{ en: "From zero to ESP32", ta: "பூஜ்ஜியத்திலிருந்து ESP32 வரை" }}
        description={{
          en: "Everything you need for the workshop lives here: electronics, boards, sensors, motors and code — 14 lessons, each with a self-check at the end.",
          ta: "பட்டறைக்கு தேவையான அனைத்தும் இங்கே: எலக்ட்ரானிக்ஸ், போர்டுகள், சென்சார்கள், மோட்டார்கள் மற்றும் குறியீடு.",
        }}
      >
        {/* Progress widget — only meaningful once localStorage is read */}
        <Reveal delay={0.2}>
          <div
            className={cn(
              "mx-auto flex max-w-lg flex-col items-center gap-3 rounded-2xl glass-strong p-5 transition-opacity duration-500 sm:flex-row sm:justify-between",
              hydrated ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/15 text-xl ring-1 ring-primary/30">
                {level.icon}
              </span>
              <div className="text-left">
                <p className="font-display text-sm font-bold text-ink">
                  {t(level.name)}
                </p>
                <p className="mono-label mt-0.5">
                  <Counter value={totalXp} /> XP · {completedCount}/{totalLessons}{" "}
                  {t({ en: "lessons", ta: "பாடங்கள்" })}
                </p>
              </div>
            </div>

            {nextLesson ? (
              <Link
                href={`/learn/${nextLesson.slug}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-void transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-primary)]"
              >
                {t({ en: "Continue Learning", ta: "தொடர்ந்து கற்க" })}
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                <Trophy className="size-4" />
                {t({ en: "All lessons complete!", ta: "அனைத்து பாடங்களும் முடிந்தன!" })}
              </span>
            )}
          </div>
        </Reveal>
      </PageHeader>

      {LESSON_CATEGORIES.map((category, catIndex) => {
        const lessons = category.slugs
          .map((slug) => getLesson(slug))
          .filter((l): l is NonNullable<typeof l> => Boolean(l));

        return (
          <section
            key={category.id}
            className={cn(
              "mx-auto max-w-7xl px-5 sm:px-8",
              catIndex === 0 ? "pb-16" : "py-16",
            )}
          >
            <Reveal className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mono-label mb-2">
                  {t({ en: "PART", ta: "பகுதி" })} {catIndex + 1}
                </p>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  {t(category.title)}
                </h2>
                <p className="mt-1.5 max-w-xl text-sm text-muted">
                  {t(category.description)}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson, i) => {
                const done = hydrated && isComplete(lesson.slug);
                return (
                  <Reveal key={lesson.slug} delay={(i % 3) * 0.06}>
                    <Link href={`/learn/${lesson.slug}`} className="block h-full">
                      <GlassCard glow="primary" className="flex h-full flex-col p-0">
                        <div className="relative">
                          <HardwareVisual
                            slug={lesson.hero}
                            size="sm"
                            disable3D
                            className="aspect-16/9 rounded-b-none rounded-t-3xl"
                          />
                          {done && (
                            <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-primary text-void shadow-lg">
                              <CheckCircle2 className="size-4.5" strokeWidth={2.5} />
                            </span>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center justify-between">
                            <span className="mono-label">
                              {String(lesson.order).padStart(2, "0")}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                              <Clock className="size-3.5" />
                              {lesson.duration} min
                            </span>
                          </div>

                          <h3 className="mt-2 font-display text-xl font-bold">
                            {t(lesson.title)}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                            {t(lesson.subtitle)}
                          </p>

                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                            {done
                              ? t({ en: "Review lesson", ta: "பாடத்தை மறுபார்வையிடு" })
                              : t({ en: "Start lesson", ta: "பாடத்தை தொடங்கு" })}
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </GlassCard>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
