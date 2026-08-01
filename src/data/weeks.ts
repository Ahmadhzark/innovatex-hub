import type { Bilingual } from "@/components/providers/LanguageProvider";

/**
 * The weekly workshop blueprints.
 *
 * This is the file the organiser edits between sessions. Everything a week
 * page renders comes from here: plan, components, wiring, code, resource
 * person, attendance, photos, links and the quiz embed.
 *
 * To publish a week, fill in its fields and change `status` to "live".
 * See docs/updating-a-week.md for the full walkthrough.
 */

export type WeekStatus = "live" | "upcoming";

export type Week = {
  number: number;
  status: WeekStatus;
  title: Bilingual;
  dateRange: Bilingual;
  /** One-line pitch used on the index and the coming-soon state. */
  teaser: Bilingual;
  /** Hardware slug for the week's cover image. */
  hero: string;

  /* --- everything below is only needed once status is "live" --- */
  goal?: Bilingual;
  building?: Bilingual;
  resourcePerson?: { name: string; role: Bilingual };
  attendance?: { present: number; total: number };
  components?: string[];
  steps?: Array<{ title: Bilingual; text: Bilingual }>;
  code?: { filename: string; language: string; content: string };
  learned?: Bilingual[];
  /** Paths under /public, e.g. "/images/weeks/week1/1.webp" */
  photos?: string[];
  driveAlbumUrl?: string;
  links?: Array<{ label: Bilingual; url: string }>;
  tinkercadUrl?: string;
  /** Google Form embed URL — Send -> <> -> copy the iframe src. */
  quizEmbedUrl?: string;
};

