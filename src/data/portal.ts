import type { Bilingual } from "@/components/providers/LanguageProvider";

/**
 * Learning Portal content.
 *
 * The portal is a public, static hub — no accounts and no stored personal
 * progress. Student records and quiz marks stay in the organiser's private
 * Google Sheet, which is deliberately not connected to this site.
 */

export type Resource = {
  title: Bilingual;
  description: Bilingual;
  /** External URL, or a file placed under /public/downloads. */
  url: string;
  kind: "pdf" | "link" | "software" | "sheet";
  size?: string;
};

export const RESOURCES: Resource[] = [
  {
    title: { en: "Arduino IDE", ta: "Arduino IDE" },
    description: {
      en: "The editor used to write and upload every sketch in this program.",
      ta: "இந்த திட்டத்தில் ஒவ்வொரு ஸ்கெட்சையும் எழுத பயன்படும் எடிட்டர்.",
    },
    url: "https://www.arduino.cc/en/software",
    kind: "software",
  },
  {
    title: { en: "ESP32 Board Setup Guide", ta: "ESP32 போர்டு அமைப்பு வழிகாட்டி" },
    description: {
      en: "Official steps for adding ESP32 support to the Arduino IDE.",
      ta: "Arduino IDE-இல் ESP32 ஆதரவை சேர்ப்பதற்கான அதிகாரப்பூர்வ படிகள்.",
    },
    url: "https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html",
    kind: "link",
  },
  {
    title: { en: "Tinkercad Circuits", ta: "Tinkercad Circuits" },
    description: {
      en: "Simulate any circuit in the browser before building it — free, no install.",
      ta: "கட்டமைப்பதற்கு முன் எந்த சுற்றையும் உலாவியில் உருவகப்படுத்துங்கள் — இலவசம்.",
    },
    url: "https://www.tinkercad.com/circuits",
    kind: "link",
  },
  {
    title: { en: "ESP32 Pinout Reference", ta: "ESP32 பின்அவுட் குறிப்பு" },
    description: {
      en: "Which pin does what — keep this open while wiring.",
      ta: "எந்த பின் எதற்கு — இணைக்கும்போது இதை திறந்து வைக்கவும்.",
    },
    url: "https://randomnerdtutorials.com/esp32-pinout-reference-gpios/",
    kind: "link",
  },
  {
    title: { en: "Resistor Colour Code Chart", ta: "எதிர்ப்பான் வண்ண குறியீடு அட்டவணை" },
    description: {
      en: "Read any resistor's value straight from its bands.",
      ta: "எந்த எதிர்ப்பானின் மதிப்பையும் அதன் பட்டைகளிலிருந்து படியுங்கள்.",
    },
    url: "https://www.digikey.com/en/resources/conversion-calculators/conversion-calculator-resistor-color-code",
    kind: "link",
  },
  {
    title: { en: "Arduino Language Reference", ta: "Arduino மொழி குறிப்பு" },
    description: {
      en: "Every function, explained with examples.",
      ta: "ஒவ்வொரு செயல்பாடும், எடுத்துக்காட்டுகளுடன் விளக்கப்பட்டுள்ளது.",
    },
    url: "https://www.arduino.cc/reference/en/",
    kind: "link",
  },
];

export type Assignment = {
  week: number;
  title: Bilingual;
  brief: Bilingual;
  /** Kept vague on purpose — real deadlines live in the private sheet. */
  due: Bilingual;
};

export const ASSIGNMENTS: Assignment[] = [
  {
    week: 1,
    title: { en: "Blink, then modify", ta: "Blink, பிறகு மாற்றவும்" },
    brief: {
      en: "Get the Week 1 circuit blinking, then change the timing so the LED blinks twice quickly and pauses.",
      ta: "வாரம் 1 சுற்றை ஒளிரச் செய்து, பின்னர் LED இரண்டு முறை வேகமாக ஒளிர்ந்து இடைநிறுத்தும்படி நேரத்தை மாற்றவும்.",
    },
    due: { en: "Before Week 2", ta: "வாரம் 2-க்கு முன்" },
  },
  {
    week: 1,
    title: { en: "Team name & logo", ta: "குழு பெயர் & லோகோ" },
    brief: {
      en: "Each team agrees on a name and a simple logo to use for the rest of the program.",
      ta: "ஒவ்வொரு குழுவும் ஒரு பெயரையும் எளிய லோகோவையும் தேர்வு செய்யவும்.",
    },
    due: { en: "Before Week 2", ta: "வாரம் 2-க்கு முன்" },
  },
];
