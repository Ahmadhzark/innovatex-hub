import type { Bilingual } from "@/components/providers/LanguageProvider";

export type FaqEntry = {
  id: string;
  question: Bilingual;
  answer: Bilingual;
};

export const FAQS: FaqEntry[] = [
  {
    id: "who-is-this-for",
    question: { en: "Do I need any experience to join?", ta: "சேர அனுபவம் தேவையா?" },
    answer: {
      en: "None at all. The Learn Academy starts from what electricity actually is and builds up one idea at a time — every lesson assumes you're seeing the topic for the first time.",
      ta: "எந்த அனுபவமும் தேவையில்லை. கற்றல் அகாடமி மின்சாரம் என்றால் என்ன என்பதிலிருந்து தொடங்கி, ஒரு நேரத்தில் ஒரு கருத்தை கட்டமைக்கிறது.",
    },
  },
  {
    id: "arduino-vs-esp32",
    question: { en: "What's the difference between Arduino and ESP32?", ta: "Arduino மற்றும் ESP32 இடையே உள்ள வேறுபாடு என்ன?" },
    answer: {
      en: "The Arduino Uno is simpler and a great first board. The ESP32 does everything the Uno does plus Wi-Fi and Bluetooth, and it's the board this whole program is built around from Week 1 onward.",
      ta: "Arduino Uno எளிமையானது, முதல் போர்டுக்கு ஏற்றது. ESP32 அனைத்தையும் செய்வதுடன் Wi-Fi மற்றும் Bluetooth-ஐயும் கொண்டுள்ளது.",
    },
  },
  {
    id: "do-i-need-a-laptop",
    question: { en: "Do I need my own laptop?", ta: "எனக்கு சொந்த லேப்டாப் தேவையா?" },
    answer: {
      en: "You'll need one to write and upload code during sessions — the Arduino IDE is free and works on Windows, Mac and Linux. Talk to your resource person if that's a barrier.",
      ta: "அமர்வுகளின் போது குறியீட்டை எழுத ஒன்று தேவை — Arduino IDE இலவசம். இது தடையாக இருந்தால் உங்கள் பயிற்றுநரிடம் பேசுங்கள்.",
    },
  },
  {
    id: "what-to-bring",
    question: { en: "What should I bring to Week 1?", ta: "வாரம் 1-க்கு என்ன கொண்டு வர வேண்டும்?" },
    answer: {
      en: "Just your laptop and curiosity — every kit, board and component is provided. Check the weekly page closer to the date for anything session-specific.",
      ta: "உங்கள் லேப்டாப் மற்றும் ஆர்வத்தை மட்டும் கொண்டு வாருங்கள் — ஒவ்வொரு கிட்டும் வழங்கப்படும்.",
    },
  },
  {
    id: "is-it-free",
    question: { en: "Is InnovateX 3.0 free to join?", ta: "InnovateX 3.0 இலவசமா?" },
    answer: {
      en: "Registration details and any costs are confirmed by Team Science directly — reach out via the contact details on the About page if you're unsure.",
      ta: "பதிவு விவரங்கள் மற்றும் செலவுகள் Team Science மூலம் நேரடியாக உறுதிப்படுத்தப்படும்.",
    },
  },
  {
    id: "quiz-marks",
    question: { en: "Who can see my quiz marks?", ta: "எனது வினாடி வினா மதிப்பெண்களை யார் பார்க்க முடியும்?" },
    answer: {
      en: "The self-check quizzes on Learn Academy lessons stay entirely in your browser — nothing is sent anywhere. The graded weekly quiz (Google Form) is only visible to Team Science.",
      ta: "கற்றல் அகாடமி பாடங்களில் உள்ள சுய-சரிபார்ப்பு வினாடி வினாக்கள் முழுவதுமாக உங்கள் உலாவியில் மட்டுமே உள்ளன.",
    },
  },
  {
    id: "progress-lost",
    question: { en: "Will I lose my lesson progress?", ta: "எனது பாட முன்னேற்றத்தை இழப்பேனா?" },
    answer: {
      en: "Your progress and XP are saved in this browser only. Clearing browser data, or opening the site on a different device, starts it fresh — there's no account to sign back into.",
      ta: "உங்கள் முன்னேற்றம் மற்றும் XP இந்த உலாவியில் மட்டுமே சேமிக்கப்படுகிறது.",
    },
  },
  {
    id: "age-range",
    question: { en: "What age group is this program for?", ta: "இந்த திட்டம் எந்த வயது குழுவிற்கானது?" },
    answer: {
      en: "InnovateX 3.0 is built for students aged 11 to 18 — every lesson, diagram and explanation is written for that age range specifically.",
      ta: "InnovateX 3.0 11 முதல் 18 வயது வரையிலான மாணவர்களுக்காக வடிவமைக்கப்பட்டுள்ளது.",
    },
  },
];
