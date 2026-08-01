"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CircuitBoard,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  Images,
  Lock,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { WEEKS, type Week } from "@/data/weeks";
import { getHardware } from "@/data/hardware";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/utils";

export function WeekView({ week }: { week: Week }) {
  const { t } = useLanguage();

  const previous = WEEKS.find((w) => w.number === week.number - 1);
  const next = WEEKS.find((w) => w.number === week.number + 1);

  /* ---------------- Upcoming state ---------------- */
  if (week.status !== "live") {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24 text-center sm:px-8">
        <HardwareVisual
          slug={week.hero}
          disable3D
          className="mx-auto aspect-16/9 max-w-md rounded-3xl grayscale"
        />
        <span className="mono-label mt-8 inline-flex items-center gap-2">
          <Lock className="size-3.5" />
          {t({ en: "NOT YET UNLOCKED", ta: "இன்னும் திறக்கப்படவில்லை" })}
        </span>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          {t({ en: "Week", ta: "வாரம்" })} {week.number} — {t(week.title)}
        </h1>
        <p className="mt-5 text-lg text-muted">{t(week.teaser)}</p>
        <Link
          href="/weeks"
          className="mt-10 inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
        >
          <ArrowLeft className="size-4" />
          {t({ en: "All weeks", ta: "அனைத்து வாரங்கள்" })}
        </Link>
      </div>
    );
  }

  const attendancePct = week.attendance
    ? Math.round((week.attendance.present / week.attendance.total) * 100)
    : 0;

  return (
    <article className="pb-20">
      {/* ---------------- Header ---------------- */}
      <header className="relative overflow-hidden pt-36 pb-12 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-12 size-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Link
            href="/weeks"
            className="-mx-2 -my-2 inline-flex min-h-11 items-center gap-1.5 px-2 py-2 text-sm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {t({ en: "All weeks", ta: "அனைத்து வாரங்கள்" })}
          </Link>

          <span className="mono-label mt-6 block">
            {t({ en: "WEEK", ta: "வாரம்" })}{" "}
            {String(week.number).padStart(2, "0")} · {t(week.dateRange)}
          </span>

          <h1 className="mt-3 text-[clamp(2.25rem,6vw,4rem)] font-bold">
            {t(week.title)}
          </h1>

          {week.goal && (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {t(week.goal)}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-5 sm:px-8">
        {/* ---------------- Session facts ---------------- */}
        <Reveal className="grid gap-4 sm:grid-cols-2">
          <GlassCard className="p-6">
            <UserRound className="size-5 text-primary" strokeWidth={1.8} />
            <p className="mono-label mt-3">
              {t({ en: "RESOURCE PERSON", ta: "வளப் பயிற்றுநர்" })}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-ink">
              {week.resourcePerson?.name}
            </p>
            {week.resourcePerson && (
              <p className="text-sm text-muted">
                {t(week.resourcePerson.role)}
              </p>
            )}
          </GlassCard>

          <GlassCard className="p-6">
            <Users className="size-5 text-primary" strokeWidth={1.8} />
            <p className="mono-label mt-3">
              {t({ en: "ATTENDANCE", ta: "வருகை" })}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-ink">
              <span className="font-mono">
                {week.attendance?.present}/{week.attendance?.total}
              </span>{" "}
              <span className="text-sm font-normal text-muted">
                ({attendancePct}%)
              </span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-1000"
                style={{ width: `${attendancePct}%` }}
              />
            </div>
          </GlassCard>
        </Reveal>

        {/* ---------------- What we're building ---------------- */}
        {week.building && (
          <Reveal>
            <SectionTitle
              icon={<Target className="size-4" />}
              label={{ en: "WHAT WE'RE BUILDING", ta: "நாம் உருவாக்குவது" }}
            />
            <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {t(week.building)}
              </p>
              <HardwareVisual
                slug={week.hero}
                className="aspect-16/10 rounded-2xl ring-1 ring-white/10"
              />
            </div>
          </Reveal>
        )}

        {/* ---------------- Components ---------------- */}
        {week.components && week.components.length > 0 && (
          <Reveal>
            <SectionTitle
              icon={<CircuitBoard className="size-4" />}
              label={{ en: "COMPONENT CHECKLIST", ta: "கூறுகள் பட்டியல்" }}
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {week.components.map((slug) => {
                const item = getHardware(slug);
                return (
                  <div
                    key={slug}
                    className="flex items-center gap-3 rounded-2xl glass p-3"
                  >
                    <HardwareVisual
                      slug={slug}
                      size="sm"
                      disable3D
                      className="size-14 shrink-0 rounded-xl"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold text-ink">
                        {item?.name ?? slug}
                      </p>
                      {item?.spec && (
                        <p className="mono-label mt-0.5">
                          {item.spec}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* ---------------- Wiring steps ---------------- */}
        {week.steps && week.steps.length > 0 && (
          <Reveal>
            <SectionTitle
              icon={<CircuitBoard className="size-4" />}
              label={{ en: "STEP-BY-STEP WIRING", ta: "படிப்படியான இணைப்பு" }}
            />
            <ol className="mt-6 flex flex-col gap-3">
              {week.steps.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-2xl glass p-5">
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
                </li>
              ))}
            </ol>
          </Reveal>
        )}

        {/* ---------------- Code ---------------- */}
        {week.code && (
          <Reveal>
            <SectionTitle
              icon={<CircuitBoard className="size-4" />}
              label={{ en: "THE CODE", ta: "குறியீடு" }}
            />
            <div className="mt-6">
              <CodeBlock
                filename={week.code.filename}
                code={week.code.content}
              />
            </div>
            {week.tinkercadUrl && (
              <a
                href={week.tinkercadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full glass px-5 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
              >
                <ExternalLink className="size-3.5 text-primary" />
                {t({ en: "Try it on Tinkercad", ta: "Tinkercad-இல் முயற்சிக்கவும்" })}
              </a>
            )}
          </Reveal>
        )}

        {/* ---------------- What students learned ---------------- */}
        {week.learned && week.learned.length > 0 && (
          <Reveal>
            <SectionTitle
              icon={<GraduationCap className="size-4" />}
              label={{ en: "WHAT STUDENTS LEARNED", ta: "மாணவர்கள் கற்றது" }}
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {week.learned.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-2xl glass p-4 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t(item)}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* ---------------- Photos ---------------- */}
        <Reveal>
          <SectionTitle
            icon={<Images className="size-4" />}
            label={{ en: "PHOTO HIGHLIGHTS", ta: "புகைப்பட சிறப்பம்சங்கள்" }}
          />
          {week.photos && week.photos.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {week.photos.map((photo) => (
                <img
                  key={photo}
                  src={asset(photo)}
                  alt={`Week ${week.number}`}
                  loading="lazy"
                  className="aspect-4/3 w-full rounded-xl object-cover ring-1 ring-hairline"
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="grid aspect-4/3 place-items-center rounded-xl glass text-xs text-faint"
                >
                  {t({ en: "Photo coming", ta: "புகைப்படம் விரைவில்" })}
                </div>
              ))}
            </div>
          )}

          {week.driveAlbumUrl && (
            <a
              href={week.driveAlbumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full glass px-5 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
            >
              <FolderOpen className="size-3.5 text-primary" />
              {t({ en: "View the full album", ta: "முழு ஆல்பத்தை காண" })}
            </a>
          )}
        </Reveal>

        {/* ---------------- Links ---------------- */}
        {week.links && week.links.length > 0 && (
          <Reveal>
            <SectionTitle
              icon={<ExternalLink className="size-4" />}
              label={{ en: "USEFUL LINKS", ta: "பயனுள்ள இணைப்புகள்" }}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {week.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full glass px-5 text-sm text-muted transition-colors hover:border-primary/40 hover:text-ink"
                >
                  {t(link.label)}
                  <ExternalLink className="size-3.5" />
                </a>
              ))}
            </div>
          </Reveal>
        )}

        {/* ---------------- Quiz ---------------- */}
        <Reveal>
          <div className="rounded-3xl glass-strong p-6 text-center sm:p-10">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              {t({
                en: `Week ${week.number} knowledge check`,
                ta: `வாரம் ${week.number} அறிவு சோதனை`,
              })}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              {t({
                en: "Enter your name and team, answer the questions, and your score is marked instantly.",
                ta: "உங்கள் பெயர் மற்றும் குழுவை உள்ளிட்டு, கேள்விகளுக்கு பதிலளிக்கவும் — மதிப்பெண் உடனடியாக கிடைக்கும்.",
              })}
            </p>

            {week.quizEmbedUrl ? (
              <iframe
                src={week.quizEmbedUrl}
                title={`Week ${week.number} quiz`}
                className="mt-8 h-[640px] w-full rounded-2xl bg-white"
                loading="lazy"
              />
            ) : (
              <p className="mt-6 rounded-2xl border border-dashed border-hairline-strong p-6 text-sm text-faint">
                {t({
                  en: "The quiz link hasn't been added yet — paste the Google Form embed URL into this week's entry in src/data/weeks.ts.",
                  ta: "வினாடி வினா இணைப்பு இன்னும் சேர்க்கப்படவில்லை.",
                })}
              </p>
            )}
          </div>
        </Reveal>

        {/* ---------------- Prev / next ---------------- */}
        <nav className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/weeks/${previous.number}`}
              className="group rounded-2xl glass p-5 transition-colors hover:border-primary/40"
            >
              <span className="mono-label">
                {t({ en: "PREVIOUS", ta: "முந்தையது" })}
              </span>
              <p className="mt-1.5 flex items-center gap-2 font-display font-semibold text-ink">
                <ArrowLeft className="size-4 text-primary transition-transform group-hover:-translate-x-1" />
                {t({ en: "Week", ta: "வாரம்" })} {previous.number}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/weeks/${next.number}`}
              className="group rounded-2xl glass p-5 text-right transition-colors hover:border-primary/40 sm:col-start-2"
            >
              <span className="mono-label">
                {t({ en: "NEXT", ta: "அடுத்தது" })}
              </span>
              <p className="mt-1.5 flex items-center justify-end gap-2 font-display font-semibold text-ink">
                {t({ en: "Week", ta: "வாரம்" })} {next.number}
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}

/** Small labelled heading used to separate the sections of a week page. */
function SectionTitle({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: { en: string; ta: string };
}) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
      <span className="text-primary">{icon}</span>
      <span className="mono-label">{t(label)}</span>
    </div>
  );
}
