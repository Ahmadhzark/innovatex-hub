"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Sparkles } from "lucide-react";
import type { QuizQuestion } from "@/data/lessons";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress, getLevelForXp } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * A self-check quiz. Answers are marked instantly in the browser and nothing
 * is stored or transmitted — this is practice, not assessment. Graded quizzes
 * live on the weekly pages as Google Forms.
 *
 * Finishing one — at any score — marks the lesson complete in the visitor's
 * local, device-only progress tracker and awards XP scaled by how many
 * answers were right (60-100), which is what powers the level system.
 */
export function LessonQuiz({
  questions,
  lessonSlug,
}: {
  questions: QuizQuestion[];
  lessonSlug: string;
}) {
  const { t } = useLanguage();
  const { markComplete, isComplete, totalXp } = useProgress();
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [leveledUp, setLeveledUp] = useState(false);
  // What this attempt earned. Held separately because marking the lesson
  // complete flips isComplete() to true synchronously, so it can't also be
  // used to decide whether to congratulate the visitor for this attempt.
  const [earned, setEarned] = useState<number | null>(null);

  const answeredAll = Object.keys(picked).length === questions.length;
  const score = questions.reduce(
    (total, question, i) => total + (picked[i] === question.answer ? 1 : 0),
    0,
  );
  const xpAwarded = Math.round(60 + (score / questions.length) * 40);

  // Awarding XP is the direct result of pressing "check", so it happens in
  // the handler rather than an effect watching `checked`.
  const check = () => {
    setChecked(true);
    if (isComplete(lessonSlug)) return;
    const before = getLevelForXp(totalXp).index;
    const after = getLevelForXp(totalXp + xpAwarded).index;
    setLeveledUp(after > before);
    setEarned(xpAwarded);
    markComplete(lessonSlug, xpAwarded);
  };

  const reset = () => {
    setPicked({});
    setChecked(false);
    setLeveledUp(false);
    setEarned(null);
  };

  return (
    <div className="rounded-3xl glass-strong p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-bold sm:text-2xl">
          {t({ en: "Quick self-check", ta: "விரைவு சுயதேர்வு" })}
        </h3>
        <span className="mono-label">
          {questions.length} {t({ en: "questions", ta: "கேள்விகள்" })}
        </span>
      </div>

      <div className="mt-7 flex flex-col gap-7">
        {questions.map((question, qi) => {
          const choice = picked[qi];
          const correct = choice === question.answer;

          return (
            <fieldset key={qi} className="border-0 p-0">
              <legend className="font-medium text-ink">
                <span className="mr-2 font-mono text-xs text-primary">
                  {String(qi + 1).padStart(2, "0")}
                </span>
                {t(question.question)}
              </legend>

              <div className="mt-3 flex flex-col gap-2">
                {question.options.map((option, oi) => {
                  const selected = choice === oi;
                  const isAnswer = question.answer === oi;

                  // After checking, mark the right answer green and a wrong
                  // pick red; before checking, only show the selection.
                  const state = !checked
                    ? selected
                      ? "selected"
                      : "idle"
                    : isAnswer
                      ? "correct"
                      : selected
                        ? "wrong"
                        : "idle";

                  return (
                    <label
                      key={oi}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors duration-200",
                        state === "idle" && "border-hairline text-muted hover:border-hairline-strong",
                        state === "selected" && "border-primary/50 bg-primary/8 text-ink",
                        state === "correct" && "border-primary/60 bg-primary/12 text-ink",
                        state === "wrong" && "border-red-400/50 bg-red-400/10 text-ink",
                      )}
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        className="sr-only"
                        checked={selected}
                        onChange={() => {
                          if (checked) return;
                          setPicked((prev) => ({ ...prev, [qi]: oi }));
                        }}
                      />
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border",
                          state === "correct" && "border-primary bg-primary text-void",
                          state === "wrong" && "border-red-400 bg-red-400 text-void",
                          state === "selected" && "border-primary",
                          state === "idle" && "border-hairline-strong",
                        )}
                      >
                        {checked && isAnswer && <Check className="size-3" strokeWidth={3} />}
                        {checked && state === "wrong" && <X className="size-3" strokeWidth={3} />}
                        {!checked && selected && (
                          <span className="size-2 rounded-full bg-primary" />
                        )}
                      </span>
                      {t(option)}
                    </label>
                  );
                })}
              </div>

              <AnimatePresence>
                {checked && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn(
                      "mt-2.5 overflow-hidden text-xs leading-relaxed",
                      correct ? "text-primary" : "text-orange-300",
                    )}
                  >
                    {correct
                      ? t({ en: "Correct — ", ta: "சரி — " })
                      : t({ en: "Not quite — ", ta: "சரியில்லை — " })}
                    {t(question.explanation)}
                  </motion.p>
                )}
              </AnimatePresence>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button
            type="button"
            disabled={!answeredAll}
            onClick={check}
            className={cn(
              "rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
              answeredAll
                ? "bg-primary text-void hover:shadow-[0_0_30px_-6px_var(--color-primary)]"
                : "cursor-not-allowed glass text-faint",
            )}
          >
            {answeredAll
              ? t({ en: "Check my answers", ta: "பதில்களை சரிபார்" })
              : t({
                  en: `Answer all ${questions.length} questions`,
                  ta: `${questions.length} கேள்விகளுக்கும் பதிலளிக்கவும்`,
                })}
          </button>
        ) : (
          <>
            <p className="font-display text-lg font-bold text-ink">
              {t({ en: "Score", ta: "மதிப்பெண்" })}:{" "}
              <span className="font-mono text-primary">
                {score}/{questions.length}
              </span>
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-full glass px-5 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
            >
              <RotateCcw className="size-3.5" />
              {t({ en: "Try again", ta: "மீண்டும் முயற்சி" })}
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {checked && earned !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/8 p-4"
          >
            <Sparkles className="size-5 shrink-0 text-primary" />
            <p className="text-sm text-ink">
              <span className="font-mono font-bold text-primary">
                +{earned} XP
              </span>{" "}
              {leveledUp
                ? t({
                    en: "— lesson complete, and you've reached a new level! Check your progress on the home page.",
                    ta: "— பாடம் முடிந்தது, புதிய நிலையை அடைந்துவிட்டீர்கள்! முகப்பு பக்கத்தில் உங்கள் முன்னேற்றத்தைப் பாருங்கள்.",
                  })
                : t({ en: "— lesson marked complete.", ta: "— பாடம் முடிந்ததாகக் குறிக்கப்பட்டது." })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