export const WEEKS: Week[] = [
  {
    number: 1,
    status: "live",
    title: { en: "Recap & ESP32 Upgrade", ta: "மறுபார்வை & ESP32 மேம்படுத்தல்" },
    dateRange: { en: "Week 1", ta: "வாரம் 1" },
    teaser: {
      en: "Bridge the gap between a hand-wired circuit and one controlled by code.",
      ta: "கையால் இணைக்கப்பட்ட சுற்றுக்கும் குறியீட்டால் கட்டுப்படுத்தப்படும் சுற்றுக்கும் இடையேயான பாலம்.",
    },
    hero: "esp32",
    goal: {
      en: "Recap the foundation — LED, resistor, breadboard — then take the leap to a coded circuit. Meet the ESP32 and make your first LED blink from software instead of a switch.",
      ta: "அடிப்படைகளை — LED, எதிர்ப்பான், பிரெட்போர்டு — மறுபார்வையிட்டு, குறியீட்டு சுற்றுக்கு செல்லுங்கள். ESP32-ஐ சந்தித்து, சாஃப்ட்வேர் மூலம் உங்கள் முதல் LED-ஐ ஒளிரச் செய்யுங்கள்.",
    },
    building: {
      en: "An LED and a 220Ω resistor on a breadboard, wired to an ESP32 and blinking on a timer written in Arduino code.",
      ta: "பிரெட்போர்டில் ஒரு LED மற்றும் 220Ω எதிர்ப்பான், ESP32-உடன் இணைக்கப்பட்டு, Arduino குறியீட்டில் எழுதப்பட்ட நேரத்தில் ஒளிரும்.",
    },
    resourcePerson: {
      name: "To be announced",
      role: { en: "Session Instructor", ta: "அமர்வு பயிற்றுநர்" },
    },
    attendance: { present: 0, total: 100 },
    components: [
      "esp32",
      "breadboard",
      "led",
      "resistor",
      "jumper-wires",
      "battery-pack",
    ],
    steps: [
      {
        title: { en: "Mount the ESP32", ta: "ESP32-ஐ பொருத்துங்கள்" },
        text: {
          en: "Sit the board across the breadboard's centre gap so both rows of pins land on separate terminal strips.",
          ta: "இரு வரிசை பின்களும் தனித்தனி டெர்மினல் பட்டைகளில் அமையும்படி, பிரெட்போர்டின் நடு இடைவெளியில் போர்டை வையுங்கள்.",
        },
      },
      {
        title: { en: "Place the LED", ta: "LED-ஐ வையுங்கள்" },
        text: {
          en: "Push the LED in so its long leg (anode) and short leg (cathode) sit in two different rows.",
          ta: "நீண்ட கால் (ஆனோடு) மற்றும் குட்டையான கால் (கேத்தோடு) வெவ்வேறு வரிசைகளில் இருக்கும்படி LED-ஐ செருகவும்.",
        },
      },
      {
        title: { en: "Add the 220Ω resistor", ta: "220Ω எதிர்ப்பானை சேர்க்கவும்" },
        text: {
          en: "Bridge the LED's cathode row to the blue ground rail. This is the part that keeps the LED alive.",
          ta: "LED-இன் கேத்தோடு வரிசையை நீல கிரவுண்ட் ரெயிலுடன் இணைக்கவும். இதுதான் LED-ஐ பாதுகாக்கும் பகுதி.",
        },
      },
      {
        title: { en: "Wire GPIO2 to the anode", ta: "GPIO2-ஐ ஆனோடுடன் இணைக்கவும்" },
        text: {
          en: "Run a jumper from the ESP32's GPIO2 pin to the LED's anode row. This pin is what the code will switch on and off.",
          ta: "ESP32-இன் GPIO2 பின்னிலிருந்து LED-இன் ஆனோடு வரிசைக்கு ஜம்பர் வயரை இணைக்கவும்.",
        },
      },
      {
        title: { en: "Close the loop", ta: "வளையத்தை மூடவும்" },
        text: {
          en: "Connect the ESP32's GND pin to the blue ground rail. Without this the circuit is not a loop and nothing will light.",
          ta: "ESP32-இன் GND பின்னை நீல கிரவுண்ட் ரெயிலுடன் இணைக்கவும். இது இல்லாமல் சுற்று முழுமையடையாது.",
        },
      },
      {
        title: { en: "Upload the code", ta: "குறியீட்டை பதிவேற்றவும்" },
        text: {
          en: "Plug in USB, open the Arduino IDE, choose \"ESP32 Dev Module\" as the board, then upload the sketch below.",
          ta: "USB-ஐ செருகவும், Arduino IDE-ஐ திறக்கவும், \"ESP32 Dev Module\"-ஐ தேர்ந்தெடுத்து, கீழே உள்ள ஸ்கெட்சை பதிவேற்றவும்.",
        },
      },
    ],
    code: {
      filename: "week1_blink.ino",
      language: "cpp",
      content: `// InnovateX 3.0 — Week 1: ESP32 Blink
// Same LED + resistor as the Foundation lessons — now driven by code.

const int LED_PIN = 2;  // GPIO2, wired through a 220R resistor to the LED

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);  // LED on
  delay(500);
  digitalWrite(LED_PIN, LOW);   // LED off
  delay(500);
}`,
    },
    learned: [
      {
        en: "How an ESP32 differs from a plain battery-powered circuit",
        ta: "ESP32 எளிய பேட்டரி சுற்றிலிருந்து எவ்வாறு வேறுபடுகிறது",
      },
      {
        en: "What a GPIO pin is and how to choose one",
        ta: "GPIO பின் என்றால் என்ன, ஒன்றை எப்படி தேர்வு செய்வது",
      },
      {
        en: "Installing the Arduino IDE and adding ESP32 board support",
        ta: "Arduino IDE-ஐ நிறுவி ESP32 போர்டு ஆதரவை சேர்த்தல்",
      },
      {
        en: "Writing and uploading a first working sketch",
        ta: "முதல் ஸ்கெட்சை எழுதி பதிவேற்றுதல்",
      },
    ],
    photos: [],
    driveAlbumUrl: "",
    links: [
      {
        label: { en: "Install ESP32 boards in Arduino IDE", ta: "Arduino IDE-இல் ESP32 போர்டுகளை நிறுவவும்" },
        url: "https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html",
      },
      {
        label: { en: "Download the Arduino IDE", ta: "Arduino IDE-ஐ பதிவிறக்கவும்" },
        url: "https://www.arduino.cc/en/software",
      },
    ],
    tinkercadUrl: "",
    quizEmbedUrl: "",
  },

  {
    number: 2,
    status: "upcoming",
    title: { en: "IoT Dashboard & Cloud", ta: "IoT டாஷ்போர்டு & கிளவுட்" },
    dateRange: { en: "Week 2", ta: "வாரம் 2" },
    teaser: {
      en: "Send live sensor data from the ESP32 to the cloud and watch it appear on a dashboard in real time.",
      ta: "ESP32-இலிருந்து நேரடி சென்சார் தரவை கிளவுட்டிற்கு அனுப்பி, டாஷ்போர்டில் நேரடியாக பாருங்கள்.",
    },
    hero: "temperature-sensor",
  },
  {
    number: 3,
    status: "upcoming",
    title: { en: "Smart Robotics", ta: "ஸ்மார்ட் ரோபோட்டிக்ஸ்" },
    dateRange: { en: "Week 3", ta: "வாரம் 3" },
    teaser: {
      en: "Motors, drivers and wheels — build a chassis the ESP32 can actually drive.",
      ta: "மோட்டார்கள், டிரைவர்கள், சக்கரங்கள் — ESP32 இயக்கக்கூடிய சேசியை உருவாக்குங்கள்.",
    },
    hero: "servo-motor",
  },
  {
    number: 4,
    status: "upcoming",
    title: { en: "AI & TinyML", ta: "AI & TinyML" },
    dateRange: { en: "Week 4", ta: "வாரம் 4" },
    teaser: {
      en: "Train a tiny model to recognise patterns and run it directly on the board — no cloud required.",
      ta: "வடிவங்களை அடையாளம் காண சிறிய மாதிரியை பயிற்றுவித்து, போர்டிலேயே இயக்குங்கள்.",
    },
    hero: "pcb",
  },
  {
    number: 5,
    status: "upcoming",
    title: { en: "Problem & Planning", ta: "சிக்கல் & திட்டமிடல்" },
    dateRange: { en: "Week 5", ta: "வாரம் 5" },
    teaser: {
      en: "Each team picks a real problem to solve and plans their final build from the ground up.",
      ta: "ஒவ்வொரு குழுவும் தீர்க்க ஒரு உண்மையான சிக்கலை தேர்ந்தெடுத்து திட்டமிடுகிறது.",
    },
    hero: "multimeter",
  },
  {
    number: 6,
    status: "upcoming",
    title: { en: "Final Build & Viva", ta: "இறுதி கட்டமைப்பு & வைவா" },
    dateRange: { en: "Week 6", ta: "வாரம் 6" },
    teaser: {
      en: "Teams finish their projects and defend the engineering decisions behind them.",
      ta: "குழுக்கள் தங்கள் திட்டங்களை முடித்து, அதன் பொறியியல் முடிவுகளை விளக்குகின்றன.",
    },
    hero: "soldering",
  },
  {
    number: 7,
    status: "upcoming",
    title: { en: "Grand Exhibition", ta: "பெரிய கண்காட்சி" },
    dateRange: { en: "Week 7", ta: "வாரம் 7" },
    teaser: {
      en: "All ten teams present their finished AIoT builds to the community.",
      ta: "பத்து குழுக்களும் தங்கள் முடிக்கப்பட்ட AIoT திட்டங்களை சமூகத்திற்கு வழங்குகின்றன.",
    },
    hero: "arduino-uno",
  },
];

export function getWeek(number: number) {
  return WEEKS.find((week) => week.number === number);
}
