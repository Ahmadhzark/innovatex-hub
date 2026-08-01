# Adding session photos

Two places, deliberately:

- **4–6 best photos per week** live in the repo and appear on the week's page
- **The full album** lives in a free Google Drive folder, linked with a button

This keeps the site fast and free while nothing gets lost.

---

## 1. Pick and compress

Choose 4–6 photos that show the room, the builds and the students working.

Compress each one to roughly **200KB** before adding it — a phone photo is often 4MB, which would make the page crawl on mobile data.

Easiest tool: **[squoosh.app](https://squoosh.app)**

1. Drag a photo in
2. Choose **WebP** on the right
3. Slide quality to about **75**
4. Watch the size counter at the bottom — aim under 250KB
5. Download

---

## 2. Add them to the repo

Put them in a folder named for the week:

```
public/images/weeks/week2/1.webp
public/images/weeks/week2/2.webp
public/images/weeks/week2/3.webp
```

You can do this on the GitHub website: navigate to `public/images/weeks/`, click **Add file → Upload files**, and drag them in. Create the `week2` folder by typing `week2/` into the filename box.

---

## 3. List them in the week

In `src/data/weeks.ts`, on that week's entry:

```ts
photos: [
  "/images/weeks/week2/1.webp",
  "/images/weeks/week2/2.webp",
  "/images/weeks/week2/3.webp",
],
```

Paths start with `/` and are relative to `public/` — never write `public/` in the path itself.

---

## 4. Link the full album

1. In Google Drive, create a folder — `InnovateX 3.0 — Week 2`
2. Upload everything from that session
3. Right-click the folder → **Share** → **Anyone with the link** → **Viewer**
4. Copy the link
5. Paste it into the week:

```ts
driveAlbumUrl: "https://drive.google.com/drive/folders/1AbC...",
```

A "View the full album" button appears under the photo grid.

---

## Consent

Only publish photos where students (and their parents, for under-18s) have agreed to it. The site is public and indexed by search engines.

If in doubt, favour wide shots of the room and close-ups of the hardware over identifiable portraits. Photos of circuits and builds carry the same energy with none of the risk.

Anything sensitive stays in the private Drive folder, shared only with the people who need it.

---

## Storage reality check

GitHub gives a repository 1GB comfortably. At 6 photos × 200KB × 7 weeks you'll use about **8MB**. There is no cost concern here — the limit only matters if someone uploads uncompressed originals, which is exactly what step 1 prevents.
