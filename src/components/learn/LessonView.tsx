"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { LESSONS, type Lesson } from "@/data/lessons";
import { LessonBlockView } from "./LessonBlocks";
import { LessonQuiz } from "./LessonQuiz";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const { t } = useLanguage();

  const index = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const previous = index > 0 ? LESSONS[index - 1] : null;
  const next = index < LESSONS.length - 1 ? LESSONS[index + 1] : null;

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden pt-36 pb-10 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 size-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/learn"
            className="-mx-2 -my-2 inline-flex min-h-11 items-center gap-1.5 px-2 py-2 text-sm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {t({ en: "Learn Academy", ta: "கற்றல் அகாடமி" })}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="mono-label">
              {t({ en: "LESSON", ta: "பாடம்" })}{" "}
              {String(lesson.order).padStart(2, "0")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-faint">
              <Clock className="size-3.5" />
              {lesson.duration} min
            </span>
          </div>

          <h1 className="mt-4 text-[clamp(2.25rem,6vw,3.75rem)] font-bold">
            {t(lesson.title)}
          </h1>
          <p className="mt-4 text-lg text-muted">{t(lesson.subtitle)}</p>
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal blur={false}>
          <HardwareVisual
            slug={lesson.hero}
            priority
            className="aspect-16/9 rounded-3xl ring-1 ring-white/10"
          />
        </Reveal>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-5 py-4 sm:px-8">
        {lesson.blocks.map((block, i) => (
          <LessonBlockView key={i} block={block} />
        ))}
      </div>

      {/* Quiz */}
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <LessonQuiz questions={lesson.quiz} />
      </div>

      {/* Prev / next */}
      <nav className="mx-auto max-w-3xl px-5 pb-12 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/learn/${previous.slug}`}
              className="group rounded-2xl glass p-5 transition-colors hover:border-primary/40"
            >
              <span className="mono-label">
                {t({ en: "PREVIOUS", ta: "முந்தையது" })}
              </span>
              <p className="mt-1.5 flex items-center gap-2 font-display font-semibold text-ink">
                <ArrowLeft className="size-4 text-primary transition-transform group-hover:-translate-x-1" />
                {t(previous.title)}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/learn/${next.slug}`}
              className="group rounded-2xl glass p-5 text-right transition-colors hover:border-primary/40 sm:col-start-2"
            >
              <span className="mono-label">
                {t({ en: "NEXT", ta: "அடுத்தது" })}
              </span>
              <p className="mt-1.5 flex items-center justify-end gap-2 font-display font-semibold text-ink">
                {t(next.title)}
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
