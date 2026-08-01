"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { Box, ImageIcon, Loader2 } from "lucide-react";
import { getHardware, IMAGE_BLUR } from "@/data/hardware";
import { BlueprintFallback } from "./BlueprintFallback";
import { asset, cn } from "@/lib/utils";

// The 3D stack (three + fiber + drei) is ~450KB — never in the initial bundle.
// It only downloads when a visitor actually switches a component into 3D.
const ModelViewer = lazy(() =>
  import("./ModelViewer").then((m) => ({ default: m.ModelViewer })),
);

type HardwareVisualProps = {
  slug: string;
  /** Use the 640px asset instead of the 1400px one. */
  size?: "sm" | "full";
  className?: string;
  /** Hide the "View in 3D" affordance even when a model exists. */
  disable3D?: boolean;
  priority?: boolean;
};

/**
 * The single way hardware is shown anywhere on the site.
 *
 * Resolution order:
 *   1. Interactive 3D model, if the visitor opts in and a GLB exists
 *   2. Real photograph (WebP, blur-up, lazy)
 *   3. Generated blueprint plate, so nothing is ever a broken image
 *
 * Photos are shot on light backgrounds, so they sit on a deliberate light
 * "plinth" — the same treatment every time, which is what makes a mixed
 * set of source photography read as one consistent system.
 */
export function HardwareVisual({
  slug,
  size = "full",
  className,
  disable3D = false,
  priority = false,
}: HardwareVisualProps) {
  const item = getHardware(slug);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [show3D, setShow3D] = useState(false);

  // A cached image can finish loading before React attaches onLoad, which
  // would leave it stuck at opacity 0. Checking `complete` in a ref callback
  // catches that case; onLoad still handles the normal path.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  const label = item?.name ?? slug;
  const hasPhoto = Boolean(item?.photo) && !failed;
  const hasModel = Boolean(item?.model) && !disable3D;

  const src = asset(
    `/images/hardware/${slug}${size === "sm" ? "-sm" : ""}.webp`,
  );
  const blur = IMAGE_BLUR[slug];

  return (
    <div
      className={cn(
        "group/vis relative isolate overflow-hidden rounded-2xl",
        className,
      )}
    >
      {show3D && item?.model ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-abyss">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          }
        >
          <ModelViewer file={item.model} label={label} />
        </Suspense>
      ) : hasPhoto ? (
        <>
          {/* Blur-up placeholder — swapped out once the real photo decodes */}
          {blur && !loaded && (
            <img
              src={blur}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
            />
          )}

          {/* Light plinth so white-background product shots sit deliberately
              on the dark canvas instead of looking like a mistake. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#f8fafc,#cbd5e1)]" />

          <img
            ref={imgRef}
            src={src}
            alt={label}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={cn(
              "relative h-full w-full object-contain p-6 mix-blend-multiply",
              "transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
              loaded ? "opacity-100" : "opacity-0",
              "group-hover/vis:scale-[1.04]",
            )}
          />

          {/* Tint the plinth toward the brand so it never reads as plain white */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 mix-blend-overlay" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
        </>
      ) : (
        <BlueprintFallback label={label} />
      )}

      {/* 3D toggle — always visible (most visitors are on touch, where
          hover never reliably fires). On a mouse/trackpad it fades in on
          hover instead, so photo cards stay clean until you point at one. */}
      {hasModel && (
        <button
          type="button"
          onClick={() => setShow3D((v) => !v)}
          className={cn(
            "absolute bottom-2.5 right-2.5 z-20 inline-flex min-h-11 items-center gap-1.5 rounded-full",
            "glass-strong px-3.5 text-xs font-semibold text-ink",
            "opacity-100 transition-opacity duration-300",
            "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/vis:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100",
          )}
        >
          {show3D ? (
            <>
              <ImageIcon className="size-3.5" /> Photo
            </>
          ) : (
            <>
              <Box className="size-3.5 text-primary" /> View in 3D
            </>
          )}
        </button>
      )}
    </div>
  );
}
