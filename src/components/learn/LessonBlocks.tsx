"use client";

import {
  BatteryCharging,
  Cable,
  Gauge,
  Lightbulb,
  Info,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { LessonBlock } from "@/data/lessons";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ICONS: Record<string, LucideIcon> = {
  battery: BatteryCharging,
  cable: Cable,
  gauge: Gauge,
  lightbulb: Lightbulb,
};

/** Renders one typed content block from a lesson. */
export function LessonBlockView({ block }: { block: LessonBlock }) {
  const { t } = useLanguage();

  switch (block.type) {
    case "hook":
      return (
        <Reveal className="my-10">
          <p className="border-l-2 border-primary pl-6 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {t(block.text)}
          </p>
        </Reveal>
      );

    case "prose":
      return (
        <Reveal className="my-6">
          <p className="text-base leading-[1.85] text-muted sm:text-[1.0625rem]">
            {t(block.text)}
          </p>
        </Reveal>
      );

    case "hardware":
      return (
        <Reveal className="my-10">
          <HardwareVisual
            slug={block.slug}
            className="aspect-16/9 rounded-2xl"
          />
          {block.caption && (
            <p className="mono-label mt-3 text-center">{t(block.caption)}</p>
          )}
        </Reveal>
      );

    case "facts":
      return (
        <Reveal className="my-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl glass p-4 text-center"
            >
              <p className="font-mono text-base font-bold text-primary">
                {fact.label}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-faint">
                {t(fact.text)}
              </p>
            </div>
          ))}
        </Reveal>
      );

    case "compare":
      return (
        <div className="my-10 grid gap-4 sm:grid-cols-2">
          {block.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Info;
            return (
              <Reveal key={item.term.en} delay={i * 0.07}>
                <GlassCard glow="primary" className="h-full p-5">
                  <Icon className="size-5 text-primary" strokeWidth={1.8} />
                  <h4 className="mt-3 font-display text-base font-bold text-ink">
                    {t(item.term)}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(item.analogy)}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      );

    case "steps":
      return (
        <div className="my-10 flex flex-col gap-4">
          {block.items.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.07}>
              <div className="flex gap-4 rounded-2xl glass p-5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-xs font-bold text-primary ring-1 ring-primary/30">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-ink">
                    {t(step.title)}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(step.text)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      );

    case "callout": {
      const warn = block.tone === "warn";
      const Icon = warn ? TriangleAlert : Info;
      return (
        <Reveal className="my-10">
          <div
            className={`flex gap-4 rounded-2xl border p-5 ${
              warn
                ? "border-orange-400/30 bg-orange-400/8"
                : "border-secondary/30 bg-secondary/8"
            }`}
          >
            <Icon
              className={`size-5 shrink-0 ${warn ? "text-orange-400" : "text-secondary"}`}
              strokeWidth={1.9}
            />
            <p className="text-sm leading-relaxed text-muted">
              {t(block.text)}
            </p>
          </div>
        </Reveal>
      );
    }

    default:
      return null;
  }
}
