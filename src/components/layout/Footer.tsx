"use client";

import Link from "next/link";
import { CircuitBoard, Mail, MapPin } from "lucide-react";
import { SITE } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

const COLUMNS = [
  {
    heading: { en: "Learn", ta: "கற்றல்" },
    links: [
      { href: "/learn", label: { en: "Learn Academy", ta: "கற்றல் அகாடமி" } },
      { href: "/learn/electricity", label: { en: "Electricity", ta: "மின்சாரம்" } },
      { href: "/learn/led", label: { en: "The LED", ta: "LED" } },
      { href: "/learn/breadboard", label: { en: "Breadboard", ta: "பிரெட்போர்டு" } },
    ],
  },
  {
    heading: { en: "Program", ta: "திட்டம்" },
    links: [
      { href: "/weeks", label: { en: "All Weeks", ta: "அனைத்து வாரங்கள்" } },
      { href: "/portal", label: { en: "Learning Portal", ta: "கற்றல் போர்ட்டல்" } },
      { href: "/projects", label: { en: "Projects", ta: "திட்டங்கள்" } },
      { href: "/team", label: { en: "Resource Persons", ta: "பயிற்றுநர்கள்" } },
    ],
  },
  {
    heading: { en: "More", ta: "மேலும்" },
    links: [
      { href: "/about", label: { en: "About", ta: "பற்றி" } },
      { href: "/gallery", label: { en: "Gallery", ta: "படத்தொகுப்பு" } },
      { href: "/about#credits", label: { en: "Image Credits", ta: "பட உரிமை" } },
    ],
  },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 mt-24 border-t border-hairline">
      {/* Luminous top edge */}
      <div className="absolute inset-x-0 -top-px h-px hairline-glow" />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-void">
                <CircuitBoard className="size-4.5" strokeWidth={2.4} />
              </span>
              <span className="font-display text-[15px] font-bold text-ink">
                InnovateX <span className="text-primary">3.0</span>
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {t({
                en: "A 7-week robotics and embedded systems journey — from a single LED to a working ESP32 build, for 100 students across 10 teams.",
                ta: "7 வார ரோபோட்டிக்ஸ் மற்றும் உட்பொதிக்கப்பட்ட அமைப்புகள் பயணம் — ஒரு LED-லிருந்து செயல்படும் ESP32 திட்டம் வரை.",
              })}
            </p>

            <div className="mt-5 flex flex-col gap-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {SITE.location}
              </span>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="-my-2.5 inline-flex min-h-11 items-center gap-2 py-2.5 transition-colors hover:text-primary"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                {SITE.contactEmail}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((column) => (
            <div key={column.heading.en}>
              <h5 className="mono-label mb-4">{t(column.heading)}</h5>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {/* py-3 makes each link a full 44px tap target without
                        changing the visual gap between lines. */}
                    <Link
                      href={link.href}
                      className="inline-block min-h-11 py-3 text-sm text-muted transition-colors hover:text-primary"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {SITE.year} {SITE.organizer} · {SITE.name}
          </p>
          <p className="text-xs text-faint">
            {t({
              en: "Built for 100 young engineers",
              ta: "100 இளம் பொறியாளர்களுக்காக",
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
