"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, DIFFICULTY_LABEL, type Project } from "@/data/projects";
import { getHardware } from "@/data/hardware";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

type Filter = "all" | Project["difficulty"];

const FILTERS: Array<{ id: Filter; label: { en: string; ta: string } }> = [
  { id: "all", label: { en: "All", ta: "அனைத்தும்" } },
  { id: "beginner", label: { en: "Beginner", ta: "ஆரம்பநிலை" } },
  { id: "intermediate", label: { en: "Intermediate", ta: "இடைநிலை" } },
  { id: "advanced", label: { en: "Advanced", ta: "மேம்பட்ட" } },
];

export function ProjectsView() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.difficulty === filter);

  return (
    <>
      <PageHeader
        eyebrow={{ en: "PROJECT SHOWCASE", ta: "திட்ட காட்சியகம்" }}
        title={{ en: "Things worth building", ta: "கட்டமைக்கத் தகுந்தவை" }}
        description={{
          en: "Every project here can be built with the components in the workshop kit. Pick one, or use them as inspiration for your team's final build.",
          ta: "இங்குள்ள ஒவ்வொரு திட்டத்தையும் பட்டறை கிட்டில் உள்ள பாகங்களால் கட்டமைக்க முடியும்.",
        }}
      >
        {/* Difficulty filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "relative inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-300",
                filter === item.id ? "text-void" : "text-muted hover:text-ink",
              )}
            >
              {filter === item.id && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {t(item.label)}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => {
              const difficulty = DIFFICULTY_LABEL[project.difficulty];

              return (
                <motion.div
                  id={project.slug}
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="scroll-mt-28"
                >
                  <GlassCard glow="primary" className="flex h-full flex-col p-0">
                    <div className="relative">
                      <HardwareVisual
                        slug={project.hero}
                        size="sm"
                        disable3D
                        className="aspect-16/10 rounded-b-none rounded-t-3xl"
                      />
                      <span
                        className={cn(
                          "absolute left-4 top-4 rounded-full border px-2.5 py-1 font-mono text-xs font-bold tracking-wider backdrop-blur-md",
                          difficulty.tone,
                        )}
                      >
                        {t(difficulty.label).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold">
                        {t(project.title)}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {t(project.description)}
                      </p>

                      {/* Components used */}
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

                      {/* Skills taught */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
