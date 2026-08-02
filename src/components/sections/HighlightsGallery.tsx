"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";
import { HIGHLIGHTS } from "@/data/highlights";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset, cn } from "@/lib/utils";

const INTERVAL = 5000;
const SWIPE_THRESHOLD = 60;

/**
 * The hero's workshop gallery: a self-advancing slideshow of real photos
 * from the programme, with a slow Ken Burns drift so a still image never
 * feels static. Driven entirely by src/data/highlights.ts.
 */
export function HighlightsGallery() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = HIGHLIGHTS.length;

  const go = useCallback(
    (next: number, dir: number) => {
      if (count === 0) return;
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const previous = useCallback(() => go(index - 1, -1), [go, index]);

  // Autoplay. Skipped entirely for a single photo, while paused, or when the
  // visitor has asked for reduced motion.
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(next, INTERVAL);
    return () => clearTimeout(timer);
  }, [count, paused, next, index]);

  if (count === 0) return <EmptyState />;

  const current = HIGHLIGHTS[index];

  return (
    <div
      className="group/gallery relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Glow bed, matching the board treatment this replaces */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-6 top-10 rounded-[3rem] bg-primary/18 blur-[80px]"
      />

      <div
        className="relative aspect-16/10 overflow-hidden rounded-[1.75rem] bg-[#080d1a] shadow-2xl shadow-black/60 ring-1 ring-white/10"
        role="region"
        aria-roledescription="carousel"
        aria-label={t({ en: "Workshop highlights", ta: "பட்டறை சிறப்பம்சங்கள்" })}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.file}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) next();
              else if (info.offset.x > SWIPE_THRESHOLD) previous();
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Ken Burns: a slow push-in that restarts with each slide. */}
            <motion.img
              src={asset(`images/highlights/${current.file}`)}
              alt={t(current.caption)}
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
              initial={{ scale: 1.04 }}
              animate={{ scale: 1.14 }}
              transition={{ duration: INTERVAL / 1000 + 2, ease: "linear" }}
              className="size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-7">
              {current.meta && <p className="mono-label mb-1.5">{current.meta}</p>}
              <p className="font-display text-base font-semibold text-ink sm:text-lg">
                {t(current.caption)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <GalleryArrow side="left" onClick={previous} />
            <GalleryArrow side="right" onClick={next} />
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {HIGHLIGHTS.map((highlight, i) => (
            <button
              key={highlight.file}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`${t({ en: "Go to photo", ta: "படத்திற்குச் செல்" })} ${i + 1}`}
              aria-current={i === index}
              // A generous invisible hit area around a small visible dot.
              className="grid h-11 w-6 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-400",
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-white/25 hover:bg-white/50",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        side === "left"
          ? t({ en: "Previous photo", ta: "முந்தைய படம்" })
          : t({ en: "Next photo", ta: "அடுத்த படம்" })
      }
      className={cn(
        "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full",
        "glass-strong text-ink transition-all duration-300 hover:border-primary/40",
        // Always reachable on touch; fades in on pointer devices.
        "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/gallery:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}

function EmptyState() {
  const { t } = useLanguage();
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-6 top-10 rounded-[3rem] bg-primary/12 blur-[80px]"
      />
      <div className="relative grid aspect-16/10 place-items-center rounded-[1.75rem] border border-dashed border-hairline-strong bg-[#080d1a] px-6 text-center ring-1 ring-white/5">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/12 ring-1 ring-primary/25">
            <ImagePlus className="size-6 text-primary" />
          </span>
          <p className="mt-5 font-display text-lg font-bold text-ink">
            {t({ en: "Workshop photos coming soon", ta: "பட்டறை புகைப்படங்கள் விரைவில்" })}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {t({
              en: "Highlights from the sessions — students building, teams testing, and final robot demos — will appear here.",
              ta: "அமர்வுகளின் சிறப்பம்சங்கள் — மாணவர்கள் கட்டமைப்பது, குழுக்கள் சோதிப்பது, இறுதி ரோபோ ஆர்ப்பாட்டங்கள் — இங்கே தோன்றும்.",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
