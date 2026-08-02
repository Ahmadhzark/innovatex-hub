"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { getHardware } from "@/data/hardware";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

function formatBuildTime(minutes: number) {
  if (minutes < 60) return { en: `${minutes} min`, ta: `${minutes} நிமிடம்` };
  const hours = minutes / 60;
  const label = Number.isInteger(hours) ? `${hours}` : `${hours.toFixed(1)}`;
  return { en: `${label} hr build`, ta: `${label} மணி` };
}

export function ProjectsView() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={{ en: "PROJECT SHOWCASE", ta: "திட்ட காட்சியகம்" }}
        title={{ en: "Things worth building", ta: "கட்டமைக்கத் தகுந்தவை" }}
        description={{
          en: "Every project here can be built with the components in the workshop kit — each one comes with a full guide: wiring, code, testing and troubleshooting.",
          ta: "இங்குள்ள ஒவ்வொரு திட்டத்தையும் பட்டறை கிட்டில் உள்ள பாகங்களால் கட்டமைக்க முடியும் — ஒவ்வொன்றுக்கும் முழு வழிகாட்டி உள்ளது.",
        }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.06}>
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <GlassCard glow="primary" className="flex h-full flex-col p-0">
                  <HardwareVisual
                    slug={project.hero}
                    size="sm"
                    disable3D
                    className="aspect-16/10 rounded-b-none rounded-t-3xl"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold">
                      {t(project.title)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {t(project.description)}
                    </p>

                    <div className="mt-5">
                      <p className="mono-label mb-2">
                        {t({ en: "USES", ta: "பயன்படுத்துவது" })}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.components.map((slug) => (
                          <span
                            key={slug}
                            className="rounded-full border border-hairline px-2.5 py-1 font-mono text-xs text-faint"
                          >
                            {getHardware(slug)?.name ?? slug}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                        <Clock className="size-3.5" />
                        {t(formatBuildTime(project.buildTime))}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {t({ en: "View Project", ta: "திட்டத்தைப் பார்" })}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
