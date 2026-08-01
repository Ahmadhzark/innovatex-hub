"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Builds a deterministic trace/pad layout from a label. Module-level and
 * pure: the same label always produces the same pattern, and no generator
 * state lives in render scope.
 */
function buildLayout(label: string) {
  let seed = 0;
  for (let i = 0; i < label.length; i++) {
    seed = (seed * 31 + label.charCodeAt(i)) % 9973;
  }
  const rand = (n: number) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed % n;
  };

  const traces = Array.from({ length: 7 }, () => {
    const y = 20 + rand(160);
    const bend = 60 + rand(180);
    const end = bend + 40 + rand(120);
    const drop = y + (rand(2) === 0 ? -1 : 1) * (20 + rand(50));
    return `M0 ${y} H${bend} L${bend + 24} ${drop} H${end}`;
  });

  const pads = Array.from({ length: 6 }, () => ({
    x: 40 + rand(320),
    y: 30 + rand(150),
  }));

  return { traces, pads };
}

/**
 * Shown when a component has no photograph yet. Rather than an empty box or a
 * broken image, we draw an on-brand "blueprint" plate: a PCB-style trace
 * pattern with the component name. It reads as a deliberate design choice.
 */
export function BlueprintFallback({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { traces, pads } = useMemo(() => buildLayout(label), [label]);

  return (
    <div
      className={cn(
        "@container relative flex h-full w-full items-center justify-center overflow-hidden",
        "bg-[linear-gradient(160deg,#0d1526,#070d1c)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 h-full w-full opacity-45"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`trace-${label}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#4ade80" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {traces.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={`url(#trace-${label})`}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        ))}

        {pads.map((pad, i) => (
          <g key={i}>
            <circle cx={pad.x} cy={pad.y} r="4.5" fill="none" stroke="#4ade80" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={pad.x} cy={pad.y} r="1.6" fill="#4ade80" fillOpacity="0.5" />
          </g>
        ))}
      </svg>

      {/* Grid wash */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* The label scales with the container: in a small chip there is only
          room for a chip icon, so the text is dropped rather than overflowing. */}
      <div className="relative z-10 flex max-w-full flex-col items-center gap-2 px-3 text-center">
        <span className="mono-label hidden @[13rem]:block">Component</span>
        <span className="hidden max-w-full truncate font-display text-sm font-semibold text-ink/85 @[8rem]:block @[13rem]:text-lg">
          {label}
        </span>
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-primary/70 @[8rem]:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        </svg>
      </div>
    </div>
  );
}
