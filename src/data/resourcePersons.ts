import type { Bilingual } from "@/components/providers/LanguageProvider";

/**
 * Who is teaching each workshop week.
 *
 * This is the only file to edit when a resource person is confirmed. The
 * session title shown on each card comes from WEEKS in src/data/weeks.ts, so
 * week titles stay defined in exactly one place.
 *
 * `photo` — a file placed in /public/images/team, e.g. "images/team/asha.webp".
 *           Leave it out and the card shows a clean monogram instead.
 * `qualification` / `specialization` — leave out until confirmed; the card
 *           simply omits the line rather than showing placeholder text.
 */
export type ResourcePerson = {
  week: number;
  name: Bilingual;
  qualification?: Bilingual;
  specialization?: Bilingual;
  photo?: string;
};

const TBA: Bilingual = { en: "To be announced", ta: "பின்னர் அறிவிக்கப்படும்" };

export const RESOURCE_PERSONS: ResourcePerson[] = [
  { week: 1, name: TBA },
  { week: 2, name: TBA },
  { week: 3, name: TBA },
  { week: 4, name: TBA },
  { week: 5, name: TBA },
  { week: 6, name: TBA },
  { week: 7, name: TBA },
];
