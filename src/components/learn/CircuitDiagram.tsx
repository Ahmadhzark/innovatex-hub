"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export type WireColor = "power" | "ground" | "signal" | "signal2";

export type CircuitDiagramData = {
  controller: string;
  controllerPins: string[];
  device: string;
  devicePins: string[];
  /** Which controller pin connects to which device pin, and what kind of wire it is. */
  links: Array<{ from: string; to: string; color: WireColor }>;
};

const WIRE_COLOR: Record<WireColor, string> = {
  power: "#ef4444",
  ground: "#94a3b8",
  signal: "#4ade80",
  signal2: "#38bdf8",
};

const LEGEND: Array<{ color: WireColor; label: { en: string; ta: string } }> = [
  { color: "power", label: { en: "Power (+)", ta: "பவர் (+)" } },
  { color: "ground", label: { en: "Ground", ta: "கிரவுண்ட்" } },
  { color: "signal", label: { en: "Signal", ta: "சிக்னல்" } },
  { color: "signal2", label: { en: "Signal 2", ta: "சிக்னல் 2" } },
];

const ROW_H = 42;
const TOP_PAD = 34;
const BOX_W = 168;

/**
 * A generic, data-driven wiring blueprint: a controller box on the left, a
 * component box on the right, each listing their pins, connected by colour-
 * coded wires. Not a photorealistic breadboard render — a clean schematic,
 * consistent with every diagram already used across the site.
 */
export function CircuitDiagram({ data }: { data: CircuitDiagramData }) {
  const { t } = useLanguage();
  const rows = Math.max(data.controllerPins.length, data.devicePins.length);
  const height = TOP_PAD * 2 + rows * ROW_H;
  const width = 560;
  const leftX = 20;
  const rightX = width - 20 - BOX_W;

  const pinY = (index: number) => TOP_PAD + index * ROW_H + ROW_H / 2;

  const usedColors = new Set(data.links.map((l) => l.color));

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-[#04070f] p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto"
          style={{ minWidth: 420, width: "100%", maxWidth: 560 }}
        >
          {/* Faint grid, matching the site's blueprint motif */}
          <defs>
            <pattern id="cd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#1d2e63" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#cd-grid)" opacity="0.4" />

          {/* Wires — drawn first so the boxes sit on top */}
          {data.links.map((link, i) => {
            const fromIndex = data.controllerPins.indexOf(link.from);
            const toIndex = data.devicePins.indexOf(link.to);
            if (fromIndex === -1 || toIndex === -1) return null;
            const x1 = leftX + BOX_W;
            const y1 = pinY(fromIndex);
            const x2 = rightX;
            const y2 = pinY(toIndex);
            const midX = (x1 + x2) / 2;
            return (
              <path
                key={i}
                d={`M${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={WIRE_COLOR[link.color]}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Controller box */}
          <rect
            x={leftX}
            y={8}
            width={BOX_W}
            height={height - 16}
            rx="12"
            fill="#0b1220"
            stroke="#10B981"
            strokeWidth="1.5"
          />
          <text x={leftX + BOX_W / 2} y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4ade80">
            {data.controller}
          </text>
          {data.controllerPins.map((pin, i) => (
            <g key={pin}>
              <circle cx={leftX + BOX_W} cy={pinY(i)} r="4" fill="#4ade80" />
              <text
                x={leftX + BOX_W - 10}
                y={pinY(i) + 4}
                textAnchor="end"
                fontSize="11"
                fontFamily="monospace"
                fill="#e2e8f0"
              >
                {pin}
              </text>
            </g>
          ))}

          {/* Device box */}
          <rect
            x={rightX}
            y={8}
            width={BOX_W}
            height={height - 16}
            rx="12"
            fill="#0b1220"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <text x={rightX + BOX_W / 2} y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#38bdf8">
            {data.device}
          </text>
          {data.devicePins.map((pin, i) => (
            <g key={pin}>
              <circle cx={rightX} cy={pinY(i)} r="4" fill="#38bdf8" />
              <text
                x={rightX + 10}
                y={pinY(i) + 4}
                textAnchor="start"
                fontSize="11"
                fontFamily="monospace"
                fill="#e2e8f0"
              >
                {pin}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend — only the wire types actually used in this diagram */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-hairline pt-4">
        {LEGEND.filter((item) => usedColors.has(item.color)).map((item) => (
          <span key={item.color} className="inline-flex items-center gap-2 text-xs text-muted">
            <span
              className="h-0.5 w-5 rounded-full"
              style={{ backgroundColor: WIRE_COLOR[item.color] }}
            />
            {t(item.label)}
          </span>
        ))}
      </div>
    </div>
  );
}
