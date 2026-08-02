"use client";

import { MODULES } from "@/data/program";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

const GLOWS = ["primary", "secondary", "accent"] as const;

export function Modules() {
  const { t } = useLanguage();

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={{ en: "WORKSHOP MODULES", ta: "பட்டறை பகுதிகள்" }}
          title={{
            en: "What you'll actually learn",
            ta: "நீங்கள் உண்மையில் கற்பது",
          }}
          description={{
            en: "Seven modules across seven weeks — each one hands-on, each one ending with something that works.",
            ta: "ஏழு வாரங்களில் ஏழு பகுதிகள் — ஒவ்வொன்றும் நேரடி பயிற்சி, ஒவ்வொன்றும் செயல்படும் ஒன்றுடன் முடிகிறது.",
          }}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, i) => (
            <Reveal key={module.id} delay={(i % 3) * 0.08}>
              <GlassCard
                glow={GLOWS[i % GLOWS.length]}
                className="flex h-full flex-col p-0"
              >
                <HardwareVisual
                  slug={module.hardware}
                  size="sm"
                  disable3D
                  className="aspect-16/10 rounded-b-none rounded-t-3xl"
                />

                <div className="flex flex-1 flex-col p-6">
                  <span className="mono-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 font-display text-xl font-bold">
                    {t(module.title)}
                  </h3>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {t(module.description)}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {module.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-full border border-hairline px-2.5 py-1 font-mono text-xs tracking-wide text-faint"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
