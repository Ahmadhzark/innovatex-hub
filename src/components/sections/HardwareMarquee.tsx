"use client";

import { HARDWARE } from "@/data/hardware";
import { HardwareVisual } from "@/components/hardware/HardwareVisual";

// A representative slice of the kit, in a deliberate visual order.
const SHOWCASE = [
  "esp32",
  "breadboard",
  "ultrasonic-sensor",
  "servo-motor",
  "arduino-uno",
  "resistor",
  "temperature-sensor",
  "led",
  "raspberry-pi-pico",
  "stepper-motor",
  "multimeter",
  "pcb",
];

/**
 * An infinite ribbon of the actual hardware students will hold.
 * The track is duplicated so the CSS translate loop is seamless.
 */
export function HardwareMarquee() {
  const items = SHOWCASE.map(
    (slug) => HARDWARE.find((h) => h.slug === slug),
  ).filter(Boolean);

  const track = [...items, ...items];

  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto mb-8 max-w-7xl px-5 sm:px-8">
        <p className="mono-label">The kit · 20+ components</p>
      </div>

      <div className="relative">
        {/* Edge fades so the ribbon dissolves instead of cutting off */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent sm:w-40" />

        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <figure
              key={`${item!.slug}-${i}`}
              className="group w-44 shrink-0 sm:w-52"
            >
              <HardwareVisual
                slug={item!.slug}
                size="sm"
                disable3D
                className="aspect-4/3 rounded-2xl"
              />
              <figcaption className="mt-3 px-1">
                <p className="font-display text-sm font-semibold text-ink">
                  {item!.name}
                </p>
                {item!.spec && (
                  <p className="mono-label mt-1">{item!.spec}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
