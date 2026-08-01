"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  /** How far the button drifts toward the cursor, in pixels. */
  strength?: number;
};

/**
 * A button that subtly leans toward the pointer, then springs back on exit.
 * Falls back to a plain button/link on touch devices and reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 8,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event: React.PointerEvent) => {
    const node = ref.current;
    if (!node) return;
    // Only fine pointers get the magnetic effect.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set((offsetX / rect.width) * strength * 2);
    y.set((offsetY / rect.height) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
    "px-7 py-3.5 text-sm font-semibold tracking-tight",
    "transition-colors duration-300",
    variant === "primary"
      ? "bg-primary text-void shadow-[0_0_28px_-6px_var(--color-primary)] hover:shadow-[0_0_40px_-4px_var(--color-primary)]"
      : "glass text-ink hover:border-primary/40",
    className,
  );

  const content = (
    <>
      {/* Sheen that sweeps across on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700",
          hovered && "translate-x-full",
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const motionProps = {
    style: { x: springX, y: springY },
    onPointerMove: handleMove,
    onPointerEnter: () => setHovered(true),
    onPointerLeave: reset,
    className: styles,
  };

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div style={motionProps.style} className="inline-flex">
        <Link
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          onPointerMove={handleMove}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={reset}
          className={styles}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
