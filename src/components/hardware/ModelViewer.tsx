"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Html } from "@react-three/drei";
import { Loader2 } from "lucide-react";
import { asset } from "@/lib/utils";
import { ProceduralBoard } from "./ProceduralBoard";

/** Renders a real GLB once one has been added to public/models/. */
function GltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Fallback() {
  return (
    <Html center>
      <span className="flex items-center gap-2 text-xs text-muted">
        <Loader2 className="size-4 animate-spin text-primary" />
        Loading model…
      </span>
    </Html>
  );
}

/**
 * Interactive 3D component viewer.
 *
 * If public/models/<file> exists it is loaded and displayed. Until a real
 * GLB is dropped in, a procedurally generated development board stands in,
 * so the 3D experience is genuine rather than a placeholder image.
 */
export function ModelViewer({ file, label }: { file: string; label: string }) {
  const url = asset(`/models/${file}`);
  const [hasModel, setHasModel] = useState<boolean | null>(null);

  // Probe for the GLB rather than letting the loader throw on a 404.
  useEffect(() => {
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        // A GitHub Pages 404 returns an HTML page with status 200 in some
        // configurations, so check the content type too.
        const ok = res.ok && !type.includes("text/html");
        if (!cancelled) setHasModel(ok);
      })
      .catch(() => {
        if (!cancelled) setHasModel(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (hasModel === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-abyss">
        <Loader2 className="size-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_50%_40%,#12203a,#060b18)]">
      <Canvas
        camera={{ position: [0, 2.2, 4.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Fallback />}>
          <Stage
            intensity={0.5}
            environment="city"
            adjustCamera={hasModel ? 1.1 : false}
            shadows={false}
          >
            {hasModel ? <GltfModel url={url} /> : <ProceduralBoard />}
          </Stage>
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={2.4}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.9}
          // Keep the board from flipping fully upside down.
          minPolarAngle={0.4}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>

      {/* Right padding keeps this clear of the photo/3D toggle button. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3 pr-28">
        <span className="mono-label truncate">{label}</span>
        <span className="mono-label hidden whitespace-nowrap sm:inline">
          drag to rotate
        </span>
      </div>

      {!hasModel && (
        <span className="pointer-events-none absolute left-4 top-3 mono-label text-primary/70">
          reference model
        </span>
      )}
    </div>
  );
}
