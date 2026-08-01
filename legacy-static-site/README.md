# InnovateX Hub

The website for **InnovateX 3.0** — a 7-week AIoT learning journey for students aged 11–18.
Plain HTML/CSS/JS, no build tools, hosted free on GitHub Pages. Only Muaz updates content, by editing one JSON file per week.

---

## 1. Go live in 5 steps

1. **Create the repo**
   Go to [github.com/new](https://github.com/new), name it `innovatex-hub`, keep it **Public**, don't add a README (we already have one). Click **Create repository**.

2. **Upload the files**
   On the new repo's page, click **uploading an existing file**. Drag the *entire contents* of this folder in (not the folder itself — its contents: `index.html`, `assets/`, `learn/`, `weeks/`, `data/`, `about/`, `gallery/`, `admin/`, `README.md`). Commit.

3. **Enable GitHub Pages**
   Repo → **Settings** → **Pages** (left sidebar) → under "Build and deployment", Source = **Deploy from a branch** → Branch = **main**, folder = **/(root)** → **Save**.

4. **Wait ~1 minute**, then refresh that Pages settings screen — it will show your live URL:
   `https://<your-username>.github.io/innovatex-hub/`

5. **Bookmark the admin page** for weekly updates:
   `https://<your-username>.github.io/innovatex-hub/admin/index.html`
   (It isn't linked from the site menu on purpose — bookmark the URL.)

That's it — the site is live.

---

## 2. How weekly updates work

Every week's entire page — plan, circuit diagram, wiring steps, code, resource person, attendance, photos, links, quiz — comes from **one file**: `data/weekN.json`.

**To update a week:**

1. Open `admin/index.html` on your live site.
2. Fill in the form (title, goal, resource person, attendance, steps, code, etc. — all in English *and* Tamil).
3. Click **Generate JSON**, then **Copy**.
4. On GitHub, open `data/weekN.json` (e.g. `data/week2.json`), click the pencil (✏️) to edit, select all, paste, and **Commit changes**.
5. Refresh the site — the week's page updates immediately. No coding needed.

You can also hand-edit the JSON file directly on GitHub if you're comfortable with it — the admin page is just a shortcut that writes valid JSON for you.

### Marking a week "live"
Weeks 2–7 ship with `"status": "coming-soon"`. Once you fill in the full form and set **Status → live** in the admin page, the week unlocks with its full page.

---

## 3. Photos

- **4–6 best photos per week**, compressed to ~200KB each, go in `assets/img/weeks/weekN/` (e.g. `assets/img/weeks/week2/1.jpg`). List their paths in the admin form's "Photo paths" field, one per line.
- Free tools to compress: [squoosh.app](https://squoosh.app) (drag, download, done).
- **Full albums** stay in a free Google Drive folder per week — paste that folder's share link into "Google Drive full-album link" in the admin form. The site shows a "View all photos →" button linking there.

---

## 4. Quiz system

Each week's page has a Knowledge Check section. See [`docs/google-form-quiz-setup.md`](docs/google-form-quiz-setup.md) for how to build a Google Forms quiz and embed it, and [`docs/week1-quiz-questions.md`](docs/week1-quiz-questions.md) for a ready Week 1 question set.

Short version: build the form in Google Forms (Quiz mode) → **Send** → the `< >` embed tab → copy the `src="..."` URL from the iframe code → paste it into the admin form's "Quiz Google Form embed URL" field.

Responses (name, team, score, timestamp) land in a private Google Sheet linked to the form — visible only to you.

---

## 5. Site structure

```
index.html                Home
learn/                     Learn Academy (story-driven concept pages)
  index.html               hub
  electricity.html          Foundation 1 — water-pipe analogy
  led.html                  Foundation 2
  resistor.html              Foundation 3
  breadboard.html             Foundation 4
weeks/
  week1.html … week7.html   thin shells — just load data/weekN.json
data/
  week1.json … week7.json   ← the only files you normally edit
gallery/index.html          Team showcases
about/index.html            Team, partners, contact
admin/index.html            Hidden JSON generator (bookmark it, not in menu)
assets/
  css/style.css              design system (colors, components)
  js/main.js                  nav, EN/TA toggle, animations, mini-quiz logic
  js/week.js                  renders week pages from JSON
  img/weeks/weekN/            photos + circuit diagrams per week
docs/
  google-form-quiz-setup.md
  week1-quiz-questions.md
```

You should never need to touch `assets/js/*.js` or `assets/css/style.css` for weekly updates — only `data/weekN.json` (via the admin page) and, once in a while, `about/index.html` or `gallery/index.html` for team info.

---

## 6. Design system

- Background `#0A1128` (dark navy) · text `#C9D6EA` / white · accent emerald `#10B981` · accent orange `#FF8C42`
- All tokens live at the top of `assets/css/style.css` under `:root` — change a color once, it updates everywhere.
- Every page toggles English ⇄ Tamil client-side (no page reload) via the EN/TA switch in the nav — the choice is remembered per visitor.

---

## 7. Editing English + Tamil text directly in HTML (Learn Academy / About / Gallery)

Pairs look like this:

```html
<p data-en>English text here.</p>
<p data-ta>Tamil text here.</p>
```

Edit the text inside each tag directly on GitHub — the toggle logic doesn't need to change.

---

*Built for InnovateX 3.0 · 100 students · 10 teams · Hemmathagama · 2026*
