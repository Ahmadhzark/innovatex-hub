import type { Bilingual } from "@/components/providers/LanguageProvider";
import type { CircuitDiagramData } from "@/components/learn/CircuitDiagram";

/**
 * Buildable projects, each with a complete guide on its own page.
 *
 * Projects are not ranked by difficulty — a student picks whatever they want
 * to build. `buildTime` gives an honest sense of the commitment instead.
 *
 * Optional fields degrade gracefully: a project with no `assembly` simply
 * doesn't render an assembly section, so a short entry stays valid while a
 * fully documented one shows everything.
 */

export type EquipmentItem = {
  name: Bilingual;
  quantity: string;
  note?: Bilingual;
};

export type Project = {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  /** Hardware slug used for the card image. */
  hero: string;
  /** Hardware slugs — rendered as chips and used for the equipment list. */
  components: string[];
  /** Concepts the build teaches. */
  skills: string[];
  /** Rough hands-on time, in minutes. */
  buildTime: number;
  category: "robotics" | "sensors" | "iot" | "automation";

  overview?: Bilingual;
  objectives?: Bilingual[];
  equipment?: EquipmentItem[];
  wiring?: CircuitDiagramData[];
  assembly?: Array<{ title: Bilingual; text: Bilingual }>;
  code?: { filename: string; content: string };
  codeExplanation?: Array<{ title: Bilingual; text: Bilingual }>;
  libraries?: Array<{ name: string; note: Bilingual }>;
  testing?: Bilingual[];
  troubleshooting?: Array<{ problem: Bilingual; fix: Bilingual }>;
  mistakes?: Bilingual[];
  safety?: Bilingual[];
  expected?: Bilingual;
};

export const CATEGORY_LABEL: Record<Project["category"], Bilingual> = {
  robotics: { en: "Robotics", ta: "ரோபோட்டிக்ஸ்" },
  sensors: { en: "Sensors", ta: "சென்சார்கள்" },
  iot: { en: "IoT", ta: "IoT" },
  automation: { en: "Automation", ta: "தானியக்கம்" },
};

/** Shared safety notes that apply to every motorised build. */
const ROBOT_SAFETY: Bilingual[] = [
  {
    en: "Disconnect the battery before changing any wiring. Motors can start unexpectedly if a signal pin floats.",
    ta: "வயரிங்கை மாற்றும் முன் பேட்டரியை துண்டிக்கவும். சிக்னல் பின் மிதந்தால் மோட்டார்கள் எதிர்பாராமல் இயங்கலாம்.",
  },
  {
    en: "Never power motors directly from the board's 5V pin — always use the motor driver's own battery input.",
    ta: "மோட்டார்களை போர்டின் 5V பின்னிலிருந்து நேரடியாக இயக்க வேண்டாம் — எப்போதும் மோட்டார் டிரைவரின் பேட்டரி உள்ளீட்டைப் பயன்படுத்தவும்.",
  },
  {
    en: "Test the robot on the floor or a wide table with the wheels clear — a robot that drives off a desk edge can break.",
    ta: "சக்கரங்கள் சுதந்திரமாக இருக்கும் நிலையில் தரையில் அல்லது அகன்ற மேசையில் சோதிக்கவும்.",
  },
];

const COMMON_MOTOR_MISTAKES: Bilingual[] = [
  {
    en: "Forgetting the shared ground. The board's GND and the motor driver's GND must be connected, or signals are meaningless.",
    ta: "பொதுவான கிரவுண்டை மறப்பது. போர்டின் GND மற்றும் மோட்டார் டிரைவரின் GND இணைக்கப்பட வேண்டும்.",
  },
  {
    en: "One wheel spinning backwards. Swap that motor's two wires — there's no wrong way round, just swap and retest.",
    ta: "ஒரு சக்கரம் பின்னோக்கி சுழல்வது. அந்த மோட்டாரின் இரண்டு வயர்களை மாற்றவும்.",
  },
  {
    en: "Weak or flat batteries. Motors draw far more current than the board — most \"random\" robot behaviour is low battery.",
    ta: "பலவீனமான பேட்டரிகள். மோட்டார்கள் போர்டை விட அதிக மின்னோட்டத்தை எடுக்கின்றன.",
  },
];

