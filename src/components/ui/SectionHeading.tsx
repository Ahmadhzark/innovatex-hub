"use client";

import { useLanguage, type Bilingual } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono label above the title, e.g. "THE JOURNEY". */
  eyebrow?: Bilingual | string;
  title: Bilingual | string;
  description?: Bilingual | string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const { t } = useLanguage();
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center mx-auto max-w-3xl" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
          <span className="mono-label">{t(eyebrow)}</span>
        </div>
      )}

      <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold">
        {t(title)}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg text-muted leading-relaxed",
            centered ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {t(description)}
        </p>
      )}
    </Reveal>
  );
}
