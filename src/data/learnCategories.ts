import type { Bilingual } from "@/components/providers/LanguageProvider";

/** Groups the 14 lessons into a learning path shown on the Learn Academy hub. */
export type LessonCategory = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  slugs: string[];
};

export const LESSON_CATEGORIES: LessonCategory[] = [
  {
    id: "foundation",
    title: { en: "Foundation", ta: "அடிப்படை" },
    description: {
      en: "Electricity, LEDs, resistors and breadboards — the physics under everything else.",
      ta: "மின்சாரம், LED-கள், எதிர்ப்பான்கள், பிரெட்போர்டுகள்.",
    },
    slugs: ["electricity", "led", "resistor", "breadboard"],
  },
  {
    id: "boards-and-code",
    title: { en: "Boards & Code", ta: "போர்டுகள் & குறியீடு" },
    description: {
      en: "Meet the boards, learn to program and upload code to them.",
      ta: "போர்டுகளை சந்தித்து, அவற்றை நிரலாக்க கற்றுக்கொள்ளுங்கள்.",
    },
    slugs: ["intro-robotics", "arduino-uno", "esp32", "uploading-code", "arduino-programming"],
  },
  {
    id: "sensors",
    title: { en: "Sensors & Inputs", ta: "சென்சார்கள் & உள்ளீடுகள்" },
    description: {
      en: "Every sensor in the kit — what it does, how to wire it, real code.",
      ta: "கிட்டில் உள்ள ஒவ்வொரு சென்சாரும் — அது என்ன செய்கிறது, எப்படி இணைப்பது.",
    },
    slugs: ["digital-analog-inputs", "motion-distance-sensors", "environmental-sensors"],
  },
  {
    id: "outputs",
    title: { en: "Outputs & Communication", ta: "வெளியீடுகள் & தொடர்பு" },
    description: {
      en: "Motors, lights, sound, displays and wireless — building the finished robot.",
      ta: "மோட்டார்கள், விளக்குகள், ஒலி, காட்சிகள், வயர்லெஸ்.",
    },
    slugs: ["outputs-actuators", "displays-communication"],
  },
];
