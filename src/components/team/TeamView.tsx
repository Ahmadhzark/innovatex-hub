"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { RESOURCE_PERSONS, type ResourcePerson } from "@/data/resourcePersons";
import { WEEKS } from "@/data/weeks";
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
          en: "The resource person leading each week of InnovateX 3.0.",
          ta: "InnovateX 3.0-இன் ஒவ்வொரு வாரத்தையும் வழிநடத்தும் வளப் பயிற்றுநர்.",
        }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {RESOURCE_PERSONS.map((person, i) => (
            <Reveal key={person.week} delay={(i % 4) * 0.07}>
              <ResourcePersonCard person={person} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function ResourcePersonCard({ person }: { person: ResourcePerson }) {
  const { t } = useLanguage();
  const week = WEEKS.find((w) => w.number === person.week);
  const name = t(person.name);

  const initials =
    name
      .split(" ")
      .map((part) => part[0])
      .filter((char) => /[A-Za-z]/.test(char ?? ""))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "IX";

  return (
    <GlassCard glow="primary" className="flex h-full flex-col p-0">
      <div className="relative aspect-4/3 overflow-hidden rounded-t-3xl">
        {person.photo ? (
          <img
            src={asset(person.photo)}
            alt={name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="relative grid size-full place-items-center bg-[linear-gradient(150deg,#0f1a30,#070d1c)]">
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
              {initials}
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-void/70 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-primary backdrop-blur-md">
          {t({ en: "WEEK", ta: "வாரம்" })} {String(person.week).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {week && (
          <p className="mono-label">{t(week.title)}</p>
        )}

        <h3 className="mt-2 font-display text-lg font-bold text-ink">{name}</h3>

        {person.qualification && (
          <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-faint" />
            {t(person.qualification)}
          </p>
        )}

        {person.specialization && (
          <p className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-faint" />
            {t(person.specialization)}
          </p>
        )}

        {week && (
          <Link
            href={`/weeks/${week.number}`}
            className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary"
          >
            {t({ en: "View the session", ta: "அமர்வைப் பார்க்க" })}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </GlassCard>
  );
}
