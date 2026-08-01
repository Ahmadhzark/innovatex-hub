"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function CallToAction() {
  const { t } = useLanguage();

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] glass-strong px-6 py-16 text-center sm:px-16 sm:py-24">
          {/* Aurora wash inside the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-1/4 -top-1/2 size-[600px] rounded-full bg-primary/15 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-1/2 -right-1/4 size-[600px] rounded-full bg-accent/12 blur-[120px]"
          />

          {/* PCB trace decoration */}
          <svg
            aria-hidden
            viewBox="0 0 800 200"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M0 40 H180 L210 70 H420 L450 40 H800"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <path
              d="M0 160 H240 L270 130 H520 L550 160 H800"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            {[180, 420, 240, 520].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={i < 2 ? 40 : 160}
                r="3"
                fill="var(--color-primary)"
                fillOpacity="0.6"
              />
            ))}
          </svg>

          <div className="relative z-10">
            <h2 className="mx-auto max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
              {t({
                en: "Ready to build something that actually works?",
                ta: "உண்மையில் செயல்படும் ஒன்றை உருவாக்க தயாரா?",
              })}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
              {t({
                en: "Start with the fundamentals in Learn Academy, then follow the weekly blueprints all the way to the exhibition.",
                ta: "கற்றல் அகாடமியில் அடிப்படைகளுடன் தொடங்கி, கண்காட்சி வரை வாராந்திர திட்டங்களை பின்பற்றுங்கள்.",
              })}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href="/learn">
                <BookOpen className="size-4" />
                {t({ en: "Enter Learn Academy", ta: "கற்றல் அகாடமிக்குள் நுழை" })}
              </MagneticButton>
              <MagneticButton href="/portal" variant="ghost">
                {t({ en: "Open the Portal", ta: "போர்ட்டலை திற" })}
                <ArrowRight className="size-4" />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
