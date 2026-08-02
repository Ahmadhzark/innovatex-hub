# Turning on registration

The `/register` page and the "Register" button in the navbar hand off to a
Google Form. Until that form exists, the page shows a "Registration opens
soon" state with an email fallback instead of a broken link.

## To go live

1. Create the Google Form (name, school, age, team preference — whatever
   Muaz wants collected). Responses land in a private Google Sheet, same as
   the quiz responses described in the project plan.
2. Copy the form's shareable link.
3. Open `src/data/site.ts` and paste it in:

   ```ts
   registrationFormUrl: "https://forms.gle/your-real-link",
   ```

4. Commit and push — the site rebuilds and `/register` immediately starts
   sending students to the real form.
