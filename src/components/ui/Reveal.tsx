"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction the content travels in from. */
  from?: "bottom" | "left" | "right" | "none";
  /** Seconds to wait before animating — use to stagger siblings. */
  delay?: number;
  /** Adds a blur-to-sharp transition for a softer entrance. */
  blur?: boolean;
  as?: "div" | "section" | "li" | "article";
  /** Passed straight through — for scroll-to-anchor targets (e.g. search deep links). */
  id?: string;
};

const OFFSET = {
  bottom: { y: 28, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
  none: { y: 0, x: 0 },
};

/**
 * Scroll-triggered entrance animation. Fires once when ~15% of the element
 * enters the viewport, so content never animates repeatedly while scrolling.
 *
 * When the visitor prefers reduced motion, content is rendered in its final
 * state immediately — no transform, no blur, no fade.
 */
export function Reveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  blur = true,
  as = "div",
  id,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSET[from];
  const MotionTag = motion[as];

  // The rendered tree stays identical whether or not motion is reduced —
  // only the transition duration changes. Branching on `reduceMotion` here
  // would change the SSR markup and cause a hydration mismatch, because the
  // server cannot know the visitor's motion preference.
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // `margin` starts the animation slightly before the element is fully
      // on screen, so content is settled by the time it is centred.
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
