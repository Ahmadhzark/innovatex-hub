# Adding interactive 3D models

Components can be inspected in 3D — students drag to rotate the board and see it from any angle. This is optional and per-component.

## How it behaves today

Components with a `model` set in `src/data/hardware.ts` show a **"View in 3D"** button on hover.

Because no real `.glb` files ship with the repo yet, that button currently opens a **procedurally generated reference board** — an actual 3D model built from code (PCB, chip, gold pin headers, USB port, status LEDs), labelled "reference model". It rotates, it's genuinely interactive, and it costs a few kilobytes.

Drop a real `.glb` in and it takes over automatically. No code changes.

---

## Adding a real model

1. Put the file in `public/models/` using the exact filename listed in `hardware.ts`:

   | Component | Expected filename |
   |---|---|
   | ESP32 | `public/models/esp32.glb` |
   | Arduino Uno | `public/models/arduino-uno.glb` |
   | Breadboard | `public/models/breadboard.glb` |
   | HC-SR04 | `public/models/hc-sr04.glb` |
   | DHT11 | `public/models/dht11.glb` |
   | Servo motor | `public/models/servo.glb` |

2. Commit and push. That's it — the viewer detects the file and loads it.

To add 3D to a component that doesn't have it yet, add a `model` field to its entry:

```ts
{
  slug: "multimeter",
  name: "Multimeter",
  // …
  model: "multimeter.glb",
},
```

---

## Where to get models

Free sources with licences that permit reuse:

- **[Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b&q=arduino&type=models)** — filter by *Downloadable* + *CC Attribution*
- **[GrabCAD](https://grabcad.com)** — engineering-accurate, but usually STEP/STL (needs converting)
- **[Poly Haven](https://polyhaven.com)** — no components, but good for materials
- **Manufacturer sites** — Espressif and Arduino publish CAD for several boards

Check the licence before using anything, and add the attribution to `src/data/image-credits.json` so it shows on **/about#credits** alongside the photography.

---

## Preparing the file

Models from CAD sites are often far too heavy for a web page. Target **under 2MB**, ideally under 500KB.

The quickest route is [gltf.report](https://gltf.report):

1. Drag your `.glb` in
2. Use the transform panel to apply **Draco compression** and **resize textures** to 1024px or 512px
3. Export and use that file

Or from the command line:

```bash
npx @gltf-transform/cli optimize input.glb output.glb --compress draco --texture-size 1024
```

Rules of thumb:

- Under 100k triangles
- Textures 1024px or smaller
- Draco compression on
- Convert STL/STEP to GLB in [Blender](https://blender.org) first (File → Export → glTF 2.0)

---

## Why it doesn't slow the site down

The 3D stack (three.js + react-three-fiber + drei, roughly 450KB) is **not in the initial bundle**. It's dynamically imported the first time someone actually taps "View in 3D".

A visitor who never uses 3D never downloads any of it. The `.glb` files themselves are only fetched on demand too.

That's why models must live in `public/models/` rather than being imported in code — imports would pull them into the build graph and defeat the lazy loading.

---

## Checking it worked

```bash
npm run dev
```

Open any page with that component, hover the image, click **View in 3D**.

- **Model appears, rotating** — done.
- **Still says "reference model"** — the filename doesn't match, or the file isn't in `public/models/`. Check the browser's Network tab for a 404.
- **Blank panel** — the GLB is probably corrupt or uses an unsupported extension. Re-export it through [gltf.report](https://gltf.report).
- **Model is enormous or microscopic** — it was authored in different units. Scale it in Blender before exporting; the viewer frames the model but doesn't normalise wild scale differences.
