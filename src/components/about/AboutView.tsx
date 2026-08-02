"use client";

import { Mail, MapPin } from "lucide-react";
import { SITE, STATS } from "@/data/site";
import { WEEKS } from "@/data/weeks";
import { FAQS } from "@/data/faq";
import { Counter } from "@/components/ui/Counter";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function AboutView() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={{ en: "ABOUT", ta: "பற்றி" }}
        title={{ en: "InnovateX 3.0", ta: "InnovateX 3.0" }}
        description={{
          en: `A 7-week robotics and embedded systems program by ${SITE.organizer}, taking 100 students from their first circuit to a working AIoT build.`,
          ta: `${SITE.organizer} நடத்தும் 7-வார ரோபோட்டிக்ஸ் மற்றும் உட்பொதிவு அமைப்புகள் திட்டம் — 100 மாணவர்களை முதல் சுற்றிலிருந்து செயல்படும் AIoT திட்டம் வரை அழைத்துச் செல்கிறது.`,
        }}
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-20 px-5 pb-24 sm:px-8">
        {/* ---------------- Numbers ---------------- */}
        <Reveal className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <GlassCard
              key={stat.label.en}
              interactive={false}
              className="p-5 text-center"
            >
              <p className="font-display text-3xl font-bold text-ink">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mono-label mt-2">{t(stat.label)}</p>
            </GlassCard>
          ))}
        </Reveal>

        {/* ---------------- The program ---------------- */}
        <section>
          <SectionHeading
            align="left"
            eyebrow={{ en: "THE PROGRAM", ta: "திட்டம்" }}
            title={{ en: "How it works", ta: "இது எவ்வாறு செயல்படுகிறது" }}
          />

          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted">
            <p>
              {t({
                en: "Students arrive with no assumed background in electronics. Week 1 starts with a single LED and ends with that LED blinking under software control. By Week 7 each team is presenting an original AIoT build at a public exhibition.",
                ta: "மாணவர்கள் எலக்ட்ரானிக்ஸில் எந்த முன் அனுபவமும் இல்லாமல் வருகிறார்கள். வாரம் 1 ஒரு LED-உடன் தொடங்கி, அது சாஃப்ட்வேர் கட்டுப்பாட்டில் ஒளிர்வதுடன் முடிகிறது. வாரம் 7-இல் ஒவ்வொரு குழுவும் ஒரு அசல் AIoT திட்டத்தை வழங்குகிறது.",
              })}
            </p>
            <p>
              {t({
                en: "Every session has a written blueprint on this site: the goal, the circuit, the wiring steps, the code, who taught it, and photographs from the room. Nothing depends on a student having been present to catch up.",
                ta: "ஒவ்வொரு அமர்விற்கும் இந்த தளத்தில் எழுதப்பட்ட திட்டம் உள்ளது: இலக்கு, சுற்று, இணைப்பு படிகள், குறியீடு, யார் கற்பித்தார், மற்றும் புகைப்படங்கள்.",
              })}
            </p>
          </div>

          {/* Week strip */}
          <div className="mt-8 grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {WEEKS.map((week) => (
              <div
                key={week.number}
                className="rounded-xl glass p-3 text-center"
              >
                <p className="font-mono text-sm font-bold text-primary">
                  W{week.number}
                </p>
                <p className="mt-1 text-xs leading-tight text-faint">
                  {t(week.title)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Privacy ---------------- */}
        <section>
          <SectionHeading
            align="left"
            eyebrow={{ en: "STUDENT PRIVACY", ta: "மாணவர் தனியுரிமை" }}
            title={{ en: "What this site does and doesn't publish", ta: "இந்த தளம் எதை வெளியிடுகிறது" }}
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <GlassCard interactive={false} className="p-5">
              <p className="font-display text-sm font-bold text-primary">
                {t({ en: "Public on this site", ta: "இந்த தளத்தில் பொது" })}
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
                {[
                  { en: "Team names and first names", ta: "குழு பெயர்கள் மற்றும் முதல் பெயர்கள்" },
                  { en: "Attendance counts, not per-student records", ta: "வருகை எண்ணிக்கை, தனிநபர் பதிவுகள் அல்ல" },
                  { en: "Photographs shared with consent", ta: "ஒப்புதலுடன் பகிரப்பட்ட புகைப்படங்கள்" },
                ].map((item) => (
                  <li key={item.en} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard interactive={false} className="p-5">
              <p className="font-display text-sm font-bold text-secondary">
                {t({ en: "Kept private by the organiser", ta: "அமைப்பாளரால் தனிப்பட்டதாக வைக்கப்படுவது" })}
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
                {[
                  { en: "Registration details and contacts", ta: "பதிவு விவரங்கள் மற்றும் தொடர்புகள்" },
                  { en: "Per-student attendance", ta: "தனிநபர் வருகை" },
                  { en: "Individual quiz marks", ta: "தனிநபர் வினாடி வினா மதிப்பெண்கள்" },
                ].map((item) => (
                  <li key={item.en} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section>
          <SectionHeading
            align="left"
            eyebrow={{ en: "FAQ", ta: "கேள்விகள்" }}
            title={{ en: "Common questions", ta: "பொதுவான கேள்விகள்" }}
          />

          <div className="mt-8 flex flex-col divide-y divide-hairline overflow-hidden rounded-2xl glass">
            {FAQS.map((faq) => (
              <details
                key={faq.id}
                id={`faq-${faq.id}`}
                className="group scroll-mt-28 p-5 open:bg-white/2"
              >
                <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink marker:content-none">
                  {t(faq.question)}
                  <span className="shrink-0 text-lg text-faint transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(faq.answer)}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section>
          <GlassCard interactive={false} className="p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              {t({ en: "Get in touch", ta: "தொடர்பு கொள்ளுங்கள்" })}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
              {t({
                en: "Questions about the program, registration, or partnering with Team Science?",
                ta: "திட்டம், பதிவு, அல்லது Team Science-உடன் இணைவது பற்றி கேள்விகள் உள்ளதா?",
              })}
            </p>

            <div className="mt-7 flex justify-center">
              <MagneticButton href={`mailto:${SITE.contactEmail}`}>
                <Mail className="size-4" />
                {SITE.contactEmail}
              </MagneticButton>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-faint">
              <MapPin className="size-4" />
              {SITE.location}
            </p>
          </GlassCard>
        </section>

      </div>
    </>
  );
}
