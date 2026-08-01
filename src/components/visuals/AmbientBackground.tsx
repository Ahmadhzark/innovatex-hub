"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, non-interactive background stack rendered behind every page:
 *   1. Aurora gradient blooms (CSS-animated, GPU-friendly)
 *   2. Perspective grid that fades toward the horizon
 *   3. A subtle field of drifting "solder dot" particles on canvas
 *   4. A mouse-following light that reveals the grid underneath
 *
 * All layers are decorative and hidden from assistive tech.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  /* --- Mouse-responsive lighting ------------------------------------ */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip on touch devices — there's no meaningful pointer to follow.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.setProperty("--x", `${event.clientX}px`);
        glow.style.setProperty("--y", `${event.clientY}px`);
        glow.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* --- Drifting particle field -------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let dpr = 1;

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      hue: string;
      phase: number;
    };

    const palette = ["#4ade80", "#38bdf8", "#a855f7"];
    let particles: Particle[] = [];

    const seed = () => {
      // Scale count with viewport area, capped so phones stay smooth.
      const count = Math.min(60, Math.round((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.5,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        hue: palette[Math.floor(Math.random() * palette.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let time = 0;
    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges for an endless field.
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Gentle twinkle so the field feels alive, not static.
        const twinkle = 0.35 + Math.sin(time + p.phase) * 0.25;

        ctx.globalAlpha = Math.max(0.08, twinkle);
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-void" />

      {/* Aurora blooms */}
      <div className="absolute -top-[30%] -left-[15%] h-[70vh] w-[70vw] rounded-full bg-primary/12 blur-[130px] animate-aurora" />
      <div
        className="absolute top-[10%] -right-[20%] h-[65vh] w-[60vw] rounded-full bg-secondary/10 blur-[140px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-25%] left-[20%] h-[60vh] w-[65vw] rounded-full bg-accent/10 blur-[150px] animate-aurora"
        style={{ animationDelay: "-12s" }}
      />

      {/* Perspective grid, fading toward the horizon */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 78%)",
        }}
      />

      {/* Particle field */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mouse-responsive light */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(74,222,128,0.07), transparent 65%)",
        }}
      />

      {/* Vignette to seat content against the dark surface */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,8,22,0.85)_100%)]" />
    </div>
  );
}
