/**
 * Global site configuration.
 * Edit the values here to rebrand or update program-wide facts.
 */

export const SITE = {
  name: "InnovateX 3.0",
  organizer: "Team Science",
  tagline: "Robotics & Embedded Systems Workshop",
  description:
    "A 7-week AIoT engineering journey — from a single LED to a working ESP32 smart-robotics build. Organized by Team Science for 100 students across 10 teams.",
  location: "Hemmathagama",
  year: 2026,
  contactEmail: "innovatex@example.com",
  /**
   * The Google Form students land on from /register. Leave empty until
   * registration opens — the page shows a "coming soon" state instead of
   * a broken button. See docs/adding-registration-link.md.
   */
  registrationFormUrl: "",
} as const;

export type NavItem = {
  href: string;
  label: { en: string; ta: string };
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: { en: "Home", ta: "முகப்பு" } },
  { href: "/learn", label: { en: "Learn", ta: "கற்றல்" } },
  { href: "/weeks", label: { en: "Weeks", ta: "வாரங்கள்" } },
  { href: "/portal", label: { en: "Portal", ta: "போர்ட்டல்" } },
  { href: "/projects", label: { en: "Projects", ta: "திட்டங்கள்" } },
  { href: "/team", label: { en: "Team", ta: "குழு" } },
  { href: "/about", label: { en: "About", ta: "பற்றி" } },
];

export const STATS = [
  {
    value: 100,
    suffix: "",
    label: { en: "Students", ta: "மாணவர்கள்" },
  },
  {
    value: 10,
    suffix: "",
    label: { en: "Teams", ta: "குழுக்கள்" },
  },
  {
    value: 12,
    suffix: "+",
    label: { en: "Projects Built", ta: "உருவாக்கப்பட்ட திட்டங்கள்" },
  },
  {
    value: 7,
    suffix: " wks",
    label: { en: "Program Duration", ta: "திட்ட காலம்" },
  },
] as const;
