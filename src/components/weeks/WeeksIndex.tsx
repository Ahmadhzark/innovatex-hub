"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { WEEKS } from "@/data/weeks";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function WeeksIndex() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={{ en: "WEEKLY BLUEPRINTS", ta: "வாராந்திர திட்டங்கள்" }}
        title={{ en: "Seven weeks, seven builds", ta: "ஏழு வாரங்கள், ஏழு கட்டமைப்புகள்" }}
        description={{
          en: "Each week has its own page: the plan, the circuit, the wiring steps, the code, who taught it, who attended, and the photos.",
          ta: "ஒவ்வொரு வாரத்திற்கும் அதன் சொந்த பக்கம்: திட்டம், சுற்று, இணைப்பு படிகள், குறியீடு, யார் கற்பித்தார், யார் கலந்துகொண்டார்.",
        }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WEEKS.map((week, i) => {
            const live = week.status === "live";

            const card = (
              <GlassCard
                glow={live ? "primary" : "none"}
                interactive={live}
                className={`flex h-full flex-col p-0 ${live ? "" : "opacity-60"}`}
              >
                <div className="relative">
                  <HardwareVisual
                    slug={week.hero}
                    size="sm"
                    disable3D
                    className={`aspect-16/9 rounded-b-none rounded-t-3xl ${live ? "" : "grayscale"}`}
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider backdrop-blur-md ${
                      live
                        ? "bg-primary/90 text-void"
                        : "bg-void/70 text-muted ring-1 ring-hairline"
                    }`}
                  >
                    {live
                      ? t({ en: "LIVE", ta: "நேரடி" })
                      : t({ en: "SOON", ta: "விரைவில்" })}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="mono-label">
                    {t({ en: "WEEK", ta: "வாரம்" })}{" "}
                    {String(week.number).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 font-display text-xl font-bold">
                    {t(week.title)}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {t(week.teaser)}
                  </p>

                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                      live ? "text-primary" : "text-faint"
                    }`}
                  >
                    {live ? (
                      <>
                        {t({ en: "Open blueprint", ta: "திட்டத்தை திற" })}
                        <ArrowRight className="size-4" />
                      </>
                    ) : (
                      <>
                        <Lock className="size-3.5" />
                        {t({ en: "Unlocks after the session", ta: "அமர்வுக்குப் பிறகு திறக்கும்" })}
                      </>
                    )}
                  </span>
                </div>
              </GlassCard>
            );

            return (
              <Reveal key={week.number} delay={(i % 3) * 0.07}>
                {live ? (
                  <Link href={`/weeks/${week.number}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
