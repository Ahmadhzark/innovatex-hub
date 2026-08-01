# Updating a week

Everything a weekly page shows comes from one file: **`src/data/weeks.ts`**.

You can edit it straight from the GitHub website — no tools to install.

---

## The 60-second version

1. Go to your repo → `src` → `data` → `weeks.ts`
2. Click the pencil (✏️) to edit
3. Find the week you're updating
4. Fill in the fields
5. Change `status: "upcoming"` to `status: "live"`
6. Scroll down, click **Commit changes**

The site rebuilds itself and the page is live in about 2 minutes. You can watch it in the **Actions** tab.

---

## What each field does

```ts
{
  number: 2,
  status: "upcoming",        // "live" publishes the full page
  title:     { en: "…", ta: "…" },
  dateRange: { en: "Week 2", ta: "வாரம் 2" },
  teaser:    { en: "…", ta: "…" },   // one line, shown on the weeks index
  hero: "temperature-sensor",         // a slug from src/data/hardware.ts
```

Everything below is only needed once the week goes live:

| Field | What it is |
|---|---|
| `goal` | The paragraph under the title — what this session is for |
| `building` | What students walk out having built |
| `resourcePerson` | `{ name, role }` — who taught it |
| `attendance` | `{ present, total }` — drives the progress bar |
| `components` | Array of hardware slugs; each renders a photo chip |
| `steps` | The numbered wiring instructions |
| `code` | `{ filename, language, content }` — shown with a copy button |
| `learned` | Bullet list of takeaways |
| `photos` | Paths under `/public`, e.g. `/images/weeks/week2/1.webp` |
| `driveAlbumUrl` | Link to the full Google Drive album |
| `links` | Useful links, each `{ label, url }` |
| `tinkercadUrl` | Optional simulator link |
| `quizEmbedUrl` | Google Form embed URL — see the quiz guide |

Anything you leave out is simply not rendered. An empty `photos: []` shows tasteful "Photo coming" placeholders rather than a broken grid.

---

## Writing the code block

Use a backtick-quoted template string so you can paste the sketch as-is:

```ts
code: {
  filename: "week2_wifi.ino",
  language: "cpp",
  content: `#include <WiFi.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
}`,
},
```

Two things to watch:

- If your code contains a backtick or `${`, escape it with a backslash.
- Keep the closing `` ` `` tight against the last line, as above.

---

## Bilingual text

Every visible string is a pair:

```ts
title: { en: "Smart Robotics", ta: "ஸ்மார்ட் ரோபோட்டிக்ஸ்" }
```

If you don't have the Tamil ready yet, put the English in both slots and fix it later — never leave `ta` empty, or Tamil readers get a blank.

---

## Common mistakes

**Forgot a comma between fields.** The Actions build fails and the site keeps serving the previous version — nothing breaks publicly. Open the failed run, read the error, fix the line, commit again.

**Used a hardware slug that doesn't exist.** The component renders a blueprint plate with the raw slug as its label. Check the slug against `src/data/hardware.ts`.

**Photos not showing.** Paths are relative to `public/`, and must start with a slash: `/images/weeks/week2/1.webp`, not `public/images/...`.

---

## Publishing checklist

- [ ] `status` changed to `"live"`
- [ ] Resource person's real name filled in
- [ ] Attendance numbers updated
- [ ] Wiring steps match what was actually taught
- [ ] Code tested — it should upload and run as written
- [ ] 4–6 photos added and Drive album linked
- [ ] Quiz embed URL pasted in
- [ ] Both `en` and `ta` filled for every field
