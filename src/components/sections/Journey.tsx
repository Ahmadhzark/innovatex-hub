"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { JOURNEY } from "@/data/program";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * The LED -> ESP32 timeline. A vertical rail fills as the section scrolls,
 * with cards alternating sides on desktop and stacking on mobile.
 */
export function Journey() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 60%"],
  });
  // Smooth the raw scroll value so the rail glides rather than snaps.
  const railScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={{ en: "THE JOURNEY", ta: "பயணம்" }}
          title={{
            en: "Seven steps, nothing skipped",
            ta: "ஏழு படிகள், எதுவும் தவிர்க்கப்படவில்லை",
          }}
          description={{
            en: "Every concept builds directly on the one before it. No step assumes knowledge a student hasn't been given yet.",
            ta: "ஒவ்வொரு கருத்தும் முந்தையதன் மீது கட்டமைக்கப்படுகிறது. மாணவருக்கு இன்னும் வழங்கப்படாத அறிவை எந்த படியும் எதிர்பார்க்காது.",
          }}
        />

        <div ref={containerRef} className="relative mt-20">
          {/* Rail — left on mobile, centred on desktop */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-hairline lg:left-1/2 lg:-translate-x-1/2">
            <motion.div
              style={{ scaleY: railScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-primary via-secondary to-accent"
            />
          </div>

          <ol className="flex flex-col gap-12 lg:gap-20">
            {JOURNEY.map((step, i) => {
              const flipped = i % 2 === 1;

              return (
                <li
                  key={step.id}
                  className="relative pl-14 lg:grid lg:grid-cols-2 lg:gap-14 lg:pl-0"
                >
                  {/* Node */}
                  <span
                    className={cn(
                      "absolute left-0 top-1 grid size-10 place-items-center rounded-full",
                      "glass-strong font-mono text-xs font-bold text-primary",
                      "lg:left-1/2 lg:-translate-x-1/2",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                    <span className="absolute inset-0 -z-10 rounded-full bg-primary/25 blur-md" />
                  </span>

                  {/* Copy */}
                  <Reveal
                    from={flipped ? "right" : "left"}
                    className={cn(
                      "lg:col-span-1",
                      flipped ? "lg:order-2 lg:pl-14" : "lg:order-1 lg:pr-14 lg:text-right",
                    )}
                  >
                    <h3 className="font-display text-2xl font-bold sm:text-3xl">
                      {t(step.title)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {t(step.description)}
                    </p>
                    {step.href && (
                      // -mx-2 / py-2 grows the tap area to ~44px without
                      // shifting the visible text out of the text column.
                      <Link
                        href={step.href}
                        className={cn(
                          "-mx-2 mt-2 inline-flex min-h-11 items-center gap-1.5 px-2 py-2 text-sm font-semibold text-primary",
                          "transition-opacity hover:opacity-80",
                        )}
                      >
                        {t({ en: "Open lesson", ta: "பாடத்தை திற" })}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    )}
                  </Reveal>

                  {/* Visual */}
                  <Reveal
                    from={flipped ? "left" : "right"}
                    delay={0.1}
                    className={cn(
                      "mt-6 lg:mt-0",
                      flipped ? "lg:order-1 lg:pr-14" : "lg:order-2 lg:pl-14",
                    )}
                  >
                    <HardwareVisual
                      slug={step.hardware}
                      size="sm"
                      className="aspect-16/10 rounded-2xl"
                    />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
