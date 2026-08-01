"use client";

import Link from "next/link";
import { ArrowRight, Clock, Lock } from "lucide-react";
import { LESSONS } from "@/data/lessons";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Advanced lessons that aren't written yet, shown as locked. */
const UPCOMING = [
  { title: { en: "Sensors", ta: "சென்சார்கள்" }, hardware: "ultrasonic-sensor" },
  { title: { en: "Motors", ta: "மோட்டார்கள்" }, hardware: "servo-motor" },
  { title: { en: "Arduino Code", ta: "Arduino குறியீடு" }, hardware: "arduino-uno" },
  { title: { en: "ESP32 & IoT", ta: "ESP32 & IoT" }, hardware: "esp32" },
];

export function LearnHub() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={{ en: "LEARN ACADEMY", ta: "கற்றல் அகாடமி" }}
        title={{ en: "From zero to ESP32", ta: "பூஜ்ஜியத்திலிருந்து ESP32 வரை" }}
        description={{
          en: "One concept per lesson, in plain language, with a self-check at the end. Start at the top — each lesson assumes only what came before it.",
          ta: "ஒரு பாடத்திற்கு ஒரு கருத்து, எளிய மொழியில், இறுதியில் ஒரு சுயதேர்வுடன். மேலிருந்து தொடங்குங்கள்.",
        }}
      />

      {/* Foundation lessons */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <p className="mono-label mb-6">
          {t({ en: "FOUNDATION · 4 LESSONS", ta: "அடிப்படை · 4 பாடங்கள்" })}
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {LESSONS.map((lesson, i) => (
            <Reveal key={lesson.slug} delay={(i % 2) * 0.08}>
              <Link href={`/learn/${lesson.slug}`} className="block h-full">
                <GlassCard glow="primary" className="flex h-full flex-col p-0">
                  <HardwareVisual
                    slug={lesson.hero}
                    size="sm"
                    disable3D
                    className="aspect-16/9 rounded-b-none rounded-t-3xl"
                  />

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

                    <h3 className="mt-2 font-display text-2xl font-bold">
                      {t(lesson.title)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {t(lesson.subtitle)}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {t({ en: "Start lesson", ta: "பாடத்தை தொடங்கு" })}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Coming next */}
      <section className="section-y">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="left"
            eyebrow={{ en: "COMING NEXT", ta: "அடுத்து வருபவை" }}
            title={{ en: "Advanced lessons", ta: "மேம்பட்ட பாடங்கள்" }}
            description={{
              en: "These unlock as the workshop progresses. Until then, the weekly pages cover the same ground hands-on.",
              ta: "பட்டறை முன்னேறும்போது இவை திறக்கப்படும். அதுவரை, வாராந்திர பக்கங்கள் அதே தலைப்புகளை நேரடியாக உள்ளடக்குகின்றன.",
            }}
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {UPCOMING.map((item, i) => (
              <Reveal key={item.title.en} delay={i * 0.06}>
                <GlassCard
                  interactive={false}
                  className="flex h-full flex-col p-0 opacity-55"
                >
                  <HardwareVisual
                    slug={item.hardware}
                    size="sm"
                    disable3D
                    className="aspect-4/3 rounded-b-none rounded-t-3xl grayscale"
                  />
                  <div className="flex items-center gap-2 p-5">
                    <Lock className="size-3.5 text-faint" />
                    <h4 className="font-display text-base font-semibold text-ink">
                      {t(item.title)}
                    </h4>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
