"use client";

import { motion } from "framer-motion";
import type { Bilingual } from "@/components/providers/LanguageProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

type PageHeaderProps = {
  eyebrow?: Bilingual;
  title: Bilingual;
  description?: Bilingual;
  children?: React.ReactNode;
};

/**
 * The standard top-of-page banner used by every route except the home page,
 * which has its own full-height hero. Clears the fixed navbar.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-20">
      {/* Soft bloom behind the title */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 size-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            <span className="mono-label">{t(eyebrow)}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.25rem,6vw,4.25rem)] font-bold"
        >
          {t(title)}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {t(description)}
          </motion.p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
