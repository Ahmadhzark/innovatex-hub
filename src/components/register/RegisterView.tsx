"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, MailQuestion, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE } from "@/data/site";

const STEPS = [
  {
    icon: Users,
    title: { en: "Fill the form", ta: "படிவத்தை நிரப்புங்கள்" },
    text: {
      en: "Your name, school, age and team preference — takes under two minutes.",
      ta: "உங்கள் பெயர், பள்ளி, வயது மற்றும் குழு விருப்பம் — இரண்டு நிமிடத்திற்குள்.",
    },
  },
  {
    icon: MailQuestion,
    title: { en: "We confirm your spot", ta: "உங்கள் இடத்தை உறுதிப்படுத்துகிறோம்" },
    text: {
      en: "Team Science reviews every response and confirms by email or phone.",
      ta: "Team Science ஒவ்வொரு பதிலையும் மதிப்பாய்வு செய்து மின்னஞ்சல் அல்லது தொலைபேசி மூலம் உறுதிப்படுத்தும்.",
    },
  },
  {
    icon: CheckCircle2,
    title: { en: "Show up Week 1", ta: "வாரம் 1-க்கு வாருங்கள்" },
    text: {
      en: "Bring nothing but curiosity — every kit and component is provided.",
      ta: "ஆர்வத்தைத் தவிர வேறெதுவும் கொண்டு வர வேண்டாம் — ஒவ்வொரு கிட்டும் வழங்கப்படும்.",
    },
  },
];

/**
 * A thin, honest bridge to the real registration form. This page never
 * collects data itself — it hands off to a Google Form (see SITE.registrationFormUrl
 * in src/data/site.ts), keeping student data entirely inside Team Science's
 * private Google Sheet rather than duplicated in this repo.
 */
export function RegisterView() {
  const { t } = useLanguage();
  const [redirecting, setRedirecting] = useState(false);
  const formUrl = SITE.registrationFormUrl;
  const isOpen = formUrl.length > 0;

  useEffect(() => {
    if (!redirecting || !formUrl) return;
    const timer = setTimeout(() => {
      window.location.href = formUrl;
    }, 1100);
    return () => clearTimeout(timer);
  }, [redirecting, formUrl]);

  return (
    <>
      <PageHeader
        eyebrow={{ en: "REGISTRATION", ta: "பதிவு" }}
        title={{ en: "Join InnovateX 3.0", ta: "InnovateX 3.0-இல் சேருங்கள்" }}
        description={{
          en: "One short form and you're on the roster for a 7-week journey from a single LED to a working robot.",
          ta: "ஒரு சிறிய படிவம் — ஒரு LED-இலிருந்து செயல்படும் ரோபோ வரையிலான 7-வார பயணத்தில் சேருங்கள்.",
        }}
      />

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <Reveal>
          <GlassCard glow="primary" interactive={false} className="p-8 text-center sm:p-10">
            {isOpen ? (
              <>
                <p className="mono-label mb-3">
                  {t({ en: "STEP 1 OF 1", ta: "படி 1/1" })}
                </p>
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  {t({ en: "Ready when you are", ta: "நீங்கள் தயாராக இருக்கும்போது" })}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {t({
                    en: "This opens Team Science's official registration form in a new tab. Your details go straight to them — nothing is stored on this site.",
                    ta: "இது Team Science-இன் அதிகாரப்பூர்வ பதிவு படிவத்தை புதிய டேபில் திறக்கும். உங்கள் விவரங்கள் நேரடியாக அவர்களுக்குச் செல்லும் — இந்த தளத்தில் எதுவும் சேமிக்கப்படாது.",
                  })}
                </p>

                <button
                  type="button"
                  onClick={() => setRedirecting(true)}
                  disabled={redirecting}
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-void transition-shadow hover:shadow-[0_0_28px_-6px_var(--color-primary)] disabled:opacity-70"
                >
                  {redirecting
                    ? t({ en: "Opening form…", ta: "படிவம் திறக்கிறது…" })
                    : t({ en: "Open Registration Form", ta: "பதிவு படிவத்தைத் திற" })}
                  <ArrowUpRight className="size-4" />
                </button>

                {!redirecting && (
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-xs text-faint underline decoration-hairline underline-offset-4 hover:text-muted"
                  >
                    {t({ en: "Or open it directly in a new tab", ta: "அல்லது நேரடியாக புதிய டேபில் திறக்கவும்" })}
                  </a>
                )}
              </>
            ) : (
              <>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary/15 ring-1 ring-secondary/30">
                  <Clock3 className="size-6 text-secondary" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {t({ en: "Registration opens soon", ta: "பதிவு விரைவில் தொடங்கும்" })}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {t({
                    en: "Team Science hasn't opened the form yet. Check back shortly, or reach out directly below.",
                    ta: "Team Science இன்னும் படிவத்தைத் திறக்கவில்லை. விரைவில் மீண்டும் பார்க்கவும், அல்லது கீழே நேரடியாக தொடர்பு கொள்ளவும்.",
                  })}
                </p>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full glass px-8 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
                >
                  {t({ en: "Email Team Science", ta: "Team Science-க்கு மின்னஞ்சல்" })}
                </a>
              </>
            )}
          </GlassCard>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.08}>
              <div className="rounded-2xl glass p-5 text-center">
                <step.icon className="mx-auto size-5 text-primary" strokeWidth={1.8} />
                <h3 className="mt-3 font-display text-sm font-bold text-ink">
                  {t(step.title)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-faint">
                  {t(step.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
