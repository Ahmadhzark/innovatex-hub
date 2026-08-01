"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Animation length in milliseconds. */
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 * Uses an eased rAF loop rather than a linear interval so the number
 * decelerates as it lands.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion snaps straight to the final value; both paths update
    // inside a frame callback rather than synchronously in the effect body.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (reduce) {
        setDisplay(value);
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));

      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
