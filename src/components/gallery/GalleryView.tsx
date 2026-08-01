"use client";

import Link from "next/link";
import { ArrowRight, Camera, Users } from "lucide-react";
import { WEEKS } from "@/data/weeks";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/utils";

/** Ten teams of ten students. Names are filled in as teams form. */
const TEAMS = Array.from({ length: 10 }, (_, i) => ({
  number: i + 1,
  name: `Team ${i + 1}`,
}));

export function GalleryView() {
  const { t } = useLanguage();

  const weeksWithPhotos = WEEKS.filter(
    (week) => week.photos && week.photos.length > 0,
  );

  return (
    <>
      <PageHeader
        eyebrow={{ en: "GALLERY", ta: "படத்தொகுப்பு" }}
        title={{ en: "From the workshop floor", ta: "பட்டறை தளத்திலிருந்து" }}
        description={{
          en: "Session photographs and the ten teams building their way through the program.",
          ta: "அமர்வு புகைப்படங்கள் மற்றும் திட்டத்தின் வழியாக கட்டமைக்கும் பத்து குழுக்கள்.",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-5 pb-24 sm:px-8">
        {/* ---------------- Session photos ---------------- */}
        <section>
          <SectionHeading
            align="left"
            eyebrow={{ en: "SESSIONS", ta: "அமர்வுகள்" }}
            title={{ en: "Week by week", ta: "வாரம் வாரமாக" }}
          />

          {weeksWithPhotos.length > 0 ? (
            <div className="mt-8 flex flex-col gap-12">
              {weeksWithPhotos.map((week) => (
                <div key={week.number}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-ink">
                      {t({ en: "Week", ta: "வாரம்" })} {week.number} —{" "}
                      {t(week.title)}
                    </h3>
                    <Link
                      href={`/weeks/${week.number}`}
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:opacity-80"
                    >
                      {t({ en: "Open week", ta: "வாரத்தை திற" })}
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {week.photos!.map((photo) => (
                      <img
                        key={photo}
                        src={asset(photo)}
                        alt={`Week ${week.number}`}
                        loading="lazy"
                        className="aspect-4/3 w-full rounded-xl object-cover ring-1 ring-hairline"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Reveal className="mt-8">
              <GlassCard
                interactive={false}
                className="flex flex-col items-center gap-4 p-12 text-center"
              >
                <Camera className="size-8 text-faint" strokeWidth={1.4} />
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    {t({
                      en: "Photos land here after each session",
                      ta: "ஒவ்வொரு அமர்விற்குப் பிறகும் புகைப்படங்கள் இங்கே வரும்",
                    })}
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                    {t({
                      en: "Highlights are shown on each week's page, with a link to the full album.",
                      ta: "சிறப்பம்சங்கள் ஒவ்வொரு வார பக்கத்திலும் காட்டப்படும், முழு ஆல்பத்திற்கான இணைப்புடன்.",
                    })}
                  </p>
                </div>
                <Link
                  href="/weeks"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full glass px-5 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
                >
                  {t({ en: "Browse the weeks", ta: "வாரங்களை உலாவு" })}
                  <ArrowRight className="size-4" />
                </Link>
              </GlassCard>
            </Reveal>
          )}
        </section>

        {/* ---------------- Teams ---------------- */}
        <section>
          <SectionHeading
            align="left"
            eyebrow={{ en: "THE TEAMS", ta: "குழுக்கள்" }}
            title={{ en: "Ten teams of ten", ta: "பத்து பேர் கொண்ட பத்து குழுக்கள்" }}
            description={{
              en: "Each team works together for all seven weeks and presents one final build at the exhibition.",
              ta: "ஒவ்வொரு குழுவும் ஏழு வாரங்களும் ஒன்றாக வேலை செய்து, கண்காட்சியில் ஒரு இறுதி திட்டத்தை வழங்குகிறது.",
            }}
          />

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TEAMS.map((team, i) => (
              <Reveal key={team.number} delay={(i % 5) * 0.05}>
                <GlassCard glow="primary" className="p-5 text-center">
                  <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-primary/12 font-mono text-sm font-bold text-primary ring-1 ring-primary/25">
                    {String(team.number).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-display text-sm font-bold text-ink">
                    {team.name}
                  </p>
                  <p className="mono-label mt-1 inline-flex items-center gap-1">
                    <Users className="size-3" />
                    10
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Hardware showcase ---------------- */}
        <section>
          <SectionHeading
            align="left"
            eyebrow={{ en: "THE KIT", ta: "கிட்" }}
            title={{ en: "What students work with", ta: "மாணவர்கள் பயன்படுத்துவது" }}
          />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              "esp32",
              "arduino-uno",
              "breadboard",
              "ultrasonic-sensor",
              "servo-motor",
              "resistor",
              "led",
              "temperature-sensor",
              "multimeter",
              "oscilloscope",
            ].map((slug, i) => (
              <Reveal key={slug} delay={(i % 5) * 0.05}>
                <HardwareVisual
                  slug={slug}
                  size="sm"
                  disable3D
                  className="aspect-square rounded-2xl"
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
