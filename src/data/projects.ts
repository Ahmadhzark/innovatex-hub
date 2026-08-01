import type { Bilingual } from "@/components/providers/LanguageProvider";

export type Project = {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  difficulty: "beginner" | "intermediate" | "advanced";
  /** Hardware slug used for the card image. */
  hero: string;
  components: string[];
  /** Concepts the build teaches. */
  skills: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "obstacle-avoiding-robot",
    title: { en: "Obstacle Avoiding Robot", ta: "தடை தவிர்க்கும் ரோபோ" },
    description: {
      en: "A robot that measures the distance ahead with ultrasound and steers away before it hits anything.",
      ta: "அல்ட்ராசவுண்ட் மூலம் முன்னால் உள்ள தூரத்தை அளந்து, மோதுவதற்கு முன் விலகிச் செல்லும் ரோபோ.",
    },
    difficulty: "intermediate",
    hero: "ultrasonic-sensor",
    components: ["esp32", "ultrasonic-sensor", "dc-motor", "battery-pack"],
    skills: ["Sensor reading", "Motor control", "Decision logic"],
  },
  {
    slug: "bluetooth-controlled-robot",
    title: { en: "Bluetooth Controlled Robot", ta: "புளூடூத் கட்டுப்பாட்டு ரோபோ" },
    description: {
      en: "Drive your robot from a phone app over Bluetooth — the first project that feels like a real product.",
      ta: "புளூடூத் வழியாக ஃபோன் ஆப்பிலிருந்து உங்கள் ரோபோவை இயக்குங்கள்.",
    },
    difficulty: "intermediate",
    hero: "bluetooth-module",
    components: ["esp32", "bluetooth-module", "dc-motor", "battery-pack"],
    skills: ["Serial communication", "Wireless control", "Motor drivers"],
  },
  {
    slug: "line-follower-robot",
    title: { en: "Line Follower Robot", ta: "கோடு பின்தொடரும் ரோபோ" },
    description: {
      en: "Infrared sensors watch the floor and keep the robot centred on a black line, correcting continuously.",
      ta: "அகச்சிவப்பு சென்சார்கள் தரையை கண்காணித்து, கருப்பு கோட்டின் மையத்தில் ரோபோவை வைத்திருக்கின்றன.",
    },
    difficulty: "intermediate",
    hero: "ir-sensor",
    components: ["arduino-uno", "ir-sensor", "dc-motor", "battery-pack"],
    skills: ["Analog sensing", "Feedback loops", "Calibration"],
  },
  {
    slug: "weather-station",
    title: { en: "IoT Weather Station", ta: "IoT வானிலை நிலையம்" },
    description: {
      en: "Read temperature and humidity, push the readings to the cloud, and watch them plot themselves live.",
      ta: "வெப்பநிலை மற்றும் ஈரப்பதத்தை படித்து, கிளவுட்டிற்கு அனுப்பி, நேரடியாக வரைபடமாக பாருங்கள்.",
    },
    difficulty: "beginner",
    hero: "temperature-sensor",
    components: ["esp32", "temperature-sensor", "breadboard"],
    skills: ["Wi-Fi", "APIs", "Data logging"],
  },
  {
    slug: "fire-alarm",
    title: { en: "Fire & Gas Alarm", ta: "தீ & வாயு எச்சரிக்கை" },
    description: {
      en: "Detect smoke or gas and trigger a buzzer and alert — a genuinely useful safety build.",
      ta: "புகை அல்லது வாயுவை கண்டறிந்து பஸரையும் எச்சரிக்கையையும் இயக்குகிறது.",
    },
    difficulty: "beginner",
    hero: "gas-sensor",
    components: ["esp32", "gas-sensor", "led", "breadboard"],
    skills: ["Threshold logic", "Alerts", "Safety design"],
  },
  {
    slug: "smart-home",
    title: { en: "Smart Home Control", ta: "ஸ்மார்ட் ஹோம் கட்டுப்பாடு" },
    description: {
      en: "Switch real lights and fans from your phone using relays, with motion-triggered automation.",
      ta: "ரிலேக்களைப் பயன்படுத்தி உங்கள் ஃபோனிலிருந்து விளக்குகளையும் மின்விசிறிகளையும் இயக்குங்கள்.",
    },
    difficulty: "advanced",
    hero: "relay-module",
    components: ["esp32", "relay-module", "pir-sensor"],
    skills: ["Relays", "Automation", "Mains safety"],
  },
];

export const DIFFICULTY_LABEL: Record<
  Project["difficulty"],
  { label: Bilingual; tone: string }
> = {
  beginner: {
    label: { en: "Beginner", ta: "ஆரம்பநிலை" },
    tone: "text-primary border-primary/35 bg-primary/10",
  },
  intermediate: {
    label: { en: "Intermediate", ta: "இடைநிலை" },
    tone: "text-secondary border-secondary/35 bg-secondary/10",
  },
  advanced: {
    label: { en: "Advanced", ta: "மேம்பட்ட" },
    tone: "text-accent border-accent/35 bg-accent/10",
  },
};
