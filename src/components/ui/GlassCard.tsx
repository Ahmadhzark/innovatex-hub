"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  /** Adds a colored glow that blooms on hover. */
  glow?: "primary" | "secondary" | "accent" | "none";
  /** Lifts the card and brightens its border on hover. */
  interactive?: boolean;
  children?: React.ReactNode;
};

const GLOW_STYLES: Record<string, string> = {
  primary: "before:bg-primary/18 hover:border-primary/35",
  secondary: "before:bg-secondary/18 hover:border-secondary/35",
  accent: "before:bg-accent/18 hover:border-accent/35",
  none: "",
};

/**
 * The workhorse surface for the whole site: a glass panel with an optional
 * bloom that fades in behind it on hover.
 */
export function GlassCard({
  glow = "none",
  interactive = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl glass",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
        // The bloom lives on a pseudo-element so it never affects layout.
        glow !== "none" &&
          "before:absolute before:-inset-24 before:-z-10 before:rounded-full before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        GLOW_STYLES[glow],
        interactive && "hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
