import type { Bilingual } from "@/components/providers/LanguageProvider";

/**
 * Workshop photographs shown in the hero gallery.
 *
 * To add a photo:
 *   1. Drop the image into  public/images/highlights/
 *      (WebP or JPEG, landscape, ideally ~1600px wide)
 *   2. Add an entry below.
 *
 * That's the whole process — no component changes. An empty list is fine:
 * the hero shows a tidy "photos coming soon" panel instead.
 */
export type Highlight = {
  /** Filename inside public/images/highlights/ */
  file: string;
  caption: Bilingual;
  /** Optional context line, e.g. "InnovateX 2.0 · Week 5". */
  meta?: string;
};

export const HIGHLIGHTS: Highlight[] = [];
