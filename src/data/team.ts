import type { Bilingual } from "@/components/providers/LanguageProvider";

/**
 * Resource persons and organisers.
 *
 * `photo` points to a file under /public/images/team. Leave it undefined and
 * the card falls back to a generated monogram, so the page always looks
 * finished even before real photographs are supplied.
 */
export type Person = {
  name: string;
  role: Bilingual;
  qualification: Bilingual;
  expertise: string[];
  photo?: string;
};

export const TEAM: Person[] = [
  {
    name: "Muaz",
    role: { en: "Program Lead", ta: "திட்ட தலைவர்" },
    qualification: {
      en: "Organiser, Team Science",
      ta: "அமைப்பாளர், Team Science",
    },
    expertise: ["Program Design", "Robotics", "Mentoring"],
  },
  {
    name: "To be announced",
    role: { en: "Electronics Instructor", ta: "எலக்ட்ரானிக்ஸ் பயிற்றுநர்" },
    qualification: {
      en: "Add qualification in src/data/team.ts",
      ta: "src/data/team.ts இல் தகுதியை சேர்க்கவும்",
    },
    expertise: ["Circuits", "Breadboarding", "Debugging"],
  },
  {
    name: "To be announced",
    role: { en: "Embedded Systems Instructor", ta: "உட்பொதிவு அமைப்புகள் பயிற்றுநர்" },
    qualification: {
      en: "Add qualification in src/data/team.ts",
      ta: "src/data/team.ts இல் தகுதியை சேர்க்கவும்",
    },
    expertise: ["ESP32", "Arduino", "IoT"],
  },
  {
    name: "To be announced",
    role: { en: "Robotics Mentor", ta: "ரோபோட்டிக்ஸ் வழிகாட்டி" },
    qualification: {
      en: "Add qualification in src/data/team.ts",
      ta: "src/data/team.ts இல் தகுதியை சேர்க்கவும்",
    },
    expertise: ["Motors", "Chassis", "Control"],
  },
];
