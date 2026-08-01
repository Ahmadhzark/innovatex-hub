"use client";

import { GraduationCap } from "lucide-react";
import { TEAM, type Person } from "@/data/team";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/utils";

export function TeamView() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: "RESOURCE PERSONS", ta: "வளப் பயிற்றுநர்கள்" }}
        title={{ en: "Who's teaching", ta: "யார் கற்பிக்கிறார்கள்" }}
        description={{
          en: "The instructors and mentors running each session of InnovateX 3.0.",
          ta: "InnovateX 3.0-இன் ஒவ்வொரு அமர்வையும் நடத்தும் பயிற்றுநர்கள் மற்றும் வழிகாட்டிகள்.",
        }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person, i) => (
            <Reveal key={`${person.name}-${i}`} delay={(i % 4) * 0.07}>
              <PersonCard person={person} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function PersonCard({ person }: { person: Person }) {
  const { t } = useLanguage();

  // Initials for the fallback monogram.
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .filter((char) => /[A-Za-z]/.test(char ?? ""))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <GlassCard glow="primary" className="flex h-full flex-col p-0">
      <div className="relative aspect-square overflow-hidden rounded-t-3xl">
        {person.photo ? (
          <img
            src={asset(person.photo)}
            alt={person.name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="relative grid size-full place-items-center bg-[linear-gradient(150deg,#0f1a30,#070d1c)]">
            {/* Circuit-trace texture behind the monogram */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 size-full opacity-25"
              aria-hidden
            >
              <path
                d="M0 60 H70 L90 80 H200 M0 140 H50 L70 120 H200"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1"
              />
              <circle cx="70" cy="60" r="3" fill="var(--color-primary)" />
              <circle cx="50" cy="140" r="3" fill="var(--color-secondary)" />
            </svg>
            <span className="relative font-display text-4xl font-bold text-primary/70">
              {initials || "IX"}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">
          {person.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-primary">
          {t(person.role)}
        </p>

        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-faint" />
          {t(person.qualification)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {person.expertise.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-faint"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
