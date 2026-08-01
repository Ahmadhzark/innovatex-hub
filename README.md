# InnovateX 3.0

The website for **InnovateX 3.0** — a 7-week robotics and embedded systems workshop by **Team Science**, for 100 students across 10 teams.

Built with Next.js, TypeScript, Tailwind CSS and Framer Motion. Exports to fully static HTML and deploys free on GitHub Pages.

---

## Quick start

```bash
npm install          # once
npm run dev          # http://localhost:3000
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint |
| `npm run images:fetch` | Download component photos from Wikimedia Commons |
| `npm run images:optimize` | Convert them to WebP + generate blur placeholders |

---

## Go live on GitHub Pages

1. **Create the repo** — [github.com/new](https://github.com/new), name it `innovatex-hub`, keep it **Public**.

2. **Push this project** to that repo's `main` branch.

3. **Turn on Pages** — repo → **Settings** → **Pages** → under "Build and deployment", set **Source** to **GitHub Actions**.
   (Not "Deploy from a branch" — this project builds itself.)

4. **Wait for the build** — the **Actions** tab shows a "Deploy to GitHub Pages" run. It takes 2–3 minutes.

5. **Your site is live** at `https://<your-username>.github.io/innovatex-hub/`

After this, every push to `main` redeploys automatically. The workflow reads the repo name for the base path, so renaming the repo just works.

---

## Where the content lives

Everything you'll routinely edit is plain TypeScript data in `src/data/`. No components need touching.

| File | Controls |
|---|---|
| `src/data/site.ts` | Site name, organiser, contact email, location, headline stats |
| `src/data/weeks.ts` | **The 7 weekly blueprints** — plan, wiring, code, attendance, photos, quiz |
| `src/data/lessons.ts` | Learn Academy lessons and their self-check questions |
| `src/data/team.ts` | Resource persons — name, role, qualification, expertise |
| `src/data/projects.ts` | Project showcase cards |
| `src/data/portal.ts` | Portal resources and assignments |
| `src/data/hardware.ts` | The component catalogue driving all imagery |

Each file is commented. Every text field is bilingual:

```ts
title: { en: "Recap & ESP32 Upgrade", ta: "மறுபார்வை & ESP32 மேம்படுத்தல்" }
```

The EN / தமிழ் switch in the navbar swaps between them instantly, and the choice is remembered per visitor.

---

## Updating a week

This is the main recurring task. Full walkthrough: **[docs/updating-a-week.md](docs/updating-a-week.md)**

Short version — open `src/data/weeks.ts`, find the week, fill in the fields, and change:

```ts
status: "upcoming",   →   status: "live",
```

Commit, and the page publishes itself.

---

## Documentation

| Guide | Covers |
|---|---|
| [docs/updating-a-week.md](docs/updating-a-week.md) | Publishing a week: attendance, photos, code, quiz |
| [docs/google-form-quiz-setup.md](docs/google-form-quiz-setup.md) | Building the graded quiz and embedding it |
| [docs/week1-quiz-questions.md](docs/week1-quiz-questions.md) | A ready-to-use Week 1 question set |
| [docs/adding-3d-models.md](docs/adding-3d-models.md) | Adding interactive GLB models for components |
| [docs/adding-photos.md](docs/adding-photos.md) | Compressing and adding session photos |

---

## Project structure

```
src/
  app/                      routes (App Router, all statically exported)
    page.tsx                 home
    learn/                    Learn Academy hub + [slug] lessons
    weeks/                     weeks index + [number] blueprints
    portal/  projects/  team/  about/  gallery/
  components/
    layout/                  Navbar, Footer
    sections/                home page sections
    hardware/                HardwareVisual, ModelViewer, BlueprintFallback
    learn/  weeks/  portal/  projects/  team/  about/  gallery/
    ui/                      GlassCard, Counter, MagneticButton, Reveal, …
    providers/               LanguageProvider (EN/தமிழ்)
    visuals/                 AmbientBackground (aurora, grid, particles)
  data/                      ← all editable content
  lib/utils.ts               cn(), asset()
public/
  images/hardware/           component photography (.webp deployed)
  models/                    optional .glb files for 3D viewing
scripts/                     image sourcing / optimization / screenshots
legacy-static-site/          the earlier plain-HTML version, kept for reference
```

---

## How imagery works

`<HardwareVisual slug="esp32" />` is the single way hardware appears anywhere. It resolves in order:

1. **Interactive 3D** — if `public/models/<file>.glb` exists and the visitor taps "View in 3D". The three.js bundle is lazy-loaded, so it costs nothing until used.
2. **Real photograph** — WebP, lazy-loaded, with a blur-up placeholder.
3. **Generated blueprint plate** — an on-brand PCB-trace panel, so a missing image is never a broken image.

Photography is sourced from Wikimedia Commons under free licences. Every photo's author and licence is recorded in `src/data/image-credits.json` and published on **/about#credits**.

To add a photo for a component that currently shows the blueprint plate: drop `<slug>.jpg` into `public/images/hardware/`, run `npm run images:optimize`, and set `photo: true` on that entry in `src/data/hardware.ts`.

---

## Design system

Tokens live in `src/app/globals.css` under `@theme` — change a value there and it updates everywhere.

| Token | Value |
|---|---|
| Background | `#050816` / `#0B1220` |
| Primary | `#4ADE80` |
| Secondary | `#38BDF8` |
| Accent | `#A855F7` |
| Text | `#F8FAFC` / `#94A3B8` |
| Headings | Space Grotesk |
| Body | Inter |
| Numbers / labels | JetBrains Mono |

Reduced-motion is respected throughout: animations collapse to zero duration for visitors who ask for it.

---

## Student data & privacy

The site deliberately holds **no** student data. Lesson self-checks are marked in the browser and forgotten on refresh.

- **Public here:** team names, first names, attendance *counts*, consented photos
- **Private to the organiser:** registration details, contacts, per-student attendance, individual quiz marks — all in a Google Sheet that is never connected to this site

Graded quizzes are Google Forms embedded per week; responses land in that private sheet.

---

*Team Science · InnovateX 3.0 · Hemmathagama · 2026*
