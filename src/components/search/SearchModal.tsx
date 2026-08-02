"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { FuseResultMatch } from "fuse.js";
import {
  BookOpen,
  Cpu,
  Download,
  HelpCircle,
  Search,
  Wrench,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  createSearchIndex,
  TYPE_LABEL,
  type SearchDoc,
  type SearchDocType,
} from "@/lib/search";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<SearchDocType, typeof BookOpen> = {
  lesson: BookOpen,
  component: Cpu,
  project: Wrench,
  resource: Download,
  faq: HelpCircle,
};

/** Wraps the ranges Fuse matched in <mark>, for the title field only. */
function Highlighted({
  text,
  matches,
}: {
  text: string;
  matches?: readonly FuseResultMatch[];
}) {
  const titleMatch = matches?.find((m) => m.key === "title");
  if (!titleMatch || titleMatch.indices.length === 0) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  titleMatch.indices.forEach(([start, end], i) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={i} className="rounded-sm bg-primary/25 text-primary">
        {text.slice(start, end + 1)}
      </mark>,
    );
    cursor = end + 1;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

/**
 * The search overlay.
 *
 * The panel's own state lives in SearchPanel below, which is mounted only
 * while `open` — so the query and selection reset on close by unmounting,
 * with no effect needed to clear them.
 */
export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && <SearchPanel onClose={onClose} />}
    </AnimatePresence>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { search } = useMemo(() => createSearchIndex(lang), [lang]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return search(query, { limit: 8 });
  }, [search, query]);

  // Focus on mount — no state involved, so this is a genuine effect.
  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  const onQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const go = (doc: SearchDoc) => {
    router.push(doc.url);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-60 flex items-start justify-center bg-void/80 backdrop-blur-sm px-4 pt-[12vh] sm:pt-[16vh]"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl overflow-hidden rounded-2xl glass-strong shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t({ en: "Search", ta: "தேடல்" })}
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search className="size-4.5 shrink-0 text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            type="text"
            inputMode="search"
            autoComplete="off"
            placeholder={t({
              en: "Search lessons, sensors, projects…",
              ta: "பாடங்கள், சென்சார்கள், திட்டங்களைத் தேடுங்கள்…",
            })}
            className="min-h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-faint"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t({ en: "Close search", ta: "தேடலை மூடு" })}
            className="grid size-9 shrink-0 place-items-center rounded-full text-faint transition-colors hover:bg-white/5 hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
          {query.trim() === "" && (
            <p className="p-6 text-center text-sm text-faint">
              {t({
                en: 'Try "esp32", "ultrasonic", or "servo"',
                ta: '"esp32", "ultrasonic", அல்லது "servo" முயற்சிக்கவும்',
              })}
            </p>
          )}

          {query.trim() !== "" && results.length === 0 && (
            <p className="p-6 text-center text-sm text-faint">
              {t({
                en: "No results — try a different word",
                ta: "முடிவுகள் இல்லை — வேறு வார்த்தையை முயற்சிக்கவும்",
              })}
            </p>
          )}

          {results.map((result, i) => {
            const Icon = TYPE_ICON[result.item.type];
            const active = i === activeIndex;
            return (
              <button
                key={result.item.id}
                type="button"
                role="option"
                aria-selected={active}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => go(result.item)}
                className={cn(
                  "flex w-full min-h-[3.25rem] items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  active ? "bg-primary/10" : "hover:bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg",
                    active
                      ? "bg-primary/20 text-primary"
                      : "bg-white/5 text-faint",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">
                    <Highlighted
                      text={result.item.title}
                      matches={result.matches}
                    />
                  </span>
                  <span className="block truncate text-xs text-faint">
                    {result.item.subtitle}
                  </span>
                </span>
                <span className="mono-label shrink-0 text-[10px]">
                  {t(TYPE_LABEL[result.item.type])}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
