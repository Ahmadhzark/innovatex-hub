# Setting up the weekly quiz

Each week's page ends with a graded knowledge check. It's a **Google Form in Quiz mode**, embedded in the page. Free, auto-marked, and responses land in a private spreadsheet only you can see.

---

## 1. Create the form

1. Go to [forms.new](https://forms.new)
2. Name it something predictable: `InnovateX 3.0 — Week 1 Quiz`
3. Click the **⚙️ Settings** gear (top right)
4. Turn on **Make this a quiz**
5. Under "Release grade", choose **Immediately after each submission** so students see their score right away

---

## 2. Add the identity questions

Before the actual questions, add two **Short answer** questions and mark both **Required**:

| Question | Type |
|---|---|
| Your full name | Short answer, required |
| Your team (1–10) | Short answer or Dropdown, required |

These are what let you match a score to a student. Without them the responses are anonymous and useless.

> Keep "Collect email addresses" **off** unless students all have accounts — it blocks submissions otherwise.

---

## 3. Add the questions

For each question:

1. Click **+** to add
2. Choose **Multiple choice**
3. Type the question and the options
4. Click **Answer key** (bottom left)
5. Select the correct option and set the points (1 is fine)
6. Optionally click **Add answer feedback** to explain the answer — students see this after submitting

A ready-made Week 1 set is in [week1-quiz-questions.md](week1-quiz-questions.md).

**Aim for 5–8 questions.** Long quizzes get abandoned.

---

## 4. Get the embed URL

1. Click **Send** (top right)
2. Choose the **`< >`** tab (embed HTML)
3. You'll see something like:

```html
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true"
        width="640" height="800">…</iframe>
```

4. Copy **only the URL inside `src="…"`** — not the whole iframe tag.

---

## 5. Put it on the week page

Open `src/data/weeks.ts`, find the week, and paste it in:

```ts
quizEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true",
```

Commit. The quiz appears at the bottom of that week's page.

If you leave `quizEmbedUrl` as `""`, the page shows a neutral "quiz not added yet" note instead — nothing looks broken.

---

## 6. See the results

In the form, open the **Responses** tab → click the green **Sheets** icon. That creates a spreadsheet with one row per submission:

| Timestamp | Name | Team | Score |
|---|---|---|---|

From there you get, for free:

- **Who submitted** — and by elimination, who didn't
- **Average score** — shown at the top of the Responses tab
- **Hardest question** — Google highlights frequently-missed questions automatically

This spreadsheet is private to your Google account. Nothing from it is published to the website, and the site never reads from it.

---

## Reusing the form each week

Don't edit last week's form — you'd lose the link between old responses and their questions. Instead:

1. Open the previous week's form
2. **⋮** menu (top right) → **Make a copy**
3. Rename it for the new week
4. Replace the questions
5. Grab the new embed URL and update `weeks.ts`

---

## Troubleshooting

**The embed shows "You need permission".**
Form Settings → Responses → make sure it isn't restricted to your organisation.

**The iframe is cut off.**
The site gives it a fixed height of 640px with its own scrollbar. That's expected — long forms scroll inside the panel.

**Students say scores don't show.**
Settings → "Release grade" must be **Immediately after each submission**, and every question needs an answer key.
