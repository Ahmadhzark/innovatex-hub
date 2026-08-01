import type { Bilingual } from "@/components/providers/LanguageProvider";

/** One stop on the LED -> ESP32 learning journey shown on the home page. */
export type JourneyStep = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  hardware: string;
  /** Optional link to the matching Learn Academy lesson. */
  href?: string;
};

export const JOURNEY: JourneyStep[] = [
  {
    id: "electricity",
    title: { en: "Electricity", ta: "மின்சாரம்" },
    description: {
      en: "Voltage, current and resistance — understood through water flowing in a pipe, not equations.",
      ta: "மின்னழுத்தம், மின்னோட்டம், எதிர்ப்பு — சமன்பாடுகள் அல்ல, குழாயில் பாயும் நீர் மூலம்.",
    },
    hardware: "battery-pack",
    href: "/learn/electricity",
  },
  {
    id: "led",
    title: { en: "First Light", ta: "முதல் ஒளி" },
    description: {
      en: "Wire an LED the right way round and learn why polarity decides whether anything happens at all.",
      ta: "LED-ஐ சரியான திசையில் இணைத்து, முனைவு ஏன் முக்கியம் என்பதை கற்றுக்கொள்ளுங்கள்.",
    },
    hardware: "led",
    href: "/learn/led",
  },
  {
    id: "resistor",
    title: { en: "Control the Flow", ta: "ஓட்டத்தை கட்டுப்படுத்து" },
    description: {
      en: "Add a resistor and stop burning components — the first real engineering decision students make.",
      ta: "எதிர்ப்பானை சேர்த்து பாகங்கள் எரிவதை நிறுத்துங்கள் — முதல் உண்மையான பொறியியல் முடிவு.",
    },
    hardware: "resistor",
    href: "/learn/resistor",
  },
  {
    id: "breadboard",
    title: { en: "Build for Real", ta: "நிஜமாக கட்டமை" },
    description: {
      en: "Move off paper and onto a breadboard, where every mistake is reversible in one second.",
      ta: "காகிதத்திலிருந்து பிரெட்போர்டுக்கு நகருங்கள் — ஒவ்வொரு தவறையும் ஒரு வினாடியில் மாற்றலாம்.",
    },
    hardware: "breadboard",
    href: "/learn/breadboard",
  },
  {
    id: "sensors",
    title: { en: "Give It Senses", ta: "உணர்வுகளை கொடு" },
    description: {
      en: "Ultrasonic, temperature and motion sensors turn a static circuit into something aware of the world.",
      ta: "அல்ட்ராசோனிக், வெப்பநிலை மற்றும் இயக்க சென்சார்கள் சுற்றை உலகை உணரும் ஒன்றாக மாற்றுகின்றன.",
    },
    hardware: "ultrasonic-sensor",
  },
  {
    id: "code",
    title: { en: "Write the Logic", ta: "தர்க்கத்தை எழுது" },
    description: {
      en: "Program the board so the circuit makes decisions on its own instead of waiting for a switch.",
      ta: "சுவிட்சுக்கு காத்திருக்காமல், சுற்று தானே முடிவெடுக்கும்படி போர்டை நிரல்படுத்துங்கள்.",
    },
    hardware: "arduino-uno",
  },
  {
    id: "esp32",
    title: { en: "Connect It", ta: "இணைத்திடு" },
    description: {
      en: "The ESP32 brings Wi-Fi, the cloud and smart robotics — the finish line of the journey.",
      ta: "ESP32 Wi-Fi, கிளவுட் மற்றும் ஸ்மார்ட் ரோபோட்டிக்ஸை கொண்டு வருகிறது — பயணத்தின் இறுதிக்கோடு.",
    },
    hardware: "esp32",
  },
];

/** Workshop modules shown as a card grid on the home page. */
export type WorkshopModule = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  hardware: string;
  topics: string[];
};

export const MODULES: WorkshopModule[] = [
  {
    id: "electronics",
    title: { en: "Electronics Basics", ta: "எலக்ட்ரானிக்ஸ் அடிப்படைகள்" },
    description: {
      en: "Voltage, current, resistance and the components every circuit is built from.",
      ta: "மின்னழுத்தம், மின்னோட்டம், எதிர்ப்பு மற்றும் ஒவ்வொரு சுற்றின் அடிப்படை பாகங்கள்.",
    },
    hardware: "resistor",
    topics: ["Ohm's Law", "LEDs", "Resistors", "Breadboarding"],
  },
  {
    id: "arduino",
    title: { en: "Arduino Programming", ta: "Arduino நிரலாக்கம்" },
    description: {
      en: "From your first blink sketch to loops, conditions and reading real inputs.",
      ta: "உங்கள் முதல் blink ஸ்கெட்சிலிருந்து சுழற்சிகள், நிபந்தனைகள் வரை.",
    },
    hardware: "arduino-uno",
    topics: ["setup/loop", "digitalWrite", "Serial", "Debugging"],
  },
  {
    id: "sensors",
    title: { en: "Sensors", ta: "சென்சார்கள்" },
    description: {
      en: "Distance, temperature, motion and light — how a board perceives its surroundings.",
      ta: "தூரம், வெப்பநிலை, இயக்கம் மற்றும் ஒளி — போர்டு சுற்றுப்புறத்தை உணரும் விதம்.",
    },
    hardware: "ultrasonic-sensor",
    topics: ["HC-SR04", "DHT11", "PIR", "Analog vs Digital"],
  },
  {
    id: "embedded",
    title: { en: "Embedded Systems", ta: "உட்பொதிக்கப்பட்ட அமைப்புகள்" },
    description: {
      en: "GPIO, PWM, timing and power — the fundamentals that make hardware behave.",
      ta: "GPIO, PWM, நேரம் மற்றும் மின்சக்தி — வன்பொருள் செயல்படுவதற்கான அடிப்படைகள்.",
    },
    hardware: "pcb",
    topics: ["GPIO", "PWM", "Interrupts", "Power"],
  },
  {
    id: "iot",
    title: { en: "IoT & Cloud", ta: "IoT & கிளவுட்" },
    description: {
      en: "Put the ESP32 online and watch live sensor data appear on a dashboard.",
      ta: "ESP32-ஐ ஆன்லைனில் இணைத்து, நேரடி தரவை டாஷ்போர்டில் பாருங்கள்.",
    },
    hardware: "esp32",
    topics: ["Wi-Fi", "MQTT", "Dashboards", "APIs"],
  },
  {
    id: "robotics",
    title: { en: "Robotics", ta: "ரோபோட்டிக்ஸ்" },
    description: {
      en: "Motors, drivers and chassis — turning a circuit into something that moves.",
      ta: "மோட்டார்கள், டிரைவர்கள் மற்றும் சேசி — சுற்றை நகரும் ஒன்றாக மாற்றுதல்.",
    },
    hardware: "servo-motor",
    topics: ["DC Motors", "Servos", "Motor Drivers", "Chassis"],
  },
  {
    id: "final",
    title: { en: "Final Project", ta: "இறுதி திட்டம்" },
    description: {
      en: "Each team designs, builds and presents an original AIoT solution at the exhibition.",
      ta: "ஒவ்வொரு குழுவும் ஒரு அசல் AIoT தீர்வை வடிவமைத்து கண்காட்சியில் வழங்குகிறது.",
    },
    hardware: "robot-chassis",
    topics: ["Planning", "Prototyping", "Viva", "Exhibition"],
  },
];
