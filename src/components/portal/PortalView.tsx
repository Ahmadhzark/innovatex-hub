"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Download,
  ExternalLink,
  FileText,
  Layers,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { LESSONS } from "@/data/lessons";
import { WEEKS } from "@/data/weeks";
import { RESOURCES, ASSIGNMENTS } from "@/data/portal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { useLanguage } from "@/components/providers/LanguageProvider";

const KIND_ICON = {
  pdf: FileText,
  link: ExternalLink,
  software: Download,
  sheet: ClipboardList,
};

export function PortalView() {
  const { t } = useLanguage();

  const liveWeeks = WEEKS.filter((w) => w.status === "live").length;
  const progress = Math.round((liveWeeks / WEEKS.length) * 100);

  return (
    <>
      <PageHeader
        eyebrow={{ en: "LEARNING PORTAL", ta: "கற்றல் போர்ட்டல்" }}
        title={{ en: "Everything in one place", ta: "அனைத்தும் ஒரே இடத்தில்" }}
        description={{
          en: "Lessons, weekly blueprints, tools and assignments — open to every student, no login needed.",
          ta: "பாடங்கள், வாராந்திர திட்டங்கள், கருவிகள் மற்றும் பணிகள் — ஒவ்வொரு மாணவருக்கும் திறந்திருக்கிறது, உள்நுழைவு தேவையில்லை.",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 pb-20 sm:px-8">
        {/* ---------------- Dashboard ---------------- */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <GlassCard glow="primary" className="p-6">
              <CalendarDays className="size-5 text-primary" strokeWidth={1.8} />
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                <Counter value={liveWeeks} />
                <span className="text-muted">/{WEEKS.length}</span>
              </p>
              <p className="mono-label mt-2">
                {t({ en: "WEEKS UNLOCKED", ta: "திறக்கப்பட்ட வாரங்கள்" })}
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </GlassCard>

            <GlassCard glow="secondary" className="p-6">
              <BookOpen className="size-5 text-secondary" strokeWidth={1.8} />
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                <Counter value={LESSONS.length} />
              </p>
              <p className="mono-label mt-2">
                {t({ en: "LESSONS AVAILABLE", ta: "கிடைக்கும் பாடங்கள்" })}
              </p>
            </GlassCard>

            <GlassCard glow="accent" className="p-6">
              <Layers className="size-5 text-accent" strokeWidth={1.8} />
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                <Counter value={RESOURCES.length} />
              </p>
              <p className="mono-label mt-2">
                {t({ en: "RESOURCES", ta: "வளங்கள்" })}
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <ClipboardList className="size-5 text-primary" strokeWidth={1.8} />
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                <Counter value={ASSIGNMENTS.length} />
              </p>
              <p className="mono-label mt-2">
                {t({ en: "OPEN ASSIGNMENTS", ta: "திறந்த பணிகள்" })}
              </p>
            </GlassCard>
          </div>
        </Reveal>

        {/* ---------------- Quick links ---------------- */}
        <section>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t({ en: "Jump back in", ta: "மீண்டும் தொடருங்கள்" })}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/learn",
                icon: BookOpen,
                title: { en: "Lessons", ta: "பாடங்கள்" },
                body: {
                  en: "Story-driven electronics fundamentals with a self-check at the end of each one.",
                  ta: "ஒவ்வொன்றின் முடிவிலும் சுயதேர்வுடன் கூடிய எலக்ட்ரானிக்ஸ் அடிப்படைகள்.",
                },
              },
              {
                href: "/weeks",
                icon: CalendarDays,
                title: { en: "Weekly Blueprints", ta: "வாராந்திர திட்டங்கள்" },
                body: {
                  en: "The full plan for every session: circuit, wiring, code, photos and the quiz.",
                  ta: "ஒவ்வொரு அமர்விற்கும் முழு திட்டம்: சுற்று, இணைப்பு, குறியீடு, புகைப்படங்கள்.",
                },
              },
              {
                href: "/projects",
                icon: Rocket,
                title: { en: "Projects", ta: "திட்டங்கள்" },
                body: {
                  en: "Build ideas with the components you already have, from beginner to advanced.",
                  ta: "உங்களிடம் உள்ள பாகங்களுடன் கட்டமைக்கும் யோசனைகள்.",
                },
              },
            ].map((item, i) => (
              <Reveal key={item.href} delay={i * 0.07}>
                <Link href={item.href} className="block h-full">
                  <GlassCard glow="primary" className="h-full p-6">
                    <item.icon className="size-5 text-primary" strokeWidth={1.8} />
                    <h3 className="mt-4 font-display text-lg font-bold">
                      {t(item.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t(item.body)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {t({ en: "Open", ta: "திற" })}
                      <ArrowRight className="size-4" />
                    </span>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Assignments ---------------- */}
        <section>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t({ en: "Assignments", ta: "பணிகள்" })}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {t({
              en: "Practice work between sessions. Submissions are collected by your instructor, not on this site.",
              ta: "அமர்வுகளுக்கு இடையேயான பயிற்சி. சமர்ப்பிப்புகள் உங்கள் பயிற்றுநரால் சேகரிக்கப்படும்.",
            })}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {ASSIGNMENTS.map((assignment, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <GlassCard interactive={false} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="mono-label">
                        {t({ en: "WEEK", ta: "வாரம்" })} {assignment.week}
                      </span>
                      <h3 className="mt-1.5 font-display text-base font-bold text-ink">
                        {t(assignment.title)}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {t(assignment.brief)}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-hairline px-3 py-1 font-mono text-[11px] text-faint">
                      {t(assignment.due)}
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Resources / downloads ---------------- */}
        <section>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t({ en: "Resources & downloads", ta: "வளங்கள் & பதிவிறக்கங்கள்" })}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((resource, i) => {
              const Icon = KIND_ICON[resource.kind];
              return (
                <Reveal key={resource.url} delay={(i % 3) * 0.06}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <GlassCard glow="secondary" className="h-full p-5">
                      <div className="flex items-start justify-between gap-3">
                        <Icon className="size-5 text-secondary" strokeWidth={1.8} />
                        <ExternalLink className="size-3.5 text-faint" />
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold text-ink">
                        {t(resource.title)}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {t(resource.description)}
                      </p>
                    </GlassCard>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ---------------- Privacy note ---------------- */}
        <Reveal>
          <div className="flex gap-4 rounded-2xl border border-secondary/25 bg-secondary/8 p-5">
            <ShieldCheck className="size-5 shrink-0 text-secondary" strokeWidth={1.8} />
            <div>
              <h3 className="font-display text-sm font-bold text-ink">
                {t({ en: "About your data", ta: "உங்கள் தரவு பற்றி" })}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {t({
                  en: "This portal stores nothing about you. Lesson self-checks are marked in your browser and forgotten on refresh. Registration details, attendance and quiz marks are held privately by the organiser and never published here.",
                  ta: "இந்த போர்ட்டல் உங்களைப் பற்றி எதையும் சேமிக்காது. பாட சுயதேர்வுகள் உங்கள் உலாவியில் மட்டுமே மதிப்பிடப்படுகின்றன. பதிவு விவரங்கள் மற்றும் மதிப்பெண்கள் அமைப்பாளரால் தனிப்பட்ட முறையில் வைக்கப்படுகின்றன.",
                })}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
