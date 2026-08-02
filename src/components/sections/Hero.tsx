"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { HighlightsGallery } from "@/components/sections/HighlightsGallery";
import { useLanguage } from "@/components/providers/LanguageProvider";

const FLOATING = [
  { slug: "resistor", className: "left-[2%] top-[14%] w-24 sm:w-32", delay: 0 },
  { slug: "led", className: "right-[3%] top-[8%] w-20 sm:w-28", delay: 1.2 },
  { slug: "ultrasonic-sensor", className: "left-[6%] bottom-[12%] w-24 sm:w-32", delay: 2.1 },
  { slug: "servo-motor", className: "right-[5%] bottom-[16%] w-24 sm:w-32", delay: 0.7 },
];

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  // Parallax: the hero content drifts up and fades as the page scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const boardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Floating hardware — decorative, hidden on small screens to keep focus */}
      {FLOATING.map((item) => (
        <motion.div
          key={item.slug}
          aria-hidden
          className={`pointer-events-none absolute hidden opacity-30 blur-[1px] md:block ${item.className}`}
          animate={{ y: [0, -18, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <HardwareVisual
            slug={item.slug}
            size="sm"
            disable3D
            className="aspect-square rounded-3xl"
          />
        </motion.div>
      ))}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
        >
          <Sparkles className="size-3.5 text-primary" />
          <span className="text-xs font-medium text-muted">
            {t({
              en: "7-Week Robotics & Embedded Systems Program",
              ta: "7-வார ரோபோட்டிக்ஸ் & உட்பொதிவு அமைப்புகள் திட்டம்",
            })}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 text-[clamp(2.75rem,8vw,6.5rem)] font-bold"
        >
          <span className="block text-ink">
            {t({ en: "From a single LED", ta: "ஒரு LED-லிருந்து" })}
          </span>
          <span className="block text-gradient">
            {t({ en: "to a working robot.", ta: "செயல்படும் ரோபோ வரை." })}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t({
            en: "InnovateX 3.0 is a hands-on engineering journey through electronics, sensors, embedded code and IoT — built around the ESP32, taught by Team Science.",
            ta: "InnovateX 3.0 என்பது எலக்ட்ரானிக்ஸ், சென்சார்கள், உட்பொதிக்கப்பட்ட குறியீடு மற்றும் IoT வழியாக ஒரு நேரடி பொறியியல் பயணம் — ESP32-ஐ மையமாகக் கொண்டது.",
          })}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="/learn">
            {t({ en: "Start Learning", ta: "கற்க தொடங்கு" })}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href="/weeks" variant="ghost">
            <Cpu className="size-4 text-primary" />
            {t({ en: "View the 7 Weeks", ta: "7 வாரங்களை காண" })}
          </MagneticButton>
        </motion.div>

        {/* Workshop highlights */}
        <motion.div
          style={{ y: boardY }}
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <HighlightsGallery />
        </motion.div>
      </motion.div>

      {/* Fade into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
      />
    </section>
  );
}
