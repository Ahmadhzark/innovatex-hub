"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "en" | "ta";

/** A piece of content that exists in both languages. */
export type Bilingual = { en: string; ta: string };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Resolve a bilingual value (or a plain string) to the active language. */
  t: (value: Bilingual | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "innovatex-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start as "en" so server and client markup match, then hydrate
  // the stored preference in an effect (avoids a hydration mismatch).
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== "en" && stored !== "ta") return;
    // Deferred a frame so the stored preference is applied as an update
    // rather than synchronously inside the effect body.
    const frame = requestAnimationFrame(() => {
      setLangState(stored);
      document.documentElement.lang = stored;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ta" : "en");
  }, [lang, setLang]);

  const t = useCallback(
    (value: Bilingual | string) =>
      typeof value === "string" ? value : value[lang],
    [lang],
  );

  const contextValue = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return context;
}