export const PROJECTS: Project[] = [
  /* ------------------------------------------------- Line Follower */
  {
    slug: "line-follower-robot",
    title: { en: "Line Following Robot", ta: "கோடு பின்தொடரும் ரோபோ" },
    description: {
      en: "Two infrared sensors watch the floor and keep the robot centred on a black line, correcting itself continuously.",
      ta: "இரண்டு அகச்சிவப்பு சென்சார்கள் தரையை கண்காணித்து, கருப்பு கோட்டின் மையத்தில் ரோபோவை வைத்திருக்கின்றன.",
    },
    hero: "ir-sensor",
    components: ["arduino-uno", "ir-sensor", "dc-motor", "battery-pack"],
    skills: ["Sensor reading", "Feedback loops", "Motor control"],
    buildTime: 90,
    category: "robotics",
    overview: {
      en: "A line follower is the classic first robot, and the clearest possible demonstration of the sense-think-act loop. Two IR sensors point at the floor just ahead of the wheels. Black absorbs infrared and reflects almost nothing back; white reflects strongly. By comparing what the left and right sensors see, the robot works out which way it is drifting and steers back.",
      ta: "லைன் ஃபாலோவர் என்பது உன்னதமான முதல் ரோபோ, மற்றும் உணர்-சிந்தி-செயல்படு சுழற்சியின் தெளிவான நிரூபணம். இரண்டு IR சென்சார்கள் சக்கரங்களுக்கு முன்னால் தரையை நோக்கியுள்ளன.",
    },
    objectives: [
      { en: "Read two digital sensors and act on their combination", ta: "இரண்டு டிஜிட்டல் சென்சார்களைப் படித்து செயல்படுதல்" },
      { en: "Drive two motors independently through a motor driver", ta: "மோட்டார் டிரைவர் வழியாக இரண்டு மோட்டார்களை இயக்குதல்" },
      { en: "Write correction logic that runs continuously", ta: "தொடர்ந்து இயங்கும் திருத்த தர்க்கத்தை எழுதுதல்" },
      { en: "Calibrate a sensor to a real surface", ta: "உண்மையான மேற்பரப்பிற்கு சென்சாரை அளவீடு செய்தல்" },
    ],
    equipment: [
      { name: { en: "Arduino Uno (or ESP32)", ta: "Arduino Uno (அல்லது ESP32)" }, quantity: "1" },
      { name: { en: "IR line sensor module", ta: "IR லைன் சென்சார் மாடியூல்" }, quantity: "2" },
      { name: { en: "L298N motor driver", ta: "L298N மோட்டார் டிரைவர்" }, quantity: "1" },
      { name: { en: "DC gear motor with wheel", ta: "சக்கரத்துடன் DC கியர் மோட்டார்" }, quantity: "2" },
      { name: { en: "Robot chassis", ta: "ரோபோ சட்டகம்" }, quantity: "1" },
      { name: { en: "Battery pack", ta: "பேட்டரி பேக்" }, quantity: "1", note: { en: "6V–9V for the motors", ta: "மோட்டார்களுக்கு 6V–9V" } },
      { name: { en: "Jumper wires", ta: "ஜம்பர் வயர்கள்" }, quantity: "~12" },
      { name: { en: "Black electrical tape", ta: "கருப்பு மின் டேப்" }, quantity: "1 roll", note: { en: "To lay the track on a light floor", ta: "வெளிர் தரையில் பாதை அமைக்க" } },
    ],
    wiring: [
      {
        controller: "Arduino Uno",
        controllerPins: ["5V", "GND", "D2", "D3"],
        device: "IR Sensors",
        devicePins: ["VCC", "GND", "Left OUT", "Right OUT"],
        links: [
          { from: "5V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "D2", to: "Left OUT", color: "signal" },
          { from: "D3", to: "Right OUT", color: "signal2" },
        ],
      },
      {
        controller: "Arduino Uno",
        controllerPins: ["D5", "D6", "D9", "D10"],
        device: "L298N Driver",
        devicePins: ["IN1", "IN2", "IN3", "IN4"],
        links: [
          { from: "D5", to: "IN1", color: "signal" },
          { from: "D6", to: "IN2", color: "signal" },
          { from: "D9", to: "IN3", color: "signal2" },
          { from: "D10", to: "IN4", color: "signal2" },
        ],
      },
    ],
    assembly: [
      { title: { en: "1. Build the chassis", ta: "1. சட்டகத்தை கட்டமைக்கவும்" }, text: { en: "Fix the two gear motors to the chassis and fit the wheels. Add the castor or ball wheel at the front so the robot balances on three points.", ta: "இரண்டு கியர் மோட்டார்களை சட்டகத்தில் பொருத்தி சக்கரங்களைப் பொருத்தவும்." } },
      { title: { en: "2. Mount the sensors", ta: "2. சென்சார்களைப் பொருத்தவும்" }, text: { en: "Fit the two IR sensors at the front, facing down, about 1cm above the floor and roughly 2–3cm apart — just wider than your tape line.", ta: "இரண்டு IR சென்சார்களை முன்பக்கம், கீழ்நோக்கி, தரையிலிருந்து சுமார் 1cm உயரத்தில் பொருத்தவும்." } },
      { title: { en: "3. Mount the board and driver", ta: "3. போர்டு மற்றும் டிரைவரைப் பொருத்தவும்" }, text: { en: "Fix the Arduino and L298N to the chassis deck. Keep the battery near the centre so the robot doesn't tip.", ta: "Arduino மற்றும் L298N-ஐ சட்டகத்தில் பொருத்தவும். பேட்டரியை மையத்திற்கு அருகில் வைக்கவும்." } },
      { title: { en: "4. Wire the motors", ta: "4. மோட்டார்களை இணைக்கவும்" }, text: { en: "Connect the left motor to OUT1/OUT2 and the right motor to OUT3/OUT4 on the L298N. Connect the battery to the driver's 12V and GND terminals.", ta: "இடது மோட்டாரை OUT1/OUT2-உடனும், வலது மோட்டாரை OUT3/OUT4-உடனும் இணைக்கவும்." } },
      { title: { en: "5. Wire signals and share ground", ta: "5. சிக்னல்கள் மற்றும் பொது கிரவுண்ட்" }, text: { en: "Wire the sensor and driver pins as shown in the diagrams above. Crucially, connect the Arduino's GND to the L298N's GND — without this shared ground nothing works reliably.", ta: "மேலே உள்ள வரைபடங்களின்படி இணைக்கவும். Arduino-வின் GND-ஐ L298N-இன் GND-உடன் இணைப்பது மிக முக்கியம்." } },
      { title: { en: "6. Lay the track", ta: "6. பாதையை அமைக்கவும்" }, text: { en: "Stick black tape on a light floor in a loop with gentle curves. Sharp corners are much harder for a two-sensor robot — start easy.", ta: "வெளிர் தரையில் மென்மையான வளைவுகளுடன் கருப்பு டேப்பை ஒட்டவும்." } },
    ],
    libraries: [
      { name: "None", note: { en: "This sketch uses only built-in Arduino functions — nothing to install.", ta: "இந்த ஸ்கெட்ச் உள்ளமைந்த Arduino செயல்பாடுகளை மட்டுமே பயன்படுத்துகிறது." } },
    ],
    code: {
      filename: "line_follower_robot.ino",
      content: `/*
  Line Following Robot — InnovateX 3.0
  Two IR sensors read the floor; the robot steers to keep the
  line between them.
*/

// --- Sensor pins ---
const int LEFT_SENSOR  = 2;
const int RIGHT_SENSOR = 3;

// --- Motor driver pins (L298N) ---
const int LEFT_FWD   = 5;
const int LEFT_BACK  = 6;
const int RIGHT_FWD  = 9;
const int RIGHT_BACK = 10;

// Most IR modules read LOW over black and HIGH over white.
// If yours is the other way round, flip this to false.
const bool BLACK_IS_LOW = true;

void setup() {
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);

  pinMode(LEFT_FWD, OUTPUT);
  pinMode(LEFT_BACK, OUTPUT);
  pinMode(RIGHT_FWD, OUTPUT);
  pinMode(RIGHT_BACK, OUTPUT);

  Serial.begin(9600);
}

// Returns true when this sensor is sitting over the black line.
bool onLine(int pin) {
  int value = digitalRead(pin);
  return BLACK_IS_LOW ? (value == LOW) : (value == HIGH);
}

void forward() {
  digitalWrite(LEFT_FWD, HIGH);  digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, HIGH); digitalWrite(RIGHT_BACK, LOW);
}

void turnLeft() {
  digitalWrite(LEFT_FWD, LOW);   digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, HIGH); digitalWrite(RIGHT_BACK, LOW);
}

void turnRight() {
  digitalWrite(LEFT_FWD, HIGH);  digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, LOW);  digitalWrite(RIGHT_BACK, LOW);
}

void stopMotors() {
  digitalWrite(LEFT_FWD, LOW);  digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, LOW); digitalWrite(RIGHT_BACK, LOW);
}

void loop() {
  bool left  = onLine(LEFT_SENSOR);
  bool right = onLine(RIGHT_SENSOR);

  if (!left && !right) {
    // Line is between the sensors — dead centre.
    forward();
  } else if (left && !right) {
    // Drifted right, so the left sensor found the line. Steer left.
    turnLeft();
  } else if (!left && right) {
    // Drifted left. Steer right.
    turnRight();
  } else {
    // Both on black: either a junction or the end of the track.
    stopMotors();
  }

  delay(10);
}`,
    },
    codeExplanation: [
      { title: { en: "onLine() hides the sensor's quirk", ta: "onLine() சென்சாரின் தனித்தன்மையை மறைக்கிறது" }, text: { en: "Different IR modules report black as HIGH or LOW. Rather than scattering that detail through the code, one constant at the top flips it, and the rest of the sketch just asks \"is this sensor on the line?\".", ta: "வெவ்வேறு IR மாடியூல்கள் கருப்பை HIGH அல்லது LOW ஆக அறிவிக்கின்றன. மேலே உள்ள ஒரு மாறிலி அதை மாற்றுகிறது." } },
      { title: { en: "Four cases, four responses", ta: "நான்கு நிலைகள், நான்கு பதில்கள்" }, text: { en: "With two sensors there are exactly four possibilities. Neither on the line means the line is between them — go straight. One on the line means the robot has drifted, so turn toward that side. Both on the line usually means a junction.", ta: "இரண்டு சென்சார்களுடன் சரியாக நான்கு சாத்தியங்கள் உள்ளன." } },
      { title: { en: "Turning by stopping one wheel", ta: "ஒரு சக்கரத்தை நிறுத்தி திரும்புதல்" }, text: { en: "This robot steers like a tank: to go left, the left wheel stops while the right keeps driving, pivoting the robot. It's crude but very responsive, which is what a line follower needs.", ta: "இந்த ரோபோ டேங்க் போல திரும்புகிறது: இடதுபுறம் செல்ல, இடது சக்கரம் நிற்கும், வலது சக்கரம் இயங்கும்." } },
      { title: { en: "The 10ms delay", ta: "10ms தாமதம்" }, text: { en: "A short pause keeps the loop from running thousands of times a second, which would make the robot twitch. Increase it slightly if the robot wobbles; decrease it if it overshoots corners.", ta: "குறுகிய இடைவெளி சுழற்சி விநாடிக்கு ஆயிரக்கணக்கான முறை இயங்குவதைத் தடுக்கிறது." } },
    ],
    testing: [
      { en: "With the battery disconnected, upload the code and open the Serial Monitor. Wave your hand under each sensor and confirm the readings change.", ta: "பேட்டரி துண்டிக்கப்பட்ட நிலையில், குறியீட்டைப் பதிவேற்றி Serial Monitor-ஐ திறக்கவும்." },
      { en: "Lift the robot off the ground, connect the battery, and check both wheels spin forward when nothing is under the sensors.", ta: "ரோபோவை தூக்கி, பேட்டரியை இணைத்து, இரு சக்கரங்களும் முன்னோக்கி சுழல்கின்றனவா என சரிபார்க்கவும்." },
      { en: "Still holding it up, cover the left sensor — the left wheel should stop. Repeat for the right.", ta: "தூக்கிப் பிடித்தபடி, இடது சென்சாரை மறைக்கவும் — இடது சக்கரம் நிற்க வேண்டும்." },
      { en: "Place the robot on the line and let it go. Adjust the sensor height if it loses the line on curves.", ta: "ரோபோவை கோட்டில் வைத்து விடுங்கள். வளைவுகளில் கோட்டை இழந்தால் சென்சார் உயரத்தை சரிசெய்யவும்." },
    ],
    troubleshooting: [
      { problem: { en: "The robot drives straight past the line", ta: "ரோபோ கோட்டைத் தாண்டி நேராக செல்கிறது" }, fix: { en: "The sensors aren't detecting black. Lower them closer to the floor (about 1cm), or flip BLACK_IS_LOW in the code.", ta: "சென்சார்கள் கருப்பை கண்டறியவில்லை. அவற்றை தரைக்கு அருகில் இறக்கவும், அல்லது BLACK_IS_LOW-ஐ மாற்றவும்." } },
      { problem: { en: "It turns the wrong way", ta: "இது தவறான திசையில் திரும்புகிறது" }, fix: { en: "The left and right motor wires are swapped at the driver. Swap OUT1/OUT2 with OUT3/OUT4, or swap the sensor pins in the code.", ta: "இடது மற்றும் வலது மோட்டார் வயர்கள் மாறியுள்ளன. OUT1/OUT2-ஐ OUT3/OUT4-உடன் மாற்றவும்." } },
      { problem: { en: "One wheel spins backwards", ta: "ஒரு சக்கரம் பின்னோக்கி சுழல்கிறது" }, fix: { en: "Swap that motor's two wires at the driver terminals. Motors have no correct polarity — just reverse them.", ta: "அந்த மோட்டாரின் இரண்டு வயர்களை மாற்றவும்." } },
      { problem: { en: "The robot twitches or moves erratically", ta: "ரோபோ நடுங்குகிறது" }, fix: { en: "Usually a flat battery or a missing shared ground between the board and the driver. Check both.", ta: "பொதுவாக பேட்டரி தீர்ந்துவிட்டது அல்லது பொது கிரவுண்ட் இல்லை." } },
    ],
    mistakes: COMMON_MOTOR_MISTAKES,
    safety: ROBOT_SAFETY,
    expected: {
      en: "Placed on a black line, the robot drives forward and continuously corrects left and right, following the loop without leaving the tape. It should complete a gentle circuit unattended.",
      ta: "கருப்பு கோட்டில் வைக்கப்பட்டால், ரோபோ முன்னோக்கி இயங்கி, இடது வலதுபுறமாக தொடர்ந்து திருத்தி, டேப்பை விட்டு விலகாமல் பாதையைப் பின்தொடரும்.",
    },
  },

  /* ---------------------------------------------- Obstacle Avoider */
  {
    slug: "obstacle-avoiding-robot",
    title: { en: "Obstacle Avoiding Robot", ta: "தடை தவிர்க்கும் ரோபோ" },
    description: {
      en: "An ultrasonic sensor measures the distance ahead and the robot steers away before it ever touches anything.",
      ta: "அல்ட்ராசோனிக் சென்சார் முன்னால் உள்ள தூரத்தை அளந்து, எதையும் தொடுவதற்கு முன் ரோபோ விலகிச் செல்கிறது.",
    },
    hero: "ultrasonic-sensor",
    components: ["esp32", "ultrasonic-sensor", "dc-motor", "battery-pack"],
    skills: ["Distance sensing", "Decision logic", "Motor control"],
    buildTime: 100,
    category: "robotics",
    overview: {
      en: "This robot navigates using sound, exactly the way a bat does. The HC-SR04 sends out an ultrasonic pulse and times how long the echo takes to return; that time converts directly into distance. When something appears closer than a set threshold, the robot backs off and turns before continuing.",
      ta: "இந்த ரோபோ வௌவால் போலவே ஒலியைப் பயன்படுத்தி வழிசெலுத்துகிறது. HC-SR04 ஒரு அல்ட்ராசோனிக் துடிப்பை அனுப்பி எதிரொலி திரும்பும் நேரத்தை அளக்கிறது.",
    },
    objectives: [
      { en: "Trigger a sensor and time its response precisely", ta: "சென்சாரை இயக்கி அதன் பதிலை துல்லியமாக அளத்தல்" },
      { en: "Convert a raw measurement into a real-world unit", ta: "ஒரு அளவீட்டை நிஜ உலக அலகாக மாற்றுதல்" },
      { en: "Write threshold-based decision logic", ta: "வரம்பு அடிப்படையிலான முடிவெடுக்கும் தர்க்கத்தை எழுதுதல்" },
      { en: "Sequence several motor moves into one manoeuvre", ta: "பல மோட்டார் அசைவுகளை ஒரு சூழ்ச்சியாக வரிசைப்படுத்துதல்" },
    ],
    equipment: [
      { name: { en: "ESP32 (or Arduino Uno)", ta: "ESP32 (அல்லது Arduino Uno)" }, quantity: "1" },
      { name: { en: "HC-SR04 ultrasonic sensor", ta: "HC-SR04 அல்ட்ராசோனிக் சென்சார்" }, quantity: "1" },
      { name: { en: "L298N motor driver", ta: "L298N மோட்டார் டிரைவர்" }, quantity: "1" },
      { name: { en: "DC gear motor with wheel", ta: "சக்கரத்துடன் DC கியர் மோட்டார்" }, quantity: "2" },
      { name: { en: "Robot chassis", ta: "ரோபோ சட்டகம்" }, quantity: "1" },
      { name: { en: "Battery pack", ta: "பேட்டரி பேக்" }, quantity: "1", note: { en: "6V–9V for the motors", ta: "மோட்டார்களுக்கு 6V–9V" } },
      { name: { en: "Jumper wires", ta: "ஜம்பர் வயர்கள்" }, quantity: "~12" },
    ],
    wiring: [
      {
        controller: "ESP32",
        controllerPins: ["5V", "GND", "GPIO5", "GPIO18"],
        device: "HC-SR04",
        devicePins: ["VCC", "GND", "Trig", "Echo"],
        links: [
          { from: "5V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "GPIO5", to: "Trig", color: "signal" },
          { from: "GPIO18", to: "Echo", color: "signal2" },
        ],
      },
      {
        controller: "ESP32",
        controllerPins: ["GPIO14", "GPIO12", "GPIO27", "GPIO26"],
        device: "L298N Driver",
        devicePins: ["IN1", "IN2", "IN3", "IN4"],
        links: [
          { from: "GPIO14", to: "IN1", color: "signal" },
          { from: "GPIO12", to: "IN2", color: "signal" },
          { from: "GPIO27", to: "IN3", color: "signal2" },
          { from: "GPIO26", to: "IN4", color: "signal2" },
        ],
      },
    ],
    assembly: [
      { title: { en: "1. Build the chassis", ta: "1. சட்டகத்தை கட்டமைக்கவும்" }, text: { en: "Fit the two gear motors and wheels, plus the castor wheel for balance.", ta: "இரண்டு கியர் மோட்டார்கள், சக்கரங்கள் மற்றும் சமநிலைக்கான காஸ்டர் சக்கரத்தைப் பொருத்தவும்." } },
      { title: { en: "2. Mount the ultrasonic sensor", ta: "2. அல்ட்ராசோனிக் சென்சாரைப் பொருத்தவும்" }, text: { en: "Fix the HC-SR04 at the very front, facing straight ahead and level. Its two \"eyes\" must have a clear view — don't let the chassis block them.", ta: "HC-SR04-ஐ முன்பக்கத்தில், நேராக முன்னோக்கி பொருத்தவும். அதன் இரண்டு \"கண்கள்\" தெளிவான பார்வையைக் கொண்டிருக்க வேண்டும்." } },
      { title: { en: "3. Mount board, driver and battery", ta: "3. போர்டு, டிரைவர், பேட்டரி" }, text: { en: "Secure the ESP32 and L298N on the deck, battery near the centre for balance.", ta: "ESP32 மற்றும் L298N-ஐ பொருத்தி, பேட்டரியை மையத்தில் வைக்கவும்." } },
      { title: { en: "4. Wire motors and power", ta: "4. மோட்டார்கள் மற்றும் மின்சாரம்" }, text: { en: "Left motor to OUT1/OUT2, right motor to OUT3/OUT4, battery to the driver's 12V and GND.", ta: "இடது மோட்டார் OUT1/OUT2-க்கு, வலது மோட்டார் OUT3/OUT4-க்கு." } },
      { title: { en: "5. Wire signals and share ground", ta: "5. சிக்னல்கள் மற்றும் பொது கிரவுண்ட்" }, text: { en: "Connect the sensor and driver pins per the diagrams. Tie the ESP32 GND to the L298N GND — this shared ground is essential.", ta: "வரைபடங்களின்படி இணைக்கவும். ESP32 GND-ஐ L298N GND-உடன் இணைக்கவும்." } },
    ],
    libraries: [
      { name: "None", note: { en: "pulseIn() is built in — no library needed for the HC-SR04.", ta: "pulseIn() உள்ளமைந்தது — HC-SR04-க்கு நூலகம் தேவையில்லை." } },
    ],
    code: {
      filename: "obstacle_avoiding_robot.ino",
      content: `/*
  Obstacle Avoiding Robot — InnovateX 3.0
  Measures the distance ahead with an HC-SR04 and turns away
  before hitting anything.
*/

// --- Ultrasonic sensor ---
const int TRIG_PIN = 5;
const int ECHO_PIN = 18;

// --- Motor driver pins (L298N) ---
const int LEFT_FWD   = 14;
const int LEFT_BACK  = 12;
const int RIGHT_FWD  = 27;
const int RIGHT_BACK = 26;

// Turn away when something is closer than this, in centimetres.
const int STOP_DISTANCE = 20;

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(LEFT_FWD, OUTPUT);
  pinMode(LEFT_BACK, OUTPUT);
  pinMode(RIGHT_FWD, OUTPUT);
  pinMode(RIGHT_BACK, OUTPUT);
}

// Sends a pulse and converts the echo time into centimetres.
long readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // pulseIn waits for the echo and returns its length in microseconds.
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  if (duration == 0) return 999;                  // nothing came back

  // Sound travels ~0.034 cm per microsecond, and the pulse makes a
  // round trip, so halve it.
  return duration * 0.034 / 2;
}

void forward() {
  digitalWrite(LEFT_FWD, HIGH);  digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, HIGH); digitalWrite(RIGHT_BACK, LOW);
}

void backward() {
  digitalWrite(LEFT_FWD, LOW);  digitalWrite(LEFT_BACK, HIGH);
  digitalWrite(RIGHT_FWD, LOW); digitalWrite(RIGHT_BACK, HIGH);
}

void pivotRight() {
  digitalWrite(LEFT_FWD, HIGH); digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, LOW); digitalWrite(RIGHT_BACK, HIGH);
}

void stopMotors() {
  digitalWrite(LEFT_FWD, LOW);  digitalWrite(LEFT_BACK, LOW);
  digitalWrite(RIGHT_FWD, LOW); digitalWrite(RIGHT_BACK, LOW);
}

void loop() {
  long distance = readDistanceCm();
  Serial.print(distance);
  Serial.println(" cm");

  if (distance < STOP_DISTANCE) {
    // Something ahead: stop, reverse a little, then turn away.
    stopMotors();
    delay(150);
    backward();
    delay(400);
    pivotRight();
    delay(450);
    stopMotors();
  } else {
    forward();
  }

  delay(60);
}`,
    },
    codeExplanation: [
      { title: { en: "How the distance reading works", ta: "தூர அளவீடு எவ்வாறு செயல்படுகிறது" }, text: { en: "A 10-microsecond pulse on Trig makes the sensor chirp. pulseIn() then measures how long Echo stays HIGH — that's the round-trip flight time of the sound. Multiplying by the speed of sound and halving gives the one-way distance.", ta: "Trig-இல் 10 மைக்ரோவினாடி துடிப்பு சென்சாரை ஒலிக்க வைக்கிறது. pulseIn() எதிரொலியின் நேரத்தை அளக்கிறது." } },
      { title: { en: "The timeout guard", ta: "நேரமுடிவு பாதுகாப்பு" }, text: { en: "If nothing reflects the sound, pulseIn would wait forever and freeze the robot. The 30ms timeout makes it give up and return 0, which the code converts to 999cm — effectively \"the path is clear\".", ta: "எதுவும் ஒலியைப் பிரதிபலிக்கவில்லை என்றால், pulseIn எப்போதும் காத்திருக்கும். 30ms நேரமுடிவு அதைத் தடுக்கிறது." } },
      { title: { en: "Reverse before turning", ta: "திரும்பும் முன் பின்னோக்கி" }, text: { en: "Backing up briefly before pivoting gives the robot room to rotate without scraping the obstacle. Without it, a robot that gets too close can get stuck turning against a wall.", ta: "திரும்புவதற்கு முன் சிறிது பின்னோக்கி செல்வது ரோபோவுக்கு சுழல இடம் தருகிறது." } },
      { title: { en: "Why pivot instead of curve", ta: "வளைவுக்கு பதிலாக ஏன் சுழற்சி" }, text: { en: "Driving one wheel forward while the other goes backward spins the robot almost on the spot — the tightest possible turn, which matters in a corner.", ta: "ஒரு சக்கரம் முன்னோக்கியும் மற்றொன்று பின்னோக்கியும் இயங்குவது ரோபோவை அதே இடத்தில் சுழற்றுகிறது." } },
    ],
    testing: [
      { en: "With the battery off, upload and open the Serial Monitor. Move your hand toward the sensor and watch the centimetre readings fall.", ta: "பேட்டரி இல்லாமல் பதிவேற்றி Serial Monitor-ஐ திறக்கவும். கையை நகர்த்தி அளவீடுகள் குறைவதைப் பாருங்கள்." },
      { en: "Confirm the reading is roughly accurate — hold your hand at about 20cm and check the number is close.", ta: "அளவீடு தோராயமாக சரியானதா என சரிபார்க்கவும் — கையை 20cm தூரத்தில் பிடிக்கவும்." },
      { en: "Lift the robot, connect the battery, and confirm both wheels drive forward with a clear path.", ta: "ரோபோவை தூக்கி, பேட்டரியை இணைத்து, இரு சக்கரங்களும் முன்னோக்கி இயங்குகின்றனவா எனப் பாருங்கள்." },
      { en: "Still holding it, put your hand in front of the sensor — the robot should reverse and pivot.", ta: "தூக்கிப் பிடித்தபடி, சென்சாருக்கு முன் கையை வைக்கவும் — ரோபோ பின்னோக்கி சென்று திரும்ப வேண்டும்." },
      { en: "Set it on the floor in an open area and let it explore.", ta: "திறந்த இடத்தில் தரையில் வைத்து ஆராய விடுங்கள்." },
    ],
    troubleshooting: [
      { problem: { en: "Distance always reads 999 or 0", ta: "தூரம் எப்போதும் 999 அல்லது 0" }, fix: { en: "Trig and Echo are likely swapped, or the sensor isn't getting 5V. Check both, and confirm the sensor faces an open space.", ta: "Trig மற்றும் Echo மாறியிருக்கலாம், அல்லது சென்சாருக்கு 5V கிடைக்கவில்லை." } },
      { problem: { en: "Readings jump around wildly", ta: "அளவீடுகள் மிகவும் மாறுபடுகின்றன" }, fix: { en: "Soft surfaces like curtains absorb sound instead of reflecting it. Test against a wall or a book. Also make sure the sensor is mounted level.", ta: "திரைச்சீலைகள் போன்ற மென்மையான மேற்பரப்புகள் ஒலியை உறிஞ்சுகின்றன. சுவர் அல்லது புத்தகத்தில் சோதிக்கவும்." } },
      { problem: { en: "The robot turns forever", ta: "ரோபோ தொடர்ந்து திரும்புகிறது" }, fix: { en: "It's boxed in, or STOP_DISTANCE is too large for the room. Lower it to about 15cm and give it more open space.", ta: "இது சிக்கியுள்ளது, அல்லது STOP_DISTANCE மிக அதிகம். அதை 15cm ஆகக் குறைக்கவும்." } },
      { problem: { en: "It hits obstacles before reacting", ta: "எதிர்வினையாற்றும் முன் தடைகளில் மோதுகிறது" }, fix: { en: "Raise STOP_DISTANCE, or reduce speed. A fast robot needs more warning distance to stop in time.", ta: "STOP_DISTANCE-ஐ அதிகரிக்கவும், அல்லது வேகத்தைக் குறைக்கவும்." } },
    ],
    mistakes: [
      ...COMMON_MOTOR_MISTAKES,
      {
        en: "Mounting the sensor tilted. If it points slightly down it will read the floor as an obstacle and the robot will spin in circles.",
        ta: "சென்சாரை சாய்வாக பொருத்துவது. சற்று கீழ்நோக்கி இருந்தால் அது தரையை ஒரு தடையாகப் படிக்கும்.",
      },
    ],
    safety: ROBOT_SAFETY,
    expected: {
      en: "The robot drives forward across open floor. Whenever something comes within about 20cm it stops, reverses briefly, pivots away, and continues — exploring a room indefinitely without collisions.",
      ta: "ரோபோ திறந்த தரையில் முன்னோக்கி இயங்கும். ஏதேனும் 20cm-க்குள் வந்தால் நின்று, பின்னோக்கி சென்று, விலகித் திரும்பி, தொடரும்.",
    },
  },

  /* --------------------------------------------- Bluetooth Control */
  {
    slug: "bluetooth-controlled-robot",
    title: { en: "Bluetooth Controlled Robot", ta: "புளூடூத் கட்டுப்பாட்டு ரோபோ" },
    description: {
      en: "Drive the robot from a phone app over Bluetooth — the first build that genuinely feels like a product.",
      ta: "புளூடூத் வழியாக ஃபோன் ஆப்பிலிருந்து ரோபோவை இயக்குங்கள் — உண்மையிலேயே ஒரு தயாரிப்பு போல உணரும் முதல் கட்டமைப்பு.",
    },
    hero: "bluetooth-module",
    components: ["esp32", "bluetooth-module", "dc-motor", "battery-pack"],
    skills: ["Serial communication", "Wireless control", "Command parsing"],
    buildTime: 80,
    category: "robotics",
    overview: {
      en: "Instead of deciding where to go on its own, this robot takes orders. A phone app sends single characters over Bluetooth — F for forward, B for back, L and R to turn, S to stop — and the robot acts on whichever arrives. The ESP32 has Bluetooth built in, so no extra module is strictly required.",
      ta: "இந்த ரோபோ தானாக முடிவெடுப்பதற்குப் பதிலாக கட்டளைகளை ஏற்கிறது. ஃபோன் ஆப் புளூடூத் வழியாக ஒற்றை எழுத்துகளை அனுப்புகிறது.",
    },
    objectives: [
      { en: "Send and receive data over a wireless serial link", ta: "வயர்லெஸ் சீரியல் இணைப்பு வழியாக தரவை அனுப்புதல்" },
      { en: "Parse incoming commands and map them to actions", ta: "வரும் கட்டளைகளைப் பகுத்து செயல்களுடன் இணைத்தல்" },
      { en: "Design a simple, readable command protocol", ta: "எளிய கட்டளை நெறிமுறையை வடிவமைத்தல்" },
      { en: "Add a safety stop for lost connections", ta: "இணைப்பு துண்டிக்கப்பட்டால் பாதுகாப்பு நிறுத்தம் சேர்த்தல்" },
    ],
    equipment: [
      { name: { en: "ESP32", ta: "ESP32" }, quantity: "1", note: { en: "Bluetooth is built in", ta: "புளூடூத் உள்ளமைக்கப்பட்டுள்ளது" } },
      { name: { en: "L298N motor driver", ta: "L298N மோட்டார் டிரைவர்" }, quantity: "1" },
      { name: { en: "DC gear motor with wheel", ta: "சக்கரத்துடன் DC கியர் மோட்டார்" }, quantity: "2" },
      { name: { en: "Robot chassis", ta: "ரோபோ சட்டகம்" }, quantity: "1" },
      { name: { en: "Battery pack", ta: "பேட்டரி பேக்" }, quantity: "1", note: { en: "6V–9V for the motors", ta: "மோட்டார்களுக்கு 6V–9V" } },
      { name: { en: "Android phone", ta: "ஆண்ட்ராய்டு ஃபோன்" }, quantity: "1", note: { en: "With a free \"Bluetooth serial terminal\" app", ta: "இலவச \"Bluetooth serial terminal\" ஆப்புடன்" } },
    ],
    wiring: [
      {
        controller: "ESP32",
        controllerPins: ["GPIO14", "GPIO12", "GPIO27", "GPIO26"],
        device: "L298N Driver",
        devicePins: ["IN1", "IN2", "IN3", "IN4"],
        links: [
          { from: "GPIO14", to: "IN1", color: "signal" },
          { from: "GPIO12", to: "IN2", color: "signal" },
          { from: "GPIO27", to: "IN3", color: "signal2" },
          { from: "GPIO26", to: "IN4", color: "signal2" },
        ],
      },
    ],
    assembly: [
      { title: { en: "1. Build the chassis", ta: "1. சட்டகத்தை கட்டமைக்கவும்" }, text: { en: "Motors, wheels and castor as in the other robots. No forward-facing sensor is needed here.", ta: "மற்ற ரோபோக்களைப் போல மோட்டார்கள், சக்கரங்கள், காஸ்டர்." } },
      { title: { en: "2. Mount board and driver", ta: "2. போர்டு மற்றும் டிரைவர்" }, text: { en: "Fix the ESP32 and L298N to the deck. Keep the ESP32's antenna end (the silver zig-zag) clear of the battery for better range.", ta: "ESP32 மற்றும் L298N-ஐ பொருத்தவும். சிறந்த வரம்பிற்கு ESP32-இன் ஆண்டெனா முனையை பேட்டரியிலிருந்து விலக்கி வைக்கவும்." } },
      { title: { en: "3. Wire motors and power", ta: "3. மோட்டார்கள் மற்றும் மின்சாரம்" }, text: { en: "Left motor to OUT1/OUT2, right to OUT3/OUT4. Battery to the driver's 12V and GND.", ta: "இடது மோட்டார் OUT1/OUT2, வலது OUT3/OUT4. பேட்டரி டிரைவரின் 12V மற்றும் GND-க்கு." } },
      { title: { en: "4. Wire signals and share ground", ta: "4. சிக்னல்கள் மற்றும் பொது கிரவுண்ட்" }, text: { en: "Four control pins as in the diagram, plus ESP32 GND to L298N GND.", ta: "வரைபடத்தின்படி நான்கு கட்டுப்பாட்டு பின்கள், மேலும் ESP32 GND-ஐ L298N GND-உடன்." } },
      { title: { en: "5. Pair your phone", ta: "5. உங்கள் ஃபோனை இணைக்கவும்" }, text: { en: "After uploading, look for \"InnovateX-Robot\" in your phone's Bluetooth settings and pair. Then open a Bluetooth serial terminal app and connect to it.", ta: "பதிவேற்றிய பிறகு, ஃபோனின் புளூடூத் அமைப்புகளில் \"InnovateX-Robot\"-ஐ தேடி இணைக்கவும்." } },
    ],
    libraries: [
      { name: "BluetoothSerial", note: { en: "Included with the ESP32 board package — no separate install. Add it via Tools → Board → Boards Manager → esp32.", ta: "ESP32 போர்டு தொகுப்புடன் சேர்க்கப்பட்டுள்ளது — தனி நிறுவல் தேவையில்லை." } },
    ],
    code: {
      filename: "bluetooth_controlled_robot.ino",
      content: `/*
  Bluetooth Controlled Robot — InnovateX 3.0
  Pair a phone, then send single letters to drive:
    F forward   B back   L left   R right   S stop
*/

#include "BluetoothSerial.h"

BluetoothSerial BT;

// --- Motor driver pins (L298N) ---
const int LEFT_FWD   = 14;
const int LEFT_BACK  = 12;
const int RIGHT_FWD  = 27;
const int RIGHT_BACK = 26;

// If no command arrives for this long, stop for safety.
const unsigned long COMMAND_TIMEOUT = 1000;
unsigned long lastCommandAt = 0;

void setup() {
  Serial.begin(115200);
  BT.begin("InnovateX-Robot");   // the name your phone will see
  Serial.println("Bluetooth ready — pair with InnovateX-Robot");

  pinMode(LEFT_FWD, OUTPUT);
  pinMode(LEFT_BACK, OUTPUT);
  pinMode(RIGHT_FWD, OUTPUT);
  pinMode(RIGHT_BACK, OUTPUT);
}

void drive(bool lf, bool lb, bool rf, bool rb) {
  digitalWrite(LEFT_FWD, lf);   digitalWrite(LEFT_BACK, lb);
  digitalWrite(RIGHT_FWD, rf);  digitalWrite(RIGHT_BACK, rb);
}

void forward()  { drive(HIGH, LOW,  HIGH, LOW ); }
void backward() { drive(LOW,  HIGH, LOW,  HIGH); }
void left()     { drive(LOW,  HIGH, HIGH, LOW ); }
void right()    { drive(HIGH, LOW,  LOW,  HIGH); }
void stopAll()  { drive(LOW,  LOW,  LOW,  LOW ); }

void loop() {
  if (BT.available()) {
    char command = BT.read();
    lastCommandAt = millis();

    switch (command) {
      case 'F': case 'f': forward();  break;
      case 'B': case 'b': backward(); break;
      case 'L': case 'l': left();     break;
      case 'R': case 'r': right();    break;
      case 'S': case 's': stopAll();  break;
      default: break;   // ignore anything we don't recognise
    }

    Serial.print("Got: ");
    Serial.println(command);
  }

  // Safety: if the phone disconnects or moves out of range mid-drive,
  // don't keep driving into a wall.
  if (millis() - lastCommandAt > COMMAND_TIMEOUT) {
    stopAll();
  }
}`,
    },
    codeExplanation: [
      { title: { en: "One letter per command", ta: "ஒரு கட்டளைக்கு ஒரு எழுத்து" }, text: { en: "Single characters are the simplest possible protocol — easy to send from any terminal app and easy to read in a switch statement. Both upper and lower case are accepted so it doesn't matter how the app sends them.", ta: "ஒற்றை எழுத்துகள் மிக எளிய நெறிமுறை — எந்த டெர்மினல் ஆப்பிலிருந்தும் அனுப்ப எளிதானது." } },
      { title: { en: "The timeout is a safety feature", ta: "நேரமுடிவு ஒரு பாதுகாப்பு அம்சம்" }, text: { en: "Without it, a robot told to go forward keeps going forever if the phone disconnects. Tracking when the last command arrived and stopping after a second of silence prevents a runaway.", ta: "இது இல்லாமல், முன்னோக்கிச் செல்லச் சொன்ன ரோபோ ஃபோன் துண்டிக்கப்பட்டால் என்றென்றும் செல்லும்." } },
      { title: { en: "Why drive() takes four booleans", ta: "drive() ஏன் நான்கு பூலியன்களை எடுக்கிறது" }, text: { en: "Every movement is just a combination of four pin states. Passing them as arguments means each direction is a single readable line instead of four repeated digitalWrite calls.", ta: "ஒவ்வொரு அசைவும் நான்கு பின் நிலைகளின் கலவைதான்." } },
      { title: { en: "millis() rather than delay()", ta: "delay()-க்கு பதிலாக millis()" }, text: { en: "delay() would freeze the robot and make it miss incoming commands. millis() lets the loop keep checking Bluetooth while still tracking how much time has passed.", ta: "delay() ரோபோவை முடக்கி வரும் கட்டளைகளை தவறவிடும். millis() சுழற்சி தொடர்ந்து சரிபார்க்க அனுமதிக்கிறது." } },
    ],
    testing: [
      { en: "Upload the code and open the Serial Monitor at 115200. You should see \"Bluetooth ready\".", ta: "குறியீட்டைப் பதிவேற்றி 115200-இல் Serial Monitor-ஐ திறக்கவும்." },
      { en: "On your phone, pair with \"InnovateX-Robot\", then connect using a Bluetooth serial terminal app.", ta: "உங்கள் ஃபோனில் \"InnovateX-Robot\"-உடன் இணைக்கவும்." },
      { en: "Send the letter F. The Serial Monitor should print \"Got: F\" — this confirms the link before any motors move.", ta: "F எழுத்தை அனுப்பவும். Serial Monitor \"Got: F\" என அச்சிட வேண்டும்." },
      { en: "Lift the robot, connect the battery, and try each of F, B, L, R and S with the wheels off the ground.", ta: "ரோபோவை தூக்கி, பேட்டரியை இணைத்து, F, B, L, R, S ஒவ்வொன்றையும் முயற்சிக்கவும்." },
      { en: "Put it on the floor and drive. Walk away mid-command to confirm it stops when out of range.", ta: "தரையில் வைத்து இயக்கவும். வரம்பிற்கு வெளியே சென்று அது நிற்கிறதா எனச் சரிபார்க்கவும்." },
    ],
    troubleshooting: [
      { problem: { en: "The robot doesn't appear in Bluetooth settings", ta: "புளூடூத் அமைப்புகளில் ரோபோ தெரியவில்லை" }, fix: { en: "Confirm the sketch uploaded and the Serial Monitor printed \"Bluetooth ready\". Also make sure you selected an ESP32 board in Tools → Board — an Arduino Uno has no Bluetooth.", ta: "ஸ்கெட்ச் பதிவேற்றப்பட்டதா எனச் சரிபார்க்கவும். Tools → Board-இல் ESP32 தேர்ந்தெடுக்கப்பட்டுள்ளதா எனப் பாருங்கள்." } },
      { problem: { en: "Paired, but commands do nothing", ta: "இணைக்கப்பட்டது, ஆனால் கட்டளைகள் வேலை செய்யவில்லை" }, fix: { en: "Pairing alone isn't enough — you must also connect from inside the terminal app. Check the Serial Monitor for \"Got:\" lines to see whether characters are arriving.", ta: "இணைப்பது மட்டும் போதாது — டெர்மினல் ஆப்பிற்குள்ளிருந்தும் இணைக்க வேண்டும்." } },
      { problem: { en: "It moves briefly then stops", ta: "இது சிறிது நகர்ந்து நிற்கிறது" }, fix: { en: "That's the safety timeout doing its job — your app is sending one character per tap. Either hold/repeat the command, or raise COMMAND_TIMEOUT.", ta: "அது பாதுகாப்பு நேரமுடிவு. கட்டளையை மீண்டும் அனுப்பவும், அல்லது COMMAND_TIMEOUT-ஐ அதிகரிக்கவும்." } },
      { problem: { en: "Range is poor", ta: "வரம்பு மோசமாக உள்ளது" }, fix: { en: "Metal and batteries block the antenna. Move the ESP32 so its antenna end sticks out past the chassis and battery.", ta: "உலோகம் மற்றும் பேட்டரிகள் ஆண்டெனாவைத் தடுக்கின்றன. ESP32-ஐ நகர்த்தவும்." } },
    ],
    mistakes: [
      ...COMMON_MOTOR_MISTAKES,
      {
        en: "Expecting an Arduino Uno to work. The Uno has no Bluetooth — this project needs an ESP32, or an Uno plus a separate HC-05 module.",
        ta: "Arduino Uno வேலை செய்யும் என எதிர்பார்ப்பது. Uno-வில் புளூடூத் இல்லை — இந்த திட்டத்திற்கு ESP32 தேவை.",
      },
    ],
    safety: ROBOT_SAFETY,
    expected: {
      en: "After pairing, each letter you send moves the robot immediately — forward, back, left, right, stop. Walk out of range mid-drive and it halts on its own within a second.",
      ta: "இணைத்த பிறகு, நீங்கள் அனுப்பும் ஒவ்வொரு எழுத்தும் ரோபோவை உடனடியாக நகர்த்தும். வரம்பிற்கு வெளியே சென்றால் ஒரு வினாடிக்குள் தானாக நிற்கும்.",
    },
  },

  /* ------------------------------------------- Integrated Smart Robot */
  {
    slug: "integrated-smart-robot",
    title: { en: "Integrated Smart Robot", ta: "ஒருங்கிணைந்த ஸ்மார்ட் ரோபோ" },
    description: {
      en: "One robot, three modes. Switch between line following, obstacle avoidance and Bluetooth control by flipping a single flag — no rewiring.",
      ta: "ஒரே ரோபோ, மூன்று முறைகள். ஒரு கொடியை மாற்றுவதன் மூலம் கோடு பின்தொடர்தல், தடை தவிர்த்தல், புளூடூத் கட்டுப்பாட்டிற்கு இடையே மாறுங்கள்.",
    },
    hero: "robot-chassis",
    components: ["esp32", "ultrasonic-sensor", "ir-sensor", "dc-motor", "battery-pack"],
    skills: ["Modular code", "State machines", "System integration"],
    buildTime: 180,
    category: "robotics",
    overview: {
      en: "This is the capstone: one chassis wired for everything, running code that can switch behaviour on demand. Build the three earlier robots first so each part is familiar, then combine them here. The wiring is the union of all three — nothing conflicts, because each feature uses its own pins — and the code keeps every mode in its own function, so turning one off can never break another.",
      ta: "இது இறுதி திட்டம்: அனைத்திற்கும் இணைக்கப்பட்ட ஒரே சட்டகம், தேவைக்கேற்ப நடத்தையை மாற்றக்கூடிய குறியீடு. முதலில் மூன்று ரோபோக்களையும் கட்டமைக்கவும்.",
    },
    objectives: [
      { en: "Combine three separate systems onto one set of pins without conflict", ta: "மூன்று அமைப்புகளை ஒரே பின் தொகுப்பில் இணைத்தல்" },
      { en: "Structure code into modes that can be enabled independently", ta: "சுயாதீனமாக இயக்கக்கூடிய முறைகளாக குறியீட்டை கட்டமைத்தல்" },
      { en: "Use a state machine to decide what the robot does right now", ta: "ரோபோ இப்போது என்ன செய்கிறது என்பதை நிர்ணயிக்க நிலை இயந்திரம்" },
      { en: "Debug a system with several inputs competing for attention", ta: "பல உள்ளீடுகள் கொண்ட அமைப்பை பிழைதிருத்துதல்" },
    ],
    equipment: [
      { name: { en: "ESP32", ta: "ESP32" }, quantity: "1" },
      { name: { en: "HC-SR04 ultrasonic sensor", ta: "HC-SR04 அல்ட்ராசோனிக் சென்சார்" }, quantity: "1" },
      { name: { en: "IR line sensor module", ta: "IR லைன் சென்சார் மாடியூல்" }, quantity: "2" },
      { name: { en: "L298N motor driver", ta: "L298N மோட்டார் டிரைவர்" }, quantity: "1" },
      { name: { en: "DC gear motor with wheel", ta: "சக்கரத்துடன் DC கியர் மோட்டார்" }, quantity: "2" },
      { name: { en: "Robot chassis", ta: "ரோபோ சட்டகம்" }, quantity: "1" },
      { name: { en: "Battery pack", ta: "பேட்டரி பேக்" }, quantity: "1", note: { en: "6V–9V, fully charged", ta: "6V–9V, முழுமையாக சார்ஜ் செய்யப்பட்டது" } },
      { name: { en: "Jumper wires", ta: "ஜம்பர் வயர்கள்" }, quantity: "~20" },
    ],
    wiring: [
      {
        controller: "ESP32",
        controllerPins: ["5V", "GND", "GPIO5", "GPIO18"],
        device: "HC-SR04",
        devicePins: ["VCC", "GND", "Trig", "Echo"],
        links: [
          { from: "5V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "GPIO5", to: "Trig", color: "signal" },
          { from: "GPIO18", to: "Echo", color: "signal2" },
        ],
      },
      {
        controller: "ESP32",
        controllerPins: ["5V", "GND", "GPIO34", "GPIO35"],
        device: "IR Sensors",
        devicePins: ["VCC", "GND", "Left OUT", "Right OUT"],
        links: [
          { from: "5V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "GPIO34", to: "Left OUT", color: "signal" },
          { from: "GPIO35", to: "Right OUT", color: "signal2" },
        ],
      },
      {
        controller: "ESP32",
        controllerPins: ["GPIO14", "GPIO12", "GPIO27", "GPIO26"],
        device: "L298N Driver",
        devicePins: ["IN1", "IN2", "IN3", "IN4"],
        links: [
          { from: "GPIO14", to: "IN1", color: "signal" },
          { from: "GPIO12", to: "IN2", color: "signal" },
          { from: "GPIO27", to: "IN3", color: "signal2" },
          { from: "GPIO26", to: "IN4", color: "signal2" },
        ],
      },
    ],
    assembly: [
      { title: { en: "1. Start from a working chassis", ta: "1. செயல்படும் சட்டகத்திலிருந்து தொடங்கவும்" }, text: { en: "Build the drive base exactly as in the earlier robots: two gear motors, wheels, castor, L298N and battery.", ta: "முந்தைய ரோபோக்களைப் போலவே இயக்க தளத்தை கட்டமைக்கவும்." } },
      { title: { en: "2. Add the ultrasonic sensor", ta: "2. அல்ட்ராசோனிக் சென்சாரைச் சேர்க்கவும்" }, text: { en: "Mount the HC-SR04 at the front, facing forward and level, with a clear view.", ta: "HC-SR04-ஐ முன்பக்கம், நேராக முன்னோக்கி பொருத்தவும்." } },
      { title: { en: "3. Add the line sensors", ta: "3. லைன் சென்சார்களைச் சேர்க்கவும்" }, text: { en: "Fit the two IR sensors underneath at the front, facing down, about 1cm above the floor. They sit below the ultrasonic sensor and don't interfere with it.", ta: "இரண்டு IR சென்சார்களை கீழே முன்பக்கம், கீழ்நோக்கி, தரையிலிருந்து 1cm உயரத்தில் பொருத்தவும்." } },
      { title: { en: "4. Wire everything to its own pins", ta: "4. அனைத்தையும் தனித்தனி பின்களுக்கு இணைக்கவும்" }, text: { en: "Follow the three diagrams above. No two features share a signal pin, which is exactly why any of them can be switched off without affecting the others.", ta: "மேலே உள்ள மூன்று வரைபடங்களைப் பின்பற்றவும். எந்த இரண்டு அம்சங்களும் ஒரே சிக்னல் பின்னைப் பகிரவில்லை." } },
      { title: { en: "5. Check power budget", ta: "5. மின்சக்தி பட்ஜெட்டை சரிபார்க்கவும்" }, text: { en: "Three sensors plus two motors draw real current. Use a fresh battery, and make sure motors are powered from the L298N's battery input rather than the ESP32.", ta: "மூன்று சென்சார்கள் மற்றும் இரண்டு மோட்டார்கள் அதிக மின்னோட்டத்தை எடுக்கும். புதிய பேட்டரியைப் பயன்படுத்தவும்." } },
      { title: { en: "6. Choose a mode and upload", ta: "6. ஒரு முறையைத் தேர்ந்தெடுத்து பதிவேற்றவும்" }, text: { en: "At the top of the sketch, set ACTIVE_MODE to LINE_FOLLOW, OBSTACLE_AVOID or BLUETOOTH_DRIVE, then upload. Change it and re-upload any time — the wiring never changes.", ta: "ஸ்கெட்சின் மேலே ACTIVE_MODE-ஐ அமைத்து பதிவேற்றவும். எப்போது வேண்டுமானாலும் மாற்றலாம் — வயரிங் மாறாது." } },
    ],
    libraries: [
      { name: "BluetoothSerial", note: { en: "Included with the ESP32 board package. Only used when Bluetooth mode is enabled.", ta: "ESP32 போர்டு தொகுப்புடன் சேர்க்கப்பட்டுள்ளது. புளூடூத் முறையில் மட்டும் பயன்படுகிறது." } },
    ],
    code: {
      filename: "integrated_smart_robot.ino",
      content: `/*
  Integrated Smart Robot — InnovateX 3.0

  One chassis, three behaviours. Change ACTIVE_MODE below and
  re-upload — the wiring stays exactly the same.

  Build and understand the three individual robots first; this
  sketch is those three, kept in separate functions.
*/

#include "BluetoothSerial.h"

// ---------------------------------------------------------------
//  1. CHOOSE THE MODE
// ---------------------------------------------------------------
#define LINE_FOLLOW      0
#define OBSTACLE_AVOID   1
#define BLUETOOTH_DRIVE  2

// <<< Change this one line to switch behaviour >>>
const int ACTIVE_MODE = OBSTACLE_AVOID;

// ---------------------------------------------------------------
//  2. PINS — every feature has its own, so nothing conflicts
// ---------------------------------------------------------------
const int TRIG_PIN     = 5;
const int ECHO_PIN     = 18;
const int LEFT_SENSOR  = 34;
const int RIGHT_SENSOR = 35;

const int LEFT_FWD   = 14;
const int LEFT_BACK  = 12;
const int RIGHT_FWD  = 27;
const int RIGHT_BACK = 26;

// ---------------------------------------------------------------
//  3. TUNING
// ---------------------------------------------------------------
const int STOP_DISTANCE = 20;     // cm
const bool BLACK_IS_LOW = true;   // flip if your IR module is inverted
const unsigned long COMMAND_TIMEOUT = 1000;

BluetoothSerial BT;
unsigned long lastCommandAt = 0;

// ---------------------------------------------------------------
//  4. MOVEMENT — shared by every mode
// ---------------------------------------------------------------
void drive(bool lf, bool lb, bool rf, bool rb) {
  digitalWrite(LEFT_FWD, lf);   digitalWrite(LEFT_BACK, lb);
  digitalWrite(RIGHT_FWD, rf);  digitalWrite(RIGHT_BACK, rb);
}

void forward()   { drive(HIGH, LOW,  HIGH, LOW ); }
void backward()  { drive(LOW,  HIGH, LOW,  HIGH); }
void turnLeft()  { drive(LOW,  LOW,  HIGH, LOW ); }
void turnRight() { drive(HIGH, LOW,  LOW,  LOW ); }
void pivotRight(){ drive(HIGH, LOW,  LOW,  HIGH); }
void stopMotors(){ drive(LOW,  LOW,  LOW,  LOW ); }

// ---------------------------------------------------------------
//  5. SENSORS
// ---------------------------------------------------------------
long readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return 999;      // nothing echoed back
  return duration * 0.034 / 2;
}

bool onLine(int pin) {
  int value = digitalRead(pin);
  return BLACK_IS_LOW ? (value == LOW) : (value == HIGH);
}

// ---------------------------------------------------------------
//  6. ONE FUNCTION PER MODE
// ---------------------------------------------------------------
void runLineFollow() {
  bool left  = onLine(LEFT_SENSOR);
  bool right = onLine(RIGHT_SENSOR);

  if (!left && !right)      forward();
  else if (left && !right)  turnLeft();
  else if (!left && right)  turnRight();
  else                      stopMotors();   // junction or end of line

  delay(10);
}

void runObstacleAvoid() {
  long distance = readDistanceCm();

  if (distance < STOP_DISTANCE) {
    stopMotors();
    delay(150);
    backward();
    delay(400);
    pivotRight();
    delay(450);
    stopMotors();
  } else {
    forward();
  }

  delay(60);
}

void runBluetoothDrive() {
  if (BT.available()) {
    char command = BT.read();
    lastCommandAt = millis();

    switch (command) {
      case 'F': case 'f': forward();   break;
      case 'B': case 'b': backward();  break;
      case 'L': case 'l': turnLeft();  break;
      case 'R': case 'r': turnRight(); break;
      case 'S': case 's': stopMotors();break;
      default: break;
    }
  }

  // Stop if the phone goes quiet, so the robot never runs away.
  if (millis() - lastCommandAt > COMMAND_TIMEOUT) {
    stopMotors();
  }
}

// ---------------------------------------------------------------
//  7. SETUP AND LOOP
// ---------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);

  pinMode(LEFT_FWD, OUTPUT);
  pinMode(LEFT_BACK, OUTPUT);
  pinMode(RIGHT_FWD, OUTPUT);
  pinMode(RIGHT_BACK, OUTPUT);

  // Only start Bluetooth if this build actually needs it.
  if (ACTIVE_MODE == BLUETOOTH_DRIVE) {
    BT.begin("InnovateX-Robot");
    Serial.println("Bluetooth ready — pair with InnovateX-Robot");
  }

  Serial.print("Active mode: ");
  Serial.println(ACTIVE_MODE);
}

void loop() {
  switch (ACTIVE_MODE) {
    case LINE_FOLLOW:     runLineFollow();     break;
    case OBSTACLE_AVOID:  runObstacleAvoid();  break;
    case BLUETOOTH_DRIVE: runBluetoothDrive(); break;
  }
}`,
    },
    codeExplanation: [
      { title: { en: "Why one flag controls everything", ta: "ஒரு கொடி ஏன் அனைத்தையும் கட்டுப்படுத்துகிறது" }, text: { en: "ACTIVE_MODE is read in exactly two places: setup(), to decide whether to start Bluetooth, and loop(), to pick which behaviour runs. Everything else is shared. That's what makes switching modes a one-line change rather than a rewrite.", ta: "ACTIVE_MODE இரண்டு இடங்களில் மட்டுமே படிக்கப்படுகிறது. மற்ற அனைத்தும் பகிரப்படுகிறது." } },
      { title: { en: "Movement is written once", ta: "இயக்கம் ஒரு முறை மட்டுமே எழுதப்படுகிறது" }, text: { en: "All three modes call the same forward(), turnLeft() and stopMotors(). If a wheel is wired backwards you fix it in one place and every mode is corrected at once.", ta: "மூன்று முறைகளும் ஒரே forward(), turnLeft(), stopMotors()-ஐ அழைக்கின்றன." } },
      { title: { en: "Each mode is a self-contained function", ta: "ஒவ்வொரு முறையும் தன்னிறைவான செயல்பாடு" }, text: { en: "runLineFollow(), runObstacleAvoid() and runBluetoothDrive() never call each other and never share state. You can delete one entirely and the other two keep working — that's the whole point of the structure.", ta: "இந்த மூன்று செயல்பாடுகளும் ஒன்றையொன்று அழைப்பதில்லை. ஒன்றை நீக்கினாலும் மற்ற இரண்டும் வேலை செய்யும்." } },
      { title: { en: "Bluetooth starts only when needed", ta: "தேவைப்படும்போது மட்டும் புளூடூத்" }, text: { en: "Starting the Bluetooth radio uses power and memory. The check in setup() means a line-following build doesn't pay that cost at all.", ta: "புளூடூத் ரேடியோவைத் தொடங்குவது மின்சக்தியையும் நினைவகத்தையும் பயன்படுத்துகிறது." } },
      { title: { en: "Extending it further", ta: "மேலும் விரிவாக்குதல்" }, text: { en: "To add a fourth behaviour, define a new mode constant, write one run…() function, and add a case to the switch. Nothing existing needs to change.", ta: "நான்காவது நடத்தையைச் சேர்க்க, புதிய மாறிலியை வரையறுத்து, ஒரு செயல்பாட்டை எழுதி, switch-இல் ஒரு case சேர்க்கவும்." } },
    ],
    testing: [
      { en: "Test each mode on its own, in the order you built them — line following first, then obstacle avoidance, then Bluetooth.", ta: "நீங்கள் கட்டமைத்த வரிசையில் ஒவ்வொரு முறையையும் தனித்தனியாக சோதிக்கவும்." },
      { en: "For each mode: upload, open the Serial Monitor, and confirm it prints the mode number you expect.", ta: "ஒவ்வொரு முறைக்கும்: பதிவேற்றி, Serial Monitor-ஐ திறந்து, எதிர்பார்த்த முறை எண்ணை அச்சிடுகிறதா எனச் சரிபார்க்கவும்." },
      { en: "Always test with the robot lifted off the ground first, then on the floor.", ta: "எப்போதும் முதலில் ரோபோவை தூக்கிப் பிடித்து சோதித்து, பின்னர் தரையில் சோதிக்கவும்." },
      { en: "If a mode misbehaves, re-upload that feature's standalone sketch. If it works alone but not here, the problem is wiring, not code.", ta: "ஒரு முறை சரியாக வேலை செய்யவில்லை என்றால், அந்த அம்சத்தின் தனி ஸ்கெட்சை மீண்டும் பதிவேற்றவும்." },
    ],
    troubleshooting: [
      { problem: { en: "One mode works, another doesn't", ta: "ஒரு முறை வேலை செய்கிறது, மற்றொன்று இல்லை" }, fix: { en: "The wiring for that feature is wrong — the code is shared and proven by the mode that works. Recheck that feature's diagram, especially its ground.", ta: "அந்த அம்சத்தின் வயரிங் தவறு. அந்த அம்சத்தின் வரைபடத்தை மீண்டும் சரிபார்க்கவும்." } },
      { problem: { en: "The robot resets or behaves randomly", ta: "ரோபோ மீளமைக்கிறது அல்லது தற்செயலாக நடந்துகொள்கிறது" }, fix: { en: "Almost always power. Three sensors and two motors on one weak battery causes brownouts. Fit a fresh battery and confirm motors run from the L298N input, not the ESP32.", ta: "கிட்டத்தட்ட எப்போதும் மின்சக்தி பிரச்சினை. புதிய பேட்டரியைப் பொருத்தவும்." } },
      { problem: { en: "Line sensors read nothing on GPIO34/35", ta: "GPIO34/35-இல் லைன் சென்சார்கள் எதையும் படிக்கவில்லை" }, fix: { en: "Those ESP32 pins are input-only and have no internal pull-up. That's fine for an IR module with its own output stage, but confirm the module is powered from 5V and shares ground.", ta: "அந்த ESP32 பின்கள் உள்ளீடு-மட்டும். மாடியூல் 5V-இல் இயங்குகிறதா எனச் சரிபார்க்கவும்." } },
      { problem: { en: "Bluetooth mode won't pair", ta: "புளூடூத் முறை இணையவில்லை" }, fix: { en: "Check ACTIVE_MODE is actually set to BLUETOOTH_DRIVE — the radio only starts in that mode, by design.", ta: "ACTIVE_MODE உண்மையில் BLUETOOTH_DRIVE ஆக அமைக்கப்பட்டுள்ளதா எனச் சரிபார்க்கவும்." } },
    ],
    mistakes: [
      ...COMMON_MOTOR_MISTAKES,
      {
        en: "Trying to build this first. Every part of this sketch comes from the three earlier robots — building it cold means debugging three unfamiliar systems at once.",
        ta: "இதை முதலில் கட்டமைக்க முயற்சிப்பது. இந்த ஸ்கெட்சின் ஒவ்வொரு பகுதியும் முந்தைய மூன்று ரோபோக்களிலிருந்து வருகிறது.",
      },
      {
        en: "Powering everything from the ESP32's 5V pin. It cannot supply motor current — motors must come from the L298N's own battery input.",
        ta: "அனைத்தையும் ESP32-இன் 5V பின்னிலிருந்து இயக்குவது. மோட்டார்கள் L298N-இன் பேட்டரி உள்ளீட்டிலிருந்து வர வேண்டும்.",
      },
    ],
    safety: ROBOT_SAFETY,
    expected: {
      en: "The same physical robot behaves as three different machines depending on one line of code: following a taped line, exploring a room while dodging obstacles, or driving under your phone's control — with no rewiring between them.",
      ta: "ஒரே ரோபோ ஒரு வரி குறியீட்டைப் பொறுத்து மூன்று வெவ்வேறு இயந்திரங்களாக செயல்படும் — வயரிங் மாற்றம் இல்லாமல்.",
    },
  },

  /* ------------------------------------------------ Sensor projects */
  {
    slug: "weather-station",
    title: { en: "IoT Weather Station", ta: "IoT வானிலை நிலையம்" },
    description: {
      en: "Read temperature and humidity, push the readings to the cloud, and watch them plot themselves live.",
      ta: "வெப்பநிலை மற்றும் ஈரப்பதத்தை படித்து, கிளவுட்டிற்கு அனுப்பி, நேரடியாக வரைபடமாக பாருங்கள்.",
    },
    hero: "temperature-sensor",
    components: ["esp32", "temperature-sensor", "breadboard"],
    skills: ["Wi-Fi", "APIs", "Data logging"],
    buildTime: 60,
    category: "iot",
    overview: {
      en: "A weather station is the simplest possible introduction to IoT: read a sensor, then send that number somewhere else in the world. The DHT11 handles the reading; the ESP32's built-in Wi-Fi handles the sending.",
      ta: "வானிலை நிலையம் IoT-க்கான எளிய அறிமுகம்: ஒரு சென்சாரைப் படித்து, அந்த எண்ணை உலகின் வேறொரு இடத்திற்கு அனுப்புதல்.",
    },
    equipment: [
      { name: { en: "ESP32", ta: "ESP32" }, quantity: "1" },
      { name: { en: "DHT11 sensor", ta: "DHT11 சென்சார்" }, quantity: "1" },
      { name: { en: "Breadboard", ta: "பிரெட்போர்டு" }, quantity: "1" },
      { name: { en: "Jumper wires", ta: "ஜம்பர் வயர்கள்" }, quantity: "3" },
    ],
    wiring: [
      {
        controller: "ESP32",
        controllerPins: ["3.3V", "GND", "GPIO4"],
        device: "DHT11",
        devicePins: ["VCC", "GND", "DATA"],
        links: [
          { from: "3.3V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "GPIO4", to: "DATA", color: "signal" },
        ],
      },
    ],
    libraries: [
      { name: "DHT sensor library", note: { en: "By Adafruit. Install via Sketch → Include Library → Manage Libraries.", ta: "Adafruit மூலம். Sketch → Include Library → Manage Libraries வழியாக நிறுவவும்." } },
    ],
    code: {
      filename: "weather_station.ino",
      content: `/*
  IoT Weather Station — InnovateX 3.0
  Reads temperature and humidity every few seconds.
*/

#include <DHT.h>

#define DHT_PIN  4
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  float temperature = dht.readTemperature();  // Celsius
  float humidity    = dht.readHumidity();     // percent

  // The DHT11 occasionally returns nothing; skip those reads.
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Sensor read failed, retrying...");
    delay(2000);
    return;
  }

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" C   Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  delay(2000);   // the DHT11 needs ~2s between readings
}`,
    },
    testing: [
      { en: "Upload and open the Serial Monitor at 115200 — readings should appear every two seconds.", ta: "பதிவேற்றி Serial Monitor-ஐ 115200-இல் திறக்கவும்." },
      { en: "Breathe gently on the sensor and watch the humidity climb, then settle back.", ta: "சென்சார் மீது மெதுவாக மூச்சுவிட்டு ஈரப்பதம் உயர்வதைப் பாருங்கள்." },
    ],
    troubleshooting: [
      { problem: { en: "Every read fails", ta: "ஒவ்வொரு அளவீடும் தோல்வியடைகிறது" }, fix: { en: "Check DATA is on GPIO4 and the sensor has power. DHT11 modules are also sensitive to loose breadboard connections.", ta: "DATA GPIO4-இல் உள்ளதா, சென்சாருக்கு மின்சாரம் உள்ளதா எனச் சரிபார்க்கவும்." } },
      { problem: { en: "Readings never change", ta: "அளவீடுகள் மாறவே இல்லை" }, fix: { en: "The DHT11 updates slowly by design. Wait several seconds after breathing on it before expecting movement.", ta: "DHT11 மெதுவாக புதுப்பிக்கிறது. சில வினாடிகள் காத்திருக்கவும்." } },
    ],
    expected: {
      en: "The Serial Monitor prints a fresh temperature and humidity reading every two seconds, responding within a few seconds when you breathe on the sensor.",
      ta: "Serial Monitor ஒவ்வொரு இரண்டு வினாடிக்கும் புதிய வெப்பநிலை மற்றும் ஈரப்பத அளவீட்டை அச்சிடும்.",
    },
  },

  {
    slug: "fire-alarm",
    title: { en: "Fire & Gas Alarm", ta: "தீ & வாயு எச்சரிக்கை" },
    description: {
      en: "Detect smoke or gas and trigger a buzzer and warning light — a genuinely useful safety build.",
      ta: "புகை அல்லது வாயுவை கண்டறிந்து பஸரையும் எச்சரிக்கை விளக்கையும் இயக்குகிறது.",
    },
    hero: "gas-sensor",
    components: ["esp32", "gas-sensor", "buzzer", "led"],
    skills: ["Threshold logic", "Alerts", "Safety design"],
    buildTime: 50,
    category: "sensors",
    overview: {
      en: "This is the same read-compare-react pattern as every other sensor project, applied to something that matters. An MQ gas sensor's resistance changes as it absorbs gas; when the reading crosses a threshold you set, the buzzer and LED fire.",
      ta: "இது மற்ற சென்சார் திட்டங்களைப் போன்ற படி-ஒப்பிடு-எதிர்வினை வடிவம், முக்கியமான ஒன்றில் பயன்படுத்தப்படுகிறது.",
    },
    equipment: [
      { name: { en: "ESP32", ta: "ESP32" }, quantity: "1" },
      { name: { en: "MQ-2 gas sensor", ta: "MQ-2 வாயு சென்சார்" }, quantity: "1" },
      { name: { en: "Buzzer", ta: "பஸர்" }, quantity: "1" },
      { name: { en: "LED + 220Ω resistor", ta: "LED + 220Ω எதிர்ப்பான்" }, quantity: "1" },
      { name: { en: "Breadboard and jumper wires", ta: "பிரெட்போர்டு மற்றும் ஜம்பர் வயர்கள்" }, quantity: "1 set" },
    ],
    wiring: [
      {
        controller: "ESP32",
        controllerPins: ["5V", "GND", "GPIO34", "GPIO4"],
        device: "MQ-2 + Buzzer",
        devicePins: ["VCC", "GND", "AOUT", "Buzzer +"],
        links: [
          { from: "5V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "GPIO34", to: "AOUT", color: "signal" },
          { from: "GPIO4", to: "Buzzer +", color: "signal2" },
        ],
      },
    ],
    libraries: [
      { name: "None", note: { en: "analogRead() and digitalWrite() are built in.", ta: "analogRead() மற்றும் digitalWrite() உள்ளமைந்தவை." } },
    ],
    code: {
      filename: "fire_gas_alarm.ino",
      content: `/*
  Fire & Gas Alarm — InnovateX 3.0
  Sounds a buzzer and lights an LED when gas or smoke is detected.
*/

const int GAS_PIN    = 34;
const int BUZZER_PIN = 4;
const int LED_PIN    = 2;

// Tune this after watching clean-air readings in the Serial Monitor.
const int ALARM_LEVEL = 1800;

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  // MQ sensors need a minute or two to warm up before readings settle.
  Serial.println("Warming up sensor...");
  delay(20000);
  Serial.println("Ready.");
}

void loop() {
  int level = analogRead(GAS_PIN);
  Serial.println(level);

  if (level > ALARM_LEVEL) {
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(LED_PIN, HIGH);
    Serial.println("ALARM: gas or smoke detected!");
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LED_PIN, LOW);
  }

  delay(300);
}`,
    },
    testing: [
      { en: "Upload and let the sensor warm up. Note the steady clean-air reading in the Serial Monitor.", ta: "பதிவேற்றி சென்சார் சூடாக விடவும். சுத்தமான காற்று அளவீட்டைக் கவனிக்கவும்." },
      { en: "Set ALARM_LEVEL a few hundred above that clean-air number, then re-upload.", ta: "ALARM_LEVEL-ஐ அந்த எண்ணுக்கு சற்று மேலே அமைத்து மீண்டும் பதிவேற்றவும்." },
      { en: "Test with something safe and smoky, such as a just-blown-out match held at a distance — never a live flame near the breadboard.", ta: "பாதுகாப்பான ஒன்றைக் கொண்டு சோதிக்கவும் — பிரெட்போர்டுக்கு அருகில் நேரடி தீ வேண்டாம்." },
    ],
    troubleshooting: [
      { problem: { en: "The alarm never triggers", ta: "எச்சரிக்கை இயங்கவே இல்லை" }, fix: { en: "ALARM_LEVEL is too high. Watch the Serial Monitor while testing and set the threshold just above the resting value.", ta: "ALARM_LEVEL மிக அதிகம். Serial Monitor-ஐப் பார்த்து வரம்பை அமைக்கவும்." } },
      { problem: { en: "The alarm is always on", ta: "எச்சரிக்கை எப்போதும் இயங்குகிறது" }, fix: { en: "Either the threshold is too low, or the sensor hasn't finished warming up. Give it two minutes and re-check the resting reading.", ta: "வரம்பு மிகக் குறைவு, அல்லது சென்சார் இன்னும் சூடாகவில்லை." } },
    ],
    safety: [
      { en: "Never test with an open flame near the breadboard or wires.", ta: "பிரெட்போர்டு அல்லது வயர்களுக்கு அருகில் திறந்த தீயுடன் சோதிக்க வேண்டாம்." },
      { en: "This is a learning project, not a certified safety device — never rely on it to protect a real room.", ta: "இது ஒரு கற்றல் திட்டம், சான்றளிக்கப்பட்ட பாதுகாப்பு சாதனம் அல்ல." },
      { en: "MQ sensors get warm in normal use. That's expected, but don't leave one running unattended for hours.", ta: "MQ சென்சார்கள் இயல்பாகவே சூடாகும். மணிக்கணக்கில் கவனிப்பின்றி விடாதீர்கள்." },
    ],
    expected: {
      en: "In clean air the board stays quiet. Introduce smoke or gas and the buzzer sounds and the LED lights immediately, clearing again once the air does.",
      ta: "சுத்தமான காற்றில் அமைதியாக இருக்கும். புகை அல்லது வாயு வந்தால் உடனடியாக பஸர் ஒலித்து LED எரியும்.",
    },
  },

  {
    slug: "smart-home",
    title: { en: "Smart Home Control", ta: "ஸ்மார்ட் ஹோம் கட்டுப்பாடு" },
    description: {
      en: "Switch real lights and fans using a relay, with motion-triggered automation from a PIR sensor.",
      ta: "ரிலே பயன்படுத்தி விளக்குகளையும் மின்விசிறிகளையும் இயக்குங்கள், PIR சென்சார் மூலம் தானியங்கி இயக்கம்.",
    },
    hero: "relay-module",
    components: ["esp32", "relay-module", "pir-sensor"],
    skills: ["Relays", "Automation", "Mains safety"],
    buildTime: 70,
    category: "automation",
    overview: {
      en: "A relay is an electrically controlled switch: a small signal from the ESP32 flips a mechanical contact that can carry a much larger current. Paired with a PIR motion sensor, that's the whole idea behind a light that turns itself on when you walk into a room.",
      ta: "ரிலே என்பது மின்சாரத்தால் கட்டுப்படுத்தப்படும் சுவிட்ச். PIR இயக்க சென்சாருடன் இணைந்தால், அறைக்குள் நுழையும்போது தானாக எரியும் விளக்கின் கருத்து அதுதான்.",
    },
    equipment: [
      { name: { en: "ESP32", ta: "ESP32" }, quantity: "1" },
      { name: { en: "Relay module", ta: "ரிலே மாடியூல்" }, quantity: "1", note: { en: "5V, opto-isolated", ta: "5V, ஒப்டோ-தனிமைப்படுத்தப்பட்டது" } },
      { name: { en: "PIR motion sensor", ta: "PIR இயக்க சென்சார்" }, quantity: "1" },
      { name: { en: "Low-voltage lamp", ta: "குறைந்த மின்னழுத்த விளக்கு" }, quantity: "1", note: { en: "Battery-powered — do not use mains for this build", ta: "பேட்டரி இயக்கம் — இதற்கு மெயின்ஸ் பயன்படுத்த வேண்டாம்" } },
    ],
    wiring: [
      {
        controller: "ESP32",
        controllerPins: ["5V", "GND", "GPIO23", "GPIO27"],
        device: "Relay + PIR",
        devicePins: ["VCC", "GND", "Relay IN", "PIR OUT"],
        links: [
          { from: "5V", to: "VCC", color: "power" },
          { from: "GND", to: "GND", color: "ground" },
          { from: "GPIO23", to: "Relay IN", color: "signal" },
          { from: "GPIO27", to: "PIR OUT", color: "signal2" },
        ],
      },
    ],
    libraries: [
      { name: "None", note: { en: "Only digitalRead() and digitalWrite() are needed.", ta: "digitalRead() மற்றும் digitalWrite() மட்டுமே தேவை." } },
    ],
    code: {
      filename: "smart_home_control.ino",
      content: `/*
  Smart Home Control — InnovateX 3.0
  Switches a low-voltage lamp on when motion is detected, and
  off again after a quiet period.
*/

const int RELAY_PIN = 23;
const int PIR_PIN   = 27;

// How long the light stays on after the last movement.
const unsigned long ON_DURATION = 10000;   // 10 seconds
unsigned long lastMotionAt = 0;
bool lightOn = false;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(PIR_PIN, INPUT);

  digitalWrite(RELAY_PIN, LOW);

  // PIR sensors need time to settle to the room's background heat.
  Serial.println("Calibrating motion sensor...");
  delay(15000);
  Serial.println("Ready.");
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    lastMotionAt = millis();
    if (!lightOn) {
      digitalWrite(RELAY_PIN, HIGH);
      lightOn = true;
      Serial.println("Motion — light on");
    }
  }

  // Turn off only once the room has been still for the full duration.
  if (lightOn && millis() - lastMotionAt > ON_DURATION) {
    digitalWrite(RELAY_PIN, LOW);
    lightOn = false;
    Serial.println("No motion — light off");
  }
}`,
    },
    testing: [
      { en: "Upload and wait out the 15-second calibration without moving in front of the sensor.", ta: "பதிவேற்றி, சென்சார் முன் நகராமல் 15 வினாடி காத்திருக்கவும்." },
      { en: "Walk into the sensor's view — you should hear the relay click and see the lamp come on.", ta: "சென்சாரின் பார்வையில் நுழையவும் — ரிலே கிளிக் சத்தம் கேட்க வேண்டும்." },
      { en: "Stand still and time it — the lamp should switch off about ten seconds after the last movement.", ta: "அசையாமல் நின்று நேரத்தைக் கணக்கிடவும் — சுமார் பத்து வினாடிகளில் விளக்கு அணைய வேண்டும்." },
    ],
    troubleshooting: [
      { problem: { en: "The relay clicks constantly", ta: "ரிலே தொடர்ந்து கிளிக் செய்கிறது" }, fix: { en: "The PIR is picking up heat sources — a fan, sunlight or a warm device. Point it away from them and re-run the calibration.", ta: "PIR வெப்ப மூலங்களைக் கண்டறிகிறது. அவற்றிலிருந்து விலக்கி வைக்கவும்." } },
      { problem: { en: "Nothing happens on motion", ta: "இயக்கத்தில் எதுவும் நடக்கவில்லை" }, fix: { en: "Check PIR OUT is on GPIO27 and the module has 5V. Most PIR modules also have two small dials — sensitivity and delay — worth adjusting.", ta: "PIR OUT GPIO27-இல் உள்ளதா எனச் சரிபார்க்கவும்." } },
    ],
    safety: [
      { en: "Build this with a battery-powered lamp only. Mains wiring is genuinely dangerous and must never be attempted without a qualified adult present.", ta: "பேட்டரி இயக்க விளக்குடன் மட்டுமே இதைக் கட்டமைக்கவும். மெயின்ஸ் வயரிங் உண்மையிலேயே ஆபத்தானது." },
      { en: "Never touch the relay's output terminals while anything is connected to them.", ta: "ரிலேயின் வெளியீட்டு முனையங்களை எதுவும் இணைக்கப்பட்டிருக்கும்போது தொடாதீர்கள்." },
      { en: "The low-voltage signal side of the relay is always safe to wire yourself.", ta: "ரிலேயின் குறைந்த மின்னழுத்த சிக்னல் பக்கம் எப்போதும் பாதுகாப்பானது." },
    ],
    expected: {
      en: "Walking into the sensor's view switches the lamp on with an audible relay click. Standing still for ten seconds switches it off again, and it repeats indefinitely.",
      ta: "சென்சாரின் பார்வையில் நடந்தால் விளக்கு எரியும். பத்து வினாடிகள் அசையாமல் இருந்தால் அணையும்.",
    },
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
