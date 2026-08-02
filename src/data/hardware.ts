import type { Bilingual } from "@/components/providers/LanguageProvider";
import blurMap from "./image-blur.json";

/**
 * The hardware catalogue that drives imagery across the site.
 *
 * `photo`  — set true once a photograph of the component is placed at
 *            public/images/hardware/<slug>.webp. Until then the component
 *            renders as a generated blueprint illustration.
 * `model`  — optional GLB dropped into public/models/<file>.
 *            When present, the component renders an interactive 3D viewer
 *            instead of a still photo. See docs/adding-3d-models.md.
 */
export type Hardware = {
  slug: string;
  name: string;
  category: "board" | "component" | "sensor" | "actuator" | "tool" | "module";
  blurb: Bilingual;
  /** A short spec line rendered in mono type on cards. */
  spec?: string;
  photo: boolean;
  model?: string;
};

export const HARDWARE: Hardware[] = [
  {
    slug: "esp32",
    name: "ESP32",
    category: "board",
    spec: "240MHz · Wi-Fi + BLE",
    blurb: {
      en: "The brain of InnovateX 3.0. A dual-core microcontroller with Wi-Fi and Bluetooth built in.",
      ta: "InnovateX 3.0-இன் மூளை. Wi-Fi மற்றும் Bluetooth உள்ளமைக்கப்பட்ட இரட்டை-கோர் மைக்ரோகண்ட்ரோலர்.",
    },
    photo: false,
    model: "esp32.glb",
  },
  {
    slug: "arduino-uno",
    name: "Arduino Uno",
    category: "board",
    spec: "ATmega328P · 14 GPIO",
    blurb: {
      en: "The classic starting board — forgiving, well documented, and perfect for first circuits.",
      ta: "உன்னதமான தொடக்க போர்டு — எளிதானது, நன்கு ஆவணப்படுத்தப்பட்டது, முதல் சுற்றுகளுக்கு ஏற்றது.",
    },
    photo: false,
    model: "arduino-uno.glb",
  },
  {
    slug: "arduino-nano",
    name: "Arduino Nano",
    category: "board",
    spec: "Breadboard-friendly",
    blurb: {
      en: "An Uno shrunk to fit straight into a breadboard — same brain, far less space.",
      ta: "பிரெட்போர்டில் நேரடியாகப் பொருந்தும் சிறிய Uno — அதே மூளை, மிகக் குறைந்த இடம்.",
    },
    photo: false,
  },
  {
    slug: "raspberry-pi-pico",
    name: "Raspberry Pi Pico",
    category: "board",
    spec: "RP2040 · Dual M0+",
    blurb: {
      en: "A tiny, fast board that also speaks MicroPython — a friendly route into code.",
      ta: "MicroPython பேசும் சிறிய, வேகமான போர்டு — குறியீட்டிற்கான எளிய பாதை.",
    },
    photo: false,
  },
  {
    slug: "breadboard",
    name: "Breadboard",
    category: "component",
    spec: "830 tie points",
    blurb: {
      en: "Build real circuits with zero soldering — and undo any mistake in one second.",
      ta: "சோல்டரிங் இல்லாமல் உண்மையான சுற்றுகள் — எந்த தவறையும் ஒரு வினாடியில் மாற்றலாம்.",
    },
    photo: false,
    model: "breadboard.glb",
  },
  {
    slug: "led",
    name: "LED",
    category: "component",
    spec: "~2.0V · 20mA",
    blurb: {
      en: "A one-way door for electricity that glows when current flows the right way.",
      ta: "மின்னோட்டம் சரியான வழியில் பாயும்போது ஒளிரும் ஒரு வழி கதவு.",
    },
    photo: false,
  },
  {
    slug: "resistor",
    name: "Resistor",
    category: "component",
    spec: "220Ω · ±5%",
    blurb: {
      en: "The traffic controller of a circuit — it limits current and protects everything downstream.",
      ta: "சுற்றின் போக்குவரத்து கட்டுப்படுத்தி — மின்னோட்டத்தை கட்டுப்படுத்தி அனைத்தையும் பாதுகாக்கிறது.",
    },
    photo: false,
  },
  {
    slug: "capacitor",
    name: "Capacitor",
    category: "component",
    spec: "Charge reservoir",
    blurb: {
      en: "Stores a small amount of charge and releases it — smoothing out bumps in power.",
      ta: "சிறிதளவு மின்னூட்டத்தை சேமித்து வெளியிடுகிறது — மின்சக்தியில் ஏற்ற இறக்கங்களை சமன் செய்கிறது.",
    },
    photo: false,
  },
  {
    slug: "ultrasonic-sensor",
    name: "HC-SR04",
    category: "sensor",
    spec: "2cm – 400cm range",
    blurb: {
      en: "Measures distance with sound, exactly like a bat — the heart of an obstacle-avoiding robot.",
      ta: "வௌவால் போல ஒலியால் தூரத்தை அளக்கிறது — தடை-தவிர்க்கும் ரோபோவின் இதயம்.",
    },
    photo: false,
    model: "hc-sr04.glb",
  },
  {
    slug: "pir-sensor",
    name: "PIR Sensor",
    category: "sensor",
    spec: "Motion · ~7m",
    blurb: {
      en: "Detects the body heat of anything that moves nearby — the classic security-project sensor.",
      ta: "அருகில் நகரும் எதன் உடல் வெப்பத்தையும் கண்டறிகிறது — பாதுகாப்பு திட்டங்களுக்கான சென்சார்.",
    },
    photo: false,
  },
  {
    slug: "temperature-sensor",
    name: "DHT11",
    category: "sensor",
    spec: "Temp + Humidity",
    blurb: {
      en: "Reads temperature and humidity together — the first sensor in almost every weather station.",
      ta: "வெப்பநிலை மற்றும் ஈரப்பதத்தை ஒன்றாக படிக்கிறது — வானிலை நிலையங்களின் முதல் சென்சார்.",
    },
    photo: false,
    model: "dht11.glb",
  },
  {
    slug: "servo-motor",
    name: "Servo Motor",
    category: "actuator",
    spec: "0° – 180° control",
    blurb: {
      en: "Turns to an exact angle and holds it — how robots steer, grip, and aim.",
      ta: "ஒரு துல்லியமான கோணத்திற்கு திரும்பி நிலைத்திருக்கும் — ரோபோக்கள் திசைதிருப்ப உதவுகிறது.",
    },
    photo: false,
    model: "servo.glb",
  },
  {
    slug: "dc-motor",
    name: "DC Motor",
    category: "actuator",
    spec: "Continuous rotation",
    blurb: {
      en: "Spins continuously to drive wheels — the muscle behind every line-follower robot.",
      ta: "சக்கரங்களை இயக்க தொடர்ந்து சுழலும் — ஒவ்வொரு ரோபோவின் தசை.",
    },
    photo: false,
  },
  {
    slug: "stepper-motor",
    name: "Stepper Motor",
    category: "actuator",
    spec: "1.8° per step",
    blurb: {
      en: "Moves in precise steps rather than free spinning — the motor behind 3D printers and CNC.",
      ta: "சுதந்திரமாக சுழலாமல் துல்லியமான படிகளில் நகரும் — 3D பிரிண்டர்களின் மோட்டார்.",
    },
    photo: false,
  },
  {
    slug: "bluetooth-module",
    name: "HC-05 Bluetooth",
    category: "module",
    spec: "Serial over BT",
    blurb: {
      en: "Lets a phone talk to your robot wirelessly — the bridge for app-controlled projects.",
      ta: "உங்கள் ரோபோவுடன் ஃபோன் வயர்லெஸாக பேச அனுமதிக்கிறது — ஆப் கட்டுப்பாட்டிற்கான பாலம்.",
    },
    photo: false,
  },
  {
    slug: "battery-pack",
    name: "Battery Pack",
    category: "component",
    spec: "4×AA · 6V",
    blurb: {
      en: "Portable power so your robot can leave the desk and roam free.",
      ta: "உங்கள் ரோபோ மேசையை விட்டு சுதந்திரமாக நகர பெயர்வு மின்சக்தி.",
    },
    photo: false,
  },
  {
    slug: "pcb",
    name: "PCB",
    category: "component",
    spec: "Copper traces",
    blurb: {
      en: "Where a finished circuit finally lives — copper highways etched into fibreglass.",
      ta: "முடிக்கப்பட்ட சுற்று இறுதியாக வாழும் இடம் — ஃபைபர்கிளாஸில் பொறிக்கப்பட்ட தாமிர பாதைகள்.",
    },
    photo: false,
  },
  {
    slug: "multimeter",
    name: "Multimeter",
    category: "tool",
    spec: "V · A · Ω",
    blurb: {
      en: "The debugger of the physical world — it tells you what your circuit is actually doing.",
      ta: "இயற்பியல் உலகின் பிழைதிருத்தி — உங்கள் சுற்று உண்மையில் என்ன செய்கிறது என்று சொல்கிறது.",
    },
    photo: false,
  },
  {
    slug: "oscilloscope",
    name: "Oscilloscope",
    category: "tool",
    spec: "Signal over time",
    blurb: {
      en: "Draws electricity as a picture so you can see a signal, not just measure it.",
      ta: "மின்சாரத்தை படமாக வரைகிறது — சமிக்ஞையை அளப்பது மட்டுமல்ல, பார்க்கவும் முடியும்.",
    },
    photo: false,
  },
  {
    slug: "soldering",
    name: "Soldering",
    category: "tool",
    spec: "350°C tip",
    blurb: {
      en: "How a temporary breadboard idea becomes a permanent, rugged build.",
      ta: "தற்காலிக பிரெட்போர்டு யோசனை நிரந்தர, உறுதியான கட்டமைப்பாக மாறும் விதம்.",
    },
    photo: false,
  },

  /* ---- In the kit, but no free-licensed photograph sourced yet. ----
     These render the generated blueprint plate. Drop a photo into
     public/images/hardware/<slug>.jpg, re-run the image scripts, and flip
     `photo` to true — nothing else needs to change. */
  {
    slug: "jumper-wires",
    name: "Jumper Wires",
    category: "component",
    spec: "M-M · M-F",
    blurb: {
      en: "The connections themselves — how every part of a breadboard circuit reaches the next.",
      ta: "இணைப்புகள் — பிரெட்போர்டு சுற்றின் ஒவ்வொரு பகுதியும் அடுத்ததை அடையும் விதம்.",
    },
    photo: false,
  },
  {
    slug: "ir-sensor",
    name: "IR Sensor",
    category: "sensor",
    spec: "Reflective · digital",
    blurb: {
      en: "Bounces infrared light off a surface to tell black from white — the eye of a line-follower.",
      ta: "மேற்பரப்பில் அகச்சிவப்பு ஒளியை பிரதிபலித்து கருப்பு வெள்ளையை வேறுபடுத்துகிறது.",
    },
    photo: false,
  },
  {
    slug: "gas-sensor",
    name: "MQ Gas Sensor",
    category: "sensor",
    spec: "Smoke · LPG · CO",
    blurb: {
      en: "Senses smoke and combustible gas in the air — the core of a fire-alarm project.",
      ta: "காற்றில் புகை மற்றும் எரியக்கூடிய வாயுவை உணர்கிறது — தீ எச்சரிக்கை திட்டத்தின் மையம்.",
    },
    photo: false,
  },
  {
    slug: "relay-module",
    name: "Relay Module",
    category: "module",
    spec: "Switches mains loads",
    blurb: {
      en: "Lets a 3.3V board switch a real household light — always used with adult supervision.",
      ta: "3.3V போர்டு உண்மையான வீட்டு விளக்கை இயக்க அனுமதிக்கிறது — எப்போதும் மேற்பார்வையுடன்.",
    },
    photo: false,
  },
  {
    slug: "motor-driver",
    name: "L298N Driver",
    category: "module",
    spec: "Dual H-bridge",
    blurb: {
      en: "Stands between the board and the motors, supplying the current a GPIO pin never could.",
      ta: "போர்டுக்கும் மோட்டார்களுக்கும் இடையே நின்று, GPIO பின்னால் வழங்க முடியாத மின்னோட்டத்தை அளிக்கிறது.",
    },
    photo: false,
  },
  {
    slug: "oled-display",
    name: "OLED Display",
    category: "module",
    spec: "128×64 · I2C",
    blurb: {
      en: "A tiny screen that lets a project show its readings without a computer attached.",
      ta: "கணினி இல்லாமல் திட்டம் தன் அளவீடுகளை காட்ட உதவும் சிறிய திரை.",
    },
    photo: false,
  },
  {
    slug: "lcd-display",
    name: "LCD Display",
    category: "module",
    spec: "16×2 characters",
    blurb: {
      en: "Two lines of text, driven over a handful of pins — the classic project readout.",
      ta: "சில பின்கள் மூலம் இயக்கப்படும் இரண்டு வரி உரை — உன்னதமான திட்ட காட்சி.",
    },
    photo: false,
  },
  {
    slug: "robot-chassis",
    name: "Robot Chassis",
    category: "component",
    spec: "2WD platform",
    blurb: {
      en: "The frame that carries the board, battery and motors — where a circuit becomes a robot.",
      ta: "போர்டு, பேட்டரி மற்றும் மோட்டார்களை சுமக்கும் சட்டகம் — சுற்று ரோபோவாக மாறும் இடம்.",
    },
    photo: false,
  },

  /* ---- Added for the full beginner curriculum ---- */
  {
    slug: "rgb-led",
    name: "RGB LED",
    category: "component",
    spec: "3 LEDs in 1 · common cathode",
    blurb: {
      en: "Three LEDs — red, green, blue — in one bulb. Mix their brightness to make almost any colour.",
      ta: "ஒரே பல்பில் மூன்று LED-கள் — சிவப்பு, பச்சை, நீலம். அவற்றின் பிரகாசத்தை கலந்து எந்த நிறத்தையும் உருவாக்கலாம்.",
    },
    photo: false,
  },
  {
    slug: "push-button",
    name: "Push Button",
    category: "component",
    spec: "Momentary · 4-pin",
    blurb: {
      en: "The simplest input there is — closes a circuit only while it's held down.",
      ta: "மிக எளிய உள்ளீடு — அழுத்தும் போது மட்டும் சுற்றை மூடுகிறது.",
    },
    photo: false,
  },
  {
    slug: "buzzer",
    name: "Buzzer",
    category: "component",
    spec: "Active · ~2-5kHz tone",
    blurb: {
      en: "Turns an electrical signal into a beep — the go-to for alarms and alerts.",
      ta: "மின் சமிக்ஞையை ஒலியாக மாற்றுகிறது — எச்சரிக்கைகளுக்கான பொதுவான தேர்வு.",
    },
    photo: false,
  },
  {
    slug: "potentiometer",
    name: "Potentiometer",
    category: "component",
    spec: "0-5V variable output",
    blurb: {
      en: "A knob that turns physical rotation into a changing voltage — how a volume dial works.",
      ta: "சுழற்சியை மாறுபடும் மின்னழுத்தமாக மாற்றும் ஒரு நாப் — ஒலி அளவு கட்டுப்படுத்தி போல.",
    },
    photo: false,
  },
  {
    slug: "ldr",
    name: "LDR (Light Sensor)",
    category: "sensor",
    spec: "Resistance drops with light",
    blurb: {
      en: "A resistor that changes with light level — bright light lowers its resistance.",
      ta: "ஒளியின் அளவுக்கு ஏற்ப மாறும் ஒரு எதிர்ப்பான் — பிரகாசமான ஒளி எதிர்ப்பை குறைக்கிறது.",
    },
    photo: false,
  },
  {
    slug: "sound-sensor",
    name: "Sound Sensor",
    category: "sensor",
    spec: "Microphone + comparator",
    blurb: {
      en: "Detects claps, knocks and loud noises above a threshold you can tune.",
      ta: "கைதட்டல், தட்டல் மற்றும் சத்தமான ஒலிகளை கண்டறிகிறது.",
    },
    photo: false,
  },
  {
    slug: "flame-sensor",
    name: "Flame Sensor",
    category: "sensor",
    spec: "IR flame wavelength",
    blurb: {
      en: "Detects the infrared light a flame gives off — the sensor behind a fire-alarm project.",
      ta: "தீ வெளியிடும் அகச்சிவப்பு ஒளியை கண்டறிகிறது — தீ எச்சரிக்கை திட்டத்தின் சென்சார்.",
    },
    photo: false,
  },
  {
    slug: "soil-moisture-sensor",
    name: "Soil Moisture Sensor",
    category: "sensor",
    spec: "Two probes · resistance",
    blurb: {
      en: "Measures how wet soil is — the sensor behind an automatic plant-watering project.",
      ta: "மண் எவ்வளவு ஈரமாக உள்ளது என்பதை அளக்கிறது — தானியங்கி நீர்ப்பாசன திட்டத்தின் சென்சார்.",
    },
    photo: false,
  },
  {
    slug: "rain-sensor",
    name: "Rain Sensor",
    category: "sensor",
    spec: "Conductive board",
    blurb: {
      en: "Detects water droplets on its board — used to trigger a warning when rain starts.",
      ta: "அதன் பலகையில் நீர் துளிகளை கண்டறிகிறது — மழை தொடங்கும்போது எச்சரிக்க பயன்படுகிறது.",
    },
    photo: false,
  },
];

/** Look up a single hardware entry. */
export function getHardware(slug: string): Hardware | undefined {
  return HARDWARE.find((item) => item.slug === slug);
}

export const IMAGE_BLUR = blurMap as Record<string, string>;
