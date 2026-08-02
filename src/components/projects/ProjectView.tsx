"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  Library,
  ListChecks,
  Package,
  ShieldAlert,
  Target,
  Wrench,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { CATEGORY_LABEL } from "@/data/projects";
import { getHardware } from "@/data/hardware";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { CircuitDiagram } from "@/components/learn/CircuitDiagram";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/utils";
import type { Bilingual } from "@/components/providers/LanguageProvider";

export function ProjectView({ project }: { project: Project }) {
  const { t } = useLanguage();

  const buildTime =
    project.buildTime < 60
      ? { en: `${project.buildTime} minutes`, ta: `${project.buildTime} நிமிடங்கள்` }
      : {
          en: `${project.buildTime / 60} hours`,
          ta: `${project.buildTime / 60} மணி நேரம்`,
        };

  return (
    <article className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <Reveal>
        <Link
          href="/projects"
          className="mono-label inline-flex min-h-11 items-center gap-2 hover:text-primary"
        >
          <ArrowLeft className="size-3.5" />
          {t({ en: "All projects", ta: "அனைத்து திட்டங்கள்" })}
        </Link>
      </Reveal>

      <Reveal className="mt-4">
        <p className="mono-label">{t(CATEGORY_LABEL[project.category])}</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold">
          {t(project.title)}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {t(project.description)}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-sm text-faint">
            <Clock className="size-4" />
            {t(buildTime)}
          </span>
          {project.skills.map((skill) => (
            <span key={skill} className="text-sm text-faint">
              {skill}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <HardwareVisual
          slug={project.hero}
          priority
          className="aspect-16/9 rounded-2xl"
        />
      </Reveal>

      {project.overview && (
        <Section title={{ en: "Project overview", ta: "திட்ட மேலோட்டம்" }} icon={Target}>
          <p className="text-base leading-[1.85] text-muted">{t(project.overview)}</p>
        </Section>
      )}

      {project.objectives && project.objectives.length > 0 && (
        <Section
          title={{ en: "What you'll learn", ta: "நீங்கள் கற்பது" }}
          icon={ListChecks}
        >
          <ul className="flex flex-col gap-3">
            {project.objectives.map((objective) => (
              <li key={objective.en} className="flex gap-3 text-sm text-muted sm:text-base">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {t(objective)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section
        title={{ en: "Components used", ta: "பயன்படுத்தப்படும் பாகங்கள்" }}
        icon={Package}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {project.components.map((slug) => {
            const hardware = getHardware(slug);
            return (
              <div key={slug} className="flex items-center gap-3 rounded-2xl glass p-3">
                <HardwareVisual
                  slug={slug}
                  size="sm"
                  disable3D
                  className="size-14 shrink-0 rounded-xl"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-ink">
                    {hardware?.name ?? slug}
                  </p>
                  {hardware?.spec && (
                    <p className="mt-0.5 truncate font-mono text-xs text-faint">
                      {hardware.spec}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {project.equipment && project.equipment.length > 0 && (
        <Section
          title={{ en: "Complete equipment list", ta: "முழு உபகரண பட்டியல்" }}
          icon={Wrench}
        >
          <div className="overflow-hidden rounded-2xl glass">
            <ul className="divide-y divide-hairline">
              {project.equipment.map((item) => (
                <li
                  key={item.name.en}
                  className="flex items-start justify-between gap-4 p-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{t(item.name)}</p>
                    {item.note && (
                      <p className="mt-0.5 text-xs text-faint">{t(item.note)}</p>
                    )}
                  </div>
                  <span className="shrink-0 font-mono text-sm text-primary">
                    {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {project.wiring && project.wiring.length > 0 && (
        <Section title={{ en: "Wiring diagram", ta: "இணைப்பு வரைபடம்" }} icon={Wrench}>
          <div className="flex flex-col gap-5">
            {project.wiring.map((diagram, i) => (
              <CircuitDiagram key={i} data={diagram} />
            ))}
          </div>
          <p className="mt-4 text-sm text-faint">
            {t({
              en: "Every module also needs power and ground. Where a diagram omits them for clarity, connect VCC and GND as listed in the assembly steps.",
              ta: "ஒவ்வொரு மாடியூலுக்கும் மின்சாரமும் கிரவுண்டும் தேவை. வரைபடத்தில் தெளிவுக்காக விடப்பட்டிருந்தால், அசெம்பிளி படிகளின்படி VCC மற்றும் GND-ஐ இணைக்கவும்.",
            })}
          </p>
        </Section>
      )}

      {project.assembly && project.assembly.length > 0 && (
        <Section
          title={{ en: "Step-by-step assembly", ta: "படிப்படியான அசெம்பிளி" }}
          icon={ListChecks}
        >
          <div className="flex flex-col gap-4">
            {project.assembly.map((step, i) => (
              <div key={step.title.en} className="flex gap-4 rounded-2xl glass p-5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-xs font-bold text-primary ring-1 ring-primary/30">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {t(step.title)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(step.text)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {project.libraries && project.libraries.length > 0 && (
        <Section
          title={{ en: "Required libraries", ta: "தேவையான நூலகங்கள்" }}
          icon={Library}
        >
          <div className="flex flex-col gap-3">
            {project.libraries.map((library) => (
              <div key={library.name} className="rounded-2xl glass p-4">
                <p className="font-mono text-sm font-bold text-primary">
                  {library.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {t(library.note)}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {project.code && (
        <Section title={{ en: "Arduino code", ta: "Arduino குறியீடு" }} icon={Download}>
          <CodeBlock filename={project.code.filename} code={project.code.content} />
          <a
            href={asset(`downloads/${project.code.filename}`)}
            download
            className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-void transition-shadow hover:shadow-[0_0_24px_-6px_var(--color-primary)]"
          >
            <Download className="size-4" />
            {t({ en: "Download the .ino file", ta: ".ino கோப்பைப் பதிவிறக்கு" })}
          </a>
          <p className="mt-3 text-xs text-faint">
            {t({
              en: "Open the downloaded file in the Arduino IDE, select your board under Tools → Board, then press Upload.",
              ta: "பதிவிறக்கிய கோப்பை Arduino IDE-இல் திறந்து, Tools → Board-இல் உங்கள் போர்டைத் தேர்ந்தெடுத்து, Upload அழுத்தவும்.",
            })}
          </p>
        </Section>
      )}

      {project.codeExplanation && project.codeExplanation.length > 0 && (
        <Section
          title={{ en: "How the code works", ta: "குறியீடு எவ்வாறு செயல்படுகிறது" }}
          icon={ListChecks}
        >
          <div className="flex flex-col gap-4">
            {project.codeExplanation.map((item) => (
              <div key={item.title.en} className="rounded-2xl glass p-5">
                <h3 className="font-display text-base font-bold text-ink">
                  {t(item.title)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t(item.text)}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {project.testing && project.testing.length > 0 && (
        <Section
          title={{ en: "Testing it safely", ta: "பாதுகாப்பாக சோதித்தல்" }}
          icon={CheckCircle2}
        >
          <ol className="flex flex-col gap-3">
            {project.testing.map((step, i) => (
              <li key={step.en} className="flex gap-3 text-sm text-muted sm:text-base">
                <span className="mt-0.5 font-mono text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(step)}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {project.expected && (
        <Reveal className="mt-8">
          <GlassCard interactive={false} className="border-primary/25 bg-primary/5 p-6">
            <p className="mono-label mb-2">
              {t({ en: "EXPECTED RESULT", ta: "எதிர்பார்க்கப்படும் முடிவு" })}
            </p>
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              {t(project.expected)}
            </p>
          </GlassCard>
        </Reveal>
      )}

      {project.troubleshooting && project.troubleshooting.length > 0 && (
        <Section
          title={{ en: "Troubleshooting", ta: "சிக்கல் தீர்வு" }}
          icon={AlertTriangle}
        >
          <div className="overflow-hidden rounded-2xl glass">
            <div className="divide-y divide-hairline">
              {project.troubleshooting.map((item) => (
                <div key={item.problem.en} className="p-5">
                  <p className="text-sm font-semibold text-ink">
                    {t(item.problem)}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(item.fix)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {project.mistakes && project.mistakes.length > 0 && (
        <Section
          title={{ en: "Common mistakes", ta: "பொதுவான தவறுகள்" }}
          icon={AlertTriangle}
        >
          <ul className="flex flex-col gap-3">
            {project.mistakes.map((mistake) => (
              <li key={mistake.en} className="flex gap-3 text-sm text-muted sm:text-base">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-orange-400" />
                {t(mistake)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.safety && project.safety.length > 0 && (
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-orange-400/30 bg-orange-400/8 p-6">
            <p className="mb-3 inline-flex items-center gap-2 font-display text-base font-bold text-orange-400">
              <ShieldAlert className="size-4.5" />
              {t({ en: "Safety", ta: "பாதுகாப்பு" })}
            </p>
            <ul className="flex flex-col gap-2.5">
              {project.safety.map((tip) => (
                <li key={tip.en} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-400" />
                  {t(tip)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </article>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: Bilingual;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <Reveal as="section" className="mt-14">
      <h2 className="mb-5 inline-flex items-center gap-2.5 font-display text-2xl font-bold sm:text-3xl">
        <Icon className="size-5 text-primary" />
        {t(title)}
      </h2>
      {children}
    </Reveal>
  );
}
