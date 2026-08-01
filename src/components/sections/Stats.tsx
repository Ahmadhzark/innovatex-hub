"use client";

import { Users, Layers, Rocket, CalendarRange } from "lucide-react";
import { STATS } from "@/data/site";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ICONS = [Users, Layers, Rocket, CalendarRange];

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="relative border-y border-hairline">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal
              key={stat.label.en}
              delay={i * 0.08}
              className="group relative bg-void px-6 py-10 text-center transition-colors duration-500 hover:bg-abyss sm:px-8 sm:py-14"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <Icon className="mx-auto size-5 text-primary/70" strokeWidth={1.6} />

              <div className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              <p className="mono-label mt-3">{t(stat.label)}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
