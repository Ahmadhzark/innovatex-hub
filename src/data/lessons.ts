import type { Bilingual } from "@/components/providers/LanguageProvider";
import type { CircuitDiagramData } from "@/components/learn/CircuitDiagram";

/**
 * Learn Academy content model.
 *
 * Lessons are built from typed blocks so every page shares one renderer and
 * one set of design decisions. Adding a lesson means adding data here — no
 * new components, no new layout work.
 */

export type LessonBlock =
  | { type: "prose"; text: Bilingual }
  | { type: "hook"; text: Bilingual }
  | { type: "hardware"; slug: string; caption?: Bilingual }
  | { type: "facts"; items: Array<{ label: string; text: Bilingual }> }
  | {
      type: "compare";
      items: Array<{ term: Bilingual; analogy: Bilingual; icon: string }>;
    }
  | {
      type: "steps";
      items: Array<{ title: Bilingual; text: Bilingual }>;
    }
  | { type: "callout"; tone: "info" | "warn"; text: Bilingual }
  | { type: "code"; filename: string; language?: string; content: string }
  | { type: "wiring"; data: CircuitDiagramData; caption?: Bilingual }
  | { type: "heading"; text: Bilingual }
  /**
   * One self-contained component reference: photo, plain-language purpose,
   * a real-world example, and — when relevant — a wiring diagram and a
   * starter sketch. This is the workhorse block for every sensor/actuator
   * lesson: repeat it once per component covered on that page.
   */
  | {
      type: "component";
      slug: string;
      name: string;
      whatItIs: Bilingual;
      example: Bilingual;
      pins?: string[];
      wiring?: CircuitDiagramData;
      code?: { filename: string; content: string };
    };

export type QuizQuestion = {
  question: Bilingual;
  options: Bilingual[];
  /** Index into `options`. */
  answer: number;
  explanation: Bilingual;
};

export type Lesson = {
  slug: string;
  order: number;
  title: Bilingual;
  subtitle: Bilingual;
  /** Hardware slug used for the lesson's cover art. */
  hero: string;
  duration: number;
  blocks: LessonBlock[];
  quiz: QuizQuestion[];
};

export const LESSONS: Lesson[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "electricity",
    order: 1,
    title: { en: "Electricity", ta: "மின்சாரம்" },
    subtitle: {
      en: "Understood through water, not equations",
      ta: "சமன்பாடுகள் அல்ல, நீர் மூலம் புரிந்துகொள்ளுங்கள்",
    },
    hero: "battery-pack",
    duration: 8,
    blocks: [
      {
        type: "hook",
        text: {
          en: "You already understand electricity — you just don't know it yet. You understand water.",
          ta: "உங்களுக்கு ஏற்கனவே மின்சாரம் புரிகிறது — நீங்கள் இன்னும் அதை உணரவில்லை. உங்களுக்கு தண்ணீர் புரியும்.",
        },
      },
      {
        type: "prose",
        text: {
          en: "Picture a water tower on a hill. A pump pushes water down into pipes that run to every house, turning little water-wheels along the way, before the water flows back to be pumped again. That loop — tower, pipe, wheel, and back — is exactly how a circuit works. The only difference is that the water is electricity.",
          ta: "ஒரு மலை மீது இருக்கும் நீர்த்தேக்கத்தை கற்பனை செய்யுங்கள். ஒரு பம்ப் தண்ணீரை குழாய்கள் வழியாக ஒவ்வொரு வீட்டிற்கும் தள்ளுகிறது, வழியில் சிறிய நீர்-சக்கரங்களை சுழற்றி, மீண்டும் தேக்கத்திற்கு திரும்புகிறது. அந்த சுழற்சி தான் ஒரு மின்சுற்று வேலை செய்யும் விதம். வித்தியாசம் என்னவென்றால், அந்த தண்ணீர் மின்சாரம்.",
        },
      },
      {
        type: "compare",
        items: [
          {
            icon: "battery",
            term: { en: "Battery = Pump", ta: "பேட்டரி = பம்ப்" },
            analogy: {
              en: "Pushes electricity around the loop, the way a pump pushes water.",
              ta: "பம்ப் தண்ணீரை தள்ளுவது போல, மின்சாரத்தை வளையத்தில் தள்ளுகிறது.",
            },
          },
          {
            icon: "cable",
            term: { en: "Wire = Pipe", ta: "வயர் = குழாய்" },
            analogy: {
              en: "Carries current from one part of the circuit to the next.",
              ta: "சுற்றின் ஒரு பகுதியிலிருந்து மறுபகுதிக்கு மின்னோட்டத்தை கொண்டு செல்கிறது.",
            },
          },
          {
            icon: "gauge",
            term: { en: "Resistor = Narrow Pipe", ta: "எதிர்ப்பான் = குறுகிய குழாய்" },
            analogy: {
              en: "Squeezes the flow so delicate parts downstream stay safe.",
              ta: "ஓட்டத்தை குறைத்து மென்மையான பாகங்களை பாதுகாக்கிறது.",
            },
          },
          {
            icon: "lightbulb",
            term: { en: "LED = Water-Wheel", ta: "LED = நீர்-சக்கரம்" },
            analogy: {
              en: "Only does its job when current actually flows through it.",
              ta: "மின்னோட்டம் அதன் வழியாக பாயும்போது மட்டுமே வேலை செய்யும்.",
            },
          },
        ],
      },
      {
        type: "prose",
        text: {
          en: "Three words describe everything happening in that loop, and each one has a water twin. Voltage is pressure — how hard the pump pushes. Current is flow — how much actually moves past a point each second. Resistance is narrowness — whatever slows that flow down.",
          ta: "அந்த வளையத்தில் நடக்கும் அனைத்தையும் மூன்று வார்த்தைகள் விவரிக்கின்றன, ஒவ்வொன்றுக்கும் ஒரு நீர் இணை உண்டு. மின்னழுத்தம் என்பது அழுத்தம் — பம்ப் எவ்வளவு வலுவாக தள்ளுகிறது. மின்னோட்டம் என்பது ஓட்டம். எதிர்ப்பு என்பது குறுகல்.",
        },
      },
      {
        type: "facts",
        items: [
          {
            label: "Voltage (V)",
            text: { en: "Water pressure", ta: "நீர் அழுத்தம்" },
          },
          {
            label: "Current (A)",
            text: { en: "Rate of flow", ta: "ஓட்ட விகிதம்" },
          },
          {
            label: "Resistance (Ω)",
            text: { en: "Pipe narrowness", ta: "குழாய் குறுகல்" },
          },
          {
            label: "V = I × R",
            text: { en: "Ohm's Law ties all three", ta: "ஓம் விதி மூன்றையும் இணைக்கிறது" },
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "A wider pipe lets more water through for the same pump. That is exactly why an LED needs a resistor — without one, current rushes through unchecked and the LED burns out, like a burst pipe.",
          ta: "அதே பம்பிற்கு, அகலமான குழாய் அதிக தண்ணீரை அனுமதிக்கும். அதனால்தான் LED-க்கு எதிர்ப்பான் தேவை — இல்லையெனில் மின்னோட்டம் கட்டுப்பாடின்றி பாய்ந்து LED எரிந்துவிடும்.",
        },
      },
    ],
    quiz: [
      {
        question: {
          en: "In the water-pipe analogy, voltage is best compared to:",
          ta: "நீர்க்குழாய் ஒப்புமையில், மின்னழுத்தம் எதற்கு ஒப்பிடத்தக்கது?",
        },
        options: [
          { en: "How much water flows", ta: "எவ்வளவு தண்ணீர் ஓடுகிறது" },
          { en: "How hard the pump pushes", ta: "பம்ப் எவ்வளவு வலுவாக தள்ளுகிறது" },
          { en: "The width of the pipe", ta: "குழாயின் அகலம்" },
        ],
        answer: 1,
        explanation: {
          en: "Voltage is pressure — the push behind the flow.",
          ta: "மின்னழுத்தம் என்பது அழுத்தம் — ஓட்டத்தின் பின்னால் உள்ள தள்ளுதல்.",
        },
      },
      {
        question: {
          en: "A narrower pipe (higher resistance) means:",
          ta: "குறுகிய குழாய் (அதிக எதிர்ப்பு) என்றால்:",
        },
        options: [
          { en: "More current flows", ta: "அதிக மின்னோட்டம் ஓடும்" },
          { en: "Pressure disappears", ta: "அழுத்தம் மறைந்துவிடும்" },
          { en: "Less current flows", ta: "குறைவான மின்னோட்டம் ஓடும்" },
        ],
        answer: 2,
        explanation: {
          en: "Higher resistance restricts the flow.",
          ta: "அதிக எதிர்ப்பு ஓட்டத்தை கட்டுப்படுத்துகிறது.",
        },
      },
      {
        question: {
          en: "Why must a circuit form a complete, unbroken loop?",
          ta: "ஒரு சுற்று ஏன் முழுமையான, உடையாத வளையமாக இருக்க வேண்டும்?",
        },
        options: [
          { en: "Current must travel all the way around", ta: "மின்னோட்டம் முழுவதும் பயணிக்க வேண்டும்" },
          { en: "It looks neater", ta: "அது நேர்த்தியாக தெரியும்" },
          { en: "It isn't actually needed", ta: "அது உண்மையில் தேவையில்லை" },
        ],
        answer: 0,
        explanation: {
          en: "Break the loop anywhere and the flow stops everywhere.",
          ta: "வளையத்தை எங்கு உடைத்தாலும், ஓட்டம் எல்லா இடத்திலும் நின்றுவிடும்.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "led",
    order: 2,
    title: { en: "The LED", ta: "LED" },
    subtitle: {
      en: "A one-way door for electricity",
      ta: "மின்சாரத்திற்கான ஒரு வழி கதவு",
    },
    hero: "led",
    duration: 7,
    blocks: [
      {
        type: "hook",
        text: {
          en: "The simplest component you will ever use — and one of the strictest.",
          ta: "நீங்கள் பயன்படுத்தும் எளிய பாகம் — மற்றும் மிகவும் கண்டிப்பானது.",
        },
      },
      {
        type: "prose",
        text: {
          en: "An LED (Light Emitting Diode) only allows electricity through in one direction. Connect it backwards and nothing happens — no light, no damage, just silence. Connect it the right way round and it glows. That single rule catches out almost every beginner exactly once.",
          ta: "LED (Light Emitting Diode) ஒரே திசையில் மட்டுமே மின்சாரத்தை அனுமதிக்கிறது. தலைகீழாக இணைத்தால் எதுவும் நடக்காது — ஒளி இல்லை, சேதமும் இல்லை. சரியான திசையில் இணைத்தால் ஒளிரும்.",
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { en: "Anode — the longer leg", ta: "ஆனோடு — நீண்ட கால்" },
            text: {
              en: "Goes to the positive side. This is where current enters the LED.",
              ta: "நேர்மறை பக்கத்திற்கு செல்கிறது. இங்கே மின்னோட்டம் நுழைகிறது.",
            },
          },
          {
            title: { en: "Cathode — the shorter leg", ta: "கேத்தோடு — குட்டையான கால்" },
            text: {
              en: "Goes to the negative side. The plastic body is flattened on this side, which is a reliable clue even if the legs get trimmed.",
              ta: "எதிர்மறை பக்கத்திற்கு செல்கிறது. இந்த பக்கத்தில் பிளாஸ்டிக் உடல் தட்டையாக இருக்கும் — கால்கள் வெட்டப்பட்டாலும் இது நம்பகமான குறிப்பு.",
            },
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          en: "An LED has almost no resistance of its own. Wire it straight across a battery and current rushes through uncontrolled — it will overheat and burn out within seconds. Always pair an LED with a resistor.",
          ta: "LED-க்கு சொந்த எதிர்ப்பு கிட்டத்தட்ட இல்லை. நேரடியாக பேட்டரியுடன் இணைத்தால் மின்னோட்டம் கட்டுப்பாடின்றி பாய்ந்து சில வினாடிகளில் எரிந்துவிடும். எப்போதும் எதிர்ப்பானுடன் இணைக்கவும்.",
        },
      },
      {
        type: "facts",
        items: [
          { label: "~2.0V", text: { en: "Typical forward voltage", ta: "வழக்கமான முன்னோக்கு மின்னழுத்தம்" } },
          { label: "~20mA", text: { en: "Safe operating current", ta: "பாதுகாப்பான இயக்க மின்னோட்டம்" } },
          { label: "Long leg", text: { en: "Anode, positive", ta: "ஆனோடு, நேர்மறை" } },
          { label: "Flat edge", text: { en: "Cathode, negative", ta: "கேத்தோடு, எதிர்மறை" } },
        ],
      },
    ],
    quiz: [
      {
        question: { en: "Which leg of an LED is the anode?", ta: "LED-இன் ஆனோடு எந்த கால்?" },
        options: [
          { en: "The shorter leg", ta: "குட்டையான கால்" },
          { en: "The longer leg", ta: "நீண்ட கால்" },
          { en: "Either — it doesn't matter", ta: "எதுவானாலும் பரவாயில்லை" },
        ],
        answer: 1,
        explanation: {
          en: "Longer leg = anode = positive.",
          ta: "நீண்ட கால் = ஆனோடு = நேர்மறை.",
        },
      },
      {
        question: {
          en: "What happens if you connect an LED backwards?",
          ta: "LED-ஐ தலைகீழாக இணைத்தால் என்ன நடக்கும்?",
        },
        options: [
          { en: "It explodes", ta: "அது வெடிக்கும்" },
          { en: "It glows dimly", ta: "மங்கலாக ஒளிரும்" },
          { en: "It simply doesn't light up", ta: "அது வெறுமனே ஒளிராது" },
        ],
        answer: 2,
        explanation: {
          en: "No damage — current simply cannot pass that way.",
          ta: "சேதம் இல்லை — மின்னோட்டம் அந்த வழியில் செல்ல முடியாது.",
        },
      },
      {
        question: {
          en: "Why must an LED always be paired with a resistor?",
          ta: "LED எப்போதும் எதிர்ப்பானுடன் ஏன் இணைக்கப்பட வேண்டும்?",
        },
        options: [
          { en: "It has almost no resistance and would burn out", ta: "அதற்கு எதிர்ப்பு இல்லை, எரிந்துவிடும்" },
          { en: "It makes the LED brighter", ta: "அது LED-ஐ பிரகாசமாக்கும்" },
          { en: "It is only a tradition", ta: "அது வெறும் பழக்கம்" },
        ],
        answer: 0,
        explanation: {
          en: "The resistor limits current to a safe level.",
          ta: "எதிர்ப்பான் மின்னோட்டத்தை பாதுகாப்பான அளவில் வைக்கிறது.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "resistor",
    order: 3,
    title: { en: "The Resistor", ta: "எதிர்ப்பான்" },
    subtitle: {
      en: "Every circuit's traffic controller",
      ta: "ஒவ்வொரு சுற்றின் போக்குவரத்து கட்டுப்படுத்தி",
    },
    hero: "resistor",
    duration: 6,
    blocks: [
      {
        type: "hook",
        text: {
          en: "It does nothing exciting. It just stops everything else from breaking.",
          ta: "அது சுவாரஸ்யமான எதையும் செய்யாது. மற்ற அனைத்தும் உடையாமல் தடுக்கிறது.",
        },
      },
      {
        type: "prose",
        text: {
          en: "A resistor is the narrow section of pipe from the electricity lesson, placed there on purpose. It generates nothing and lights up nothing. Its whole job is to slow the current passing through it so that whatever comes next in the circuit survives.",
          ta: "எதிர்ப்பான் என்பது மின்சார பாடத்தில் பார்த்த குறுகிய குழாய் பகுதி, வேண்டுமென்றே வைக்கப்பட்டது. அது எதையும் உருவாக்காது, ஒளிராது. அதன் முழு வேலையும் மின்னோட்டத்தை மெதுவாக்குவது தான்.",
        },
      },
      {
        type: "prose",
        text: {
          en: "Resistance is measured in Ohms (Ω). On the small resistors used in this program the value is printed as coloured bands rather than numbers, because bands stay readable from any angle on a component a few millimetres wide.",
          ta: "எதிர்ப்பு ஓம் (Ω) இல் அளக்கப்படுகிறது. இந்த திட்டத்தில் பயன்படுத்தப்படும் சிறிய எதிர்ப்பான்களில், மதிப்பு எண்களுக்கு பதிலாக வண்ண பட்டைகளாக அச்சிடப்பட்டுள்ளது.",
        },
      },
      {
        type: "facts",
        items: [
          { label: "220Ω", text: { en: "The go-to value for one LED", ta: "ஒரு LED-க்கான பொதுவான மதிப்பு" } },
          { label: "Red Red Brown", text: { en: "The bands that mean 220Ω", ta: "220Ω-ஐ குறிக்கும் பட்டைகள்" } },
          { label: "No polarity", text: { en: "Works either way round", ta: "எந்த திசையிலும் வேலை செய்யும்" } },
          { label: "±5%", text: { en: "Gold band tolerance", ta: "தங்க பட்டை சகிப்புத்தன்மை" } },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "Unlike an LED, a resistor has no polarity — place it either way round and it behaves identically. That makes it one of the most forgiving parts on your breadboard.",
          ta: "LED போலல்லாமல், எதிர்ப்பானுக்கு துருவமுனைவு இல்லை — எந்த திசையில் வைத்தாலும் ஒரே மாதிரி செயல்படும்.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "What is a resistor's main job?", ta: "எதிர்ப்பானின் முக்கிய வேலை என்ன?" },
        options: [
          { en: "Limit the current flowing through", ta: "மின்னோட்டத்தை கட்டுப்படுத்துதல்" },
          { en: "Light up the circuit", ta: "சுற்றை ஒளிரச் செய்தல்" },
          { en: "Store electricity", ta: "மின்சாரத்தை சேமித்தல்" },
        ],
        answer: 0,
        explanation: {
          en: "It restricts current so other components stay safe.",
          ta: "மற்ற பாகங்கள் பாதுகாப்பாக இருக்க மின்னோட்டத்தை கட்டுப்படுத்துகிறது.",
        },
      },
      {
        question: {
          en: "Does a resistor have a correct direction?",
          ta: "எதிர்ப்பானுக்கு சரியான திசை உண்டா?",
        },
        options: [
          { en: "Yes, always", ta: "ஆம், எப்போதும்" },
          { en: "No, it works either way", ta: "இல்லை, எந்த வழியிலும் வேலை செய்யும்" },
          { en: "Only the red ones", ta: "சிவப்பு நிறமுள்ளவை மட்டும்" },
        ],
        answer: 1,
        explanation: {
          en: "Resistors have no polarity.",
          ta: "எதிர்ப்பான்களுக்கு துருவமுனைவு இல்லை.",
        },
      },
      {
        question: {
          en: "Which value is standard for a single LED?",
          ta: "ஒரு LED-க்கான நிலையான மதிப்பு எது?",
        },
        options: [
          { en: "10Ω", ta: "10Ω" },
          { en: "1,000,000Ω", ta: "1,000,000Ω" },
          { en: "220Ω", ta: "220Ω" },
        ],
        answer: 2,
        explanation: {
          en: "220Ω is the workshop standard for a 5V supply.",
          ta: "5V மின்சப்ளைக்கு 220Ω பட்டறை தரநிலை.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: "breadboard",
    order: 4,
    title: { en: "The Breadboard", ta: "பிரெட்போர்டு" },
    subtitle: {
      en: "Build real circuits, undo any mistake",
      ta: "உண்மையான சுற்றுகள், எந்த தவறையும் மாற்றலாம்",
    },
    hero: "breadboard",
    duration: 7,
    blocks: [
      {
        type: "hook",
        text: {
          en: "A grid of hidden wires that lets you undo any mistake in one second.",
          ta: "ஒரு வினாடியில் எந்த தவறையும் மாற்ற அனுமதிக்கும் மறைமுக வயர்களின் கட்டம்.",
        },
      },
      {
        type: "prose",
        text: {
          en: "A breadboard looks like a plastic slab full of tiny holes, but underneath, metal strips already connect certain holes to each other. Push a wire or a component leg into a hole and it is electrically joined to every other hole on that strip — no soldering, no heat, no permanent decisions.",
          ta: "பிரெட்போர்டு சிறிய துளைகள் நிறைந்த பிளாஸ்டிக் பலகை போல் தெரிகிறது, ஆனால் அதனுள் உலோக பட்டைகள் சில துளைகளை ஏற்கனவே இணைக்கின்றன. ஒரு வயரை துளையில் செருகினால், அதே பட்டையின் மற்ற துளைகளுடன் இணைக்கப்படுகிறது.",
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { en: "Power rails — top and bottom", ta: "பவர் ரெயில்கள் — மேலும் கீழும்" },
            text: {
              en: "Marked + and −, these run the full length of the board. Everything on the red line shares power; everything on the blue line shares ground.",
              ta: "+ மற்றும் − குறியிடப்பட்டவை, பலகையின் முழு நீளத்திலும் ஓடுகின்றன. சிவப்பு கோட்டில் உள்ள அனைத்தும் பவரை பகிர்கின்றன.",
            },
          },
          {
            title: { en: "Terminal strips — the middle", ta: "டெர்மினல் பட்டைகள் — நடுவில்" },
            text: {
              en: "These run vertically in groups of five holes only, and the centre gap splits the board into two halves. Component legs sit here.",
              ta: "இவை ஐந்து துளைகள் கொண்ட குழுக்களாக செங்குத்தாக ஓடுகின்றன, நடு இடைவெளி பலகையை இரண்டாக பிரிக்கிறது.",
            },
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "The centre gap exists so that chips with two rows of pins can straddle it without shorting their own sides together.",
          ta: "இரு வரிசை பின்கள் கொண்ட சிப்கள், தங்கள் பக்கங்களை ஒன்றாக இணைக்காமல் அமர இந்த நடு இடைவெளி உள்ளது.",
        },
      },
    ],
    quiz: [
      {
        question: {
          en: "How many holes are joined in one terminal strip group?",
          ta: "ஒரு டெர்மினல் பட்டை குழுவில் எத்தனை துளைகள் இணைக்கப்பட்டுள்ளன?",
        },
        options: [
          { en: "The whole row", ta: "முழு வரிசையும்" },
          { en: "Five", ta: "ஐந்து" },
          { en: "Just one", ta: "ஒன்று மட்டும்" },
        ],
        answer: 1,
        explanation: {
          en: "Terminal strips connect in groups of five.",
          ta: "டெர்மினல் பட்டைகள் ஐந்து குழுக்களாக இணைகின்றன.",
        },
      },
      {
        question: { en: "What do the power rails do?", ta: "பவர் ரெயில்கள் என்ன செய்கின்றன?" },
        options: [
          { en: "Carry power and ground along the whole board", ta: "முழு பலகையிலும் பவர் மற்றும் கிரவுண்ட் கொண்டு செல்கின்றன" },
          { en: "Hold components physically in place", ta: "பாகங்களை இயற்பியல் ரீதியாக நிலைநிறுத்துகின்றன" },
          { en: "Only work with LEDs", ta: "LED-களுடன் மட்டும் வேலை செய்கின்றன" },
        ],
        answer: 0,
        explanation: {
          en: "They distribute supply and ground to the whole board.",
          ta: "அவை முழு பலகைக்கும் மின்சப்ளை மற்றும் கிரவுண்டை வழங்குகின்றன.",
        },
      },
      {
        question: {
          en: "Why are breadboards ideal for learning?",
          ta: "கற்றலுக்கு பிரெட்போர்டுகள் ஏன் ஏற்றவை?",
        },
        options: [
          { en: "They are the cheapest option", ta: "அவை மலிவானவை" },
          { en: "They require soldering skill", ta: "அவைக்கு சோல்டரிங் திறமை தேவை" },
          { en: "Mistakes can be undone instantly", ta: "தவறுகளை உடனடியாக மாற்றலாம்" },
        ],
        answer: 2,
        explanation: {
          en: "Nothing is permanent, so experimenting is free.",
          ta: "எதுவும் நிரந்தரமில்லை, எனவே சோதனை செய்வது இலவசம்.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: "intro-robotics",
    order: 5,
    title: { en: "Robotics & Embedded Systems", ta: "ரோபோட்டிக்ஸ் & உட்பொதிவு அமைப்புகள்" },
    subtitle: {
      en: "What you're actually building toward",
      ta: "நீங்கள் உண்மையில் நோக்கமாக கொண்டிருப்பது",
    },
    hero: "esp32",
    duration: 6,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Robotics is just electronics that decided to move.",
          ta: "ரோபோட்டிக்ஸ் என்பது நகர முடிவு செய்த எலக்ட்ரானிக்ஸ்.",
        },
      },
      {
        type: "prose",
        text: {
          en: "Every robot, no matter how advanced, is built from the same three-step loop: it senses something about the world, it thinks about what that means, and it acts. A robot vacuum senses a wall with a bump sensor, thinks \"turn right\", and acts by driving its wheels. That's the whole trick — everything else is detail.",
          ta: "எவ்வளவு மேம்பட்டதாக இருந்தாலும், ஒவ்வொரு ரோபோவும் ஒரே மூன்று-படி சுழற்சியில் கட்டமைக்கப்பட்டுள்ளது: அது உலகைப் பற்றி ஏதாவது உணர்கிறது, அது என்ன பொருள் என்று சிந்திக்கிறது, பின்னர் செயல்படுகிறது. ஒரு ரோபோ வெற்றிடம் ஒரு சுவரை உணர்கிறது, \"வலமாக திரும்பு\" என்று நினைக்கிறது, சக்கரங்களை இயக்கி செயல்படுகிறது. அதுதான் முழு தந்திரம்.",
        },
      },
      {
        type: "compare",
        items: [
          {
            icon: "gauge",
            term: { en: "Sense", ta: "உணர்தல்" },
            analogy: {
              en: "Sensors turn something physical — light, distance, heat — into an electrical signal the board can read.",
              ta: "சென்சார்கள் ஒளி, தூரம், வெப்பம் போன்ற இயற்பியல் தன்மைகளை போர்டு படிக்கக்கூடிய மின் சமிக்ஞையாக மாற்றுகின்றன.",
            },
          },
          {
            icon: "cable",
            term: { en: "Think", ta: "சிந்தித்தல்" },
            analogy: {
              en: "Your code reads that signal and decides what should happen next — this is the part you write.",
              ta: "உங்கள் குறியீடு அந்த சமிக்ஞையை படித்து அடுத்து என்ன நடக்க வேண்டும் என்று முடிவு செய்கிறது.",
            },
          },
          {
            icon: "battery",
            term: { en: "Act", ta: "செயல்படுதல்" },
            analogy: {
              en: "Actuators — motors, buzzers, lights — turn that decision back into something physical.",
              ta: "மோட்டார்கள், பஸர்கள், விளக்குகள் போன்ற ஆக்சுவேட்டர்கள் அந்த முடிவை மீண்டும் இயற்பியலாக மாற்றுகின்றன.",
            },
          },
        ],
      },
      {
        type: "heading",
        text: { en: "What is an embedded system?", ta: "உட்பொதிவு அமைப்பு என்றால் என்ன?" },
      },
      {
        type: "prose",
        text: {
          en: "The laptop or phone you're reading this on is a general-purpose computer — it runs a hundred different apps. An embedded system is the opposite: a small computer built into a device to do one job, and do it forever. The chip inside a washing machine, a traffic light, or a calculator is an embedded system. The ESP32 and Arduino Uno you'll use in this program are the same idea, just made for you to program yourself.",
          ta: "நீங்கள் இதைப் படிக்கும் லேப்டாப் அல்லது ஃபோன் ஒரு பொது-நோக்கம் கணினி — அது நூற்றுக்கணக்கான ஆப்களை இயக்குகிறது. உட்பொதிவு அமைப்பு அதற்கு எதிரானது: ஒரு சாதனத்தில் உள்ளமைக்கப்பட்ட ஒரு சிறிய கணினி, ஒரே ஒரு வேலையை என்றென்றும் செய்யும். வாஷிங் மெஷின், ட்ராஃபிக் லைட் அல்லது கால்குலேட்டரின் உள்ளே உள்ள சிப் ஒரு உட்பொதிவு அமைப்பு. இந்த திட்டத்தில் நீங்கள் பயன்படுத்தும் ESP32 மற்றும் Arduino Uno அதே கருத்து — நீங்களே நிரலாக்க முடியும்.",
        },
      },
      {
        type: "facts",
        items: [
          { label: "Sense", text: { en: "Sensors read the world", ta: "சென்சார்கள் உலகை படிக்கின்றன" } },
          { label: "Think", text: { en: "Code makes decisions", ta: "குறியீடு முடிவெடுக்கிறது" } },
          { label: "Act", text: { en: "Actuators respond", ta: "ஆக்சுவேட்டர்கள் செயல்படுகின்றன" } },
          { label: "Repeat", text: { en: "loop() runs forever", ta: "loop() எப்போதும் இயங்கும்" } },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "This is exactly the path this workshop follows: Weeks 1 covers the board and code, then you'll add senses (sensors), then reactions (motors and outputs), and finally combine all three into a working robot.",
          ta: "இந்த பட்டறை பின்பற்றும் பாதை இதுதான்: வாரம் 1 போர்டு மற்றும் குறியீட்டை உள்ளடக்கியது, பின்னர் உணர்வுகள் (சென்சார்கள்), பின்னர் எதிர்வினைகள் (மோட்டார்கள்), இறுதியாக மூன்றையும் இணைத்து ஒரு ரோபோ.",
        },
      },
    ],
    quiz: [
      {
        question: {
          en: "What are the three steps every robot repeats?",
          ta: "ஒவ்வொரு ரோபோவும் மீண்டும் செய்யும் மூன்று படிகள் என்ன?",
        },
        options: [
          { en: "Sense, Think, Act", ta: "உணர், சிந்தி, செயல்படு" },
          { en: "Power on, Beep, Power off", ta: "இயக்கு, ஒலி, நிறுத்து" },
          { en: "Buy, Build, Sell", ta: "வாங்கு, கட்டமை, விற்று" },
        ],
        answer: 0,
        explanation: {
          en: "Sense (read the world), Think (decide), Act (respond) — every robot, however complex.",
          ta: "உணர் (உலகை படி), சிந்தி (முடிவெடு), செயல்படு (பதிலளி) — ஒவ்வொரு ரோபோவும்.",
        },
      },
      {
        question: {
          en: "What makes a system \"embedded\"?",
          ta: "ஒரு அமைப்பு \"உட்பொதிவு\" என்பதற்கான காரணம் என்ன?",
        },
        options: [
          { en: "It runs many different apps", ta: "இது பல ஆப்களை இயக்குகிறது" },
          { en: "It's a small computer built in to do one specific job", ta: "இது ஒரு குறிப்பிட்ட வேலைக்காக உள்ளமைக்கப்பட்ட சிறிய கணினி" },
          { en: "It has no electricity", ta: "இதற்கு மின்சாரம் இல்லை" },
        ],
        answer: 1,
        explanation: {
          en: "Embedded systems are dedicated to one job, unlike a general-purpose laptop.",
          ta: "பொது-நோக்கம் லேப்டாப் போலல்லாமல், உட்பொதிவு அமைப்புகள் ஒரே வேலைக்காக அர்ப்பணிக்கப்பட்டவை.",
        },
      },
      {
        question: {
          en: "In the sense-think-act loop, what does an actuator do?",
          ta: "உணர்-சிந்தி-செயல்படு சுழற்சியில், ஆக்சுவேட்டர் என்ன செய்கிறது?",
        },
        options: [
          { en: "Reads a signal from the world", ta: "உலகிலிருந்து ஒரு சமிக்ஞையை படிக்கிறது" },
          { en: "Turns a decision into physical motion or output", ta: "ஒரு முடிவை இயற்பியல் இயக்கம் அல்லது வெளியீடாக மாற்றுகிறது" },
          { en: "Stores the program", ta: "நிரலை சேமிக்கிறது" },
        ],
        answer: 1,
        explanation: {
          en: "Motors, buzzers and lights are actuators — the \"act\" step.",
          ta: "மோட்டார்கள், பஸர்கள், விளக்குகள் ஆக்சுவேட்டர்கள் — \"செயல்படு\" படி.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    slug: "arduino-uno",
    order: 6,
    title: { en: "Arduino Uno", ta: "Arduino Uno" },
    subtitle: {
      en: "The forgiving board every beginner starts on",
      ta: "ஒவ்வொரு ஆரம்பநிலையாளரும் தொடங்கும் எளிதான போர்டு",
    },
    hero: "arduino-uno",
    duration: 8,
    blocks: [
      {
        type: "hook",
        text: {
          en: "A small computer with one job: run your code, forever, the moment it's powered on.",
          ta: "ஒரே ஒரு வேலையுள்ள சிறிய கணினி: இயக்கப்பட்ட உடனேயே உங்கள் குறியீட்டை என்றென்றும் இயக்கு.",
        },
      },
      {
        type: "prose",
        text: {
          en: "The Arduino Uno is built around a single chip — the ATmega328P — surrounded by everything needed to make it easy to use: a USB port to program it, a voltage regulator so it can run from almost any power source, and rows of labelled pins you connect wires to. No soldering, no separate programmer tool required.",
          ta: "Arduino Uno ஒரே ஒரு சிப்பை மையமாகக் கொண்டது — ATmega328P — அதை பயன்படுத்த எளிதாக்கும் அனைத்தையும் சுற்றி வைத்துள்ளது: நிரலாக்க USB போர்ட், எந்த மின்சப்ளையிலும் இயங்க ஒரு மின்னழுத்த கட்டுப்படுத்தி, மற்றும் வயர்களை இணைக்க பெயரிடப்பட்ட பின் வரிசைகள். சோல்டரிங் தேவையில்லை.",
        },
      },
      {
        type: "hardware",
        slug: "arduino-uno",
      },
      {
        type: "facts",
        items: [
          { label: "5V logic", text: { en: "Pins read/write 0V or 5V", ta: "பின்கள் 0V அல்லது 5V" } },
          { label: "14 digital", text: { en: "Pins D0–D13", ta: "D0–D13 பின்கள்" } },
          { label: "6 analog", text: { en: "Pins A0–A5", ta: "A0–A5 பின்கள்" } },
          { label: "16MHz", text: { en: "Clock speed", ta: "கிளாக் வேகம்" } },
        ],
      },
      {
        type: "heading",
        text: { en: "The three kinds of pins", ta: "மூன்று வகையான பின்கள்" },
      },
      {
        type: "prose",
        text: {
          en: "Every pin on the board falls into one of three jobs. Getting this straight is the single most useful thing to understand before wiring anything.",
          ta: "போர்டில் உள்ள ஒவ்வொரு பின்னும் மூன்று வேலைகளில் ஒன்றைச் சேர்ந்தது. எதையும் இணைக்கும் முன் இதை புரிந்துகொள்வது மிக முக்கியம்.",
        },
      },
      {
        type: "compare",
        items: [
          {
            icon: "battery",
            term: { en: "Power Pins", ta: "பவர் பின்கள்" },
            analogy: {
              en: "5V, 3.3V and GND. These supply power to your components — they never carry your code's signals.",
              ta: "5V, 3.3V மற்றும் GND. இவை உங்கள் பாகங்களுக்கு மின்சாரம் வழங்குகின்றன.",
            },
          },
          {
            icon: "cable",
            term: { en: "Digital Pins", ta: "டிஜிட்டல் பின்கள்" },
            analogy: {
              en: "D0–D13. Only ever two states: HIGH (5V, \"on\") or LOW (0V, \"off\"). Perfect for LEDs, buttons, buzzers.",
              ta: "D0–D13. இரண்டு நிலைகள் மட்டுமே: HIGH (5V, \"ஆன்\") அல்லது LOW (0V, \"ஆஃப்\").",
            },
          },
          {
            icon: "gauge",
            term: { en: "Analog Pins", ta: "அனலாக் பின்கள்" },
            analogy: {
              en: "A0–A5. Read a smooth range of voltage, not just on/off — used for sensors like a potentiometer or LDR.",
              ta: "A0–A5. ஆன்/ஆஃப் மட்டுமல்ல, மென்மையான மின்னழுத்த வரம்பை படிக்கின்றன.",
            },
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          en: "Digital pins marked with a ~ (like ~3, ~5, ~6) can also fake an analog output using PWM (Pulse Width Modulation) — that's how analogWrite() dims an LED or sets a motor's speed, even though the pin is really just switching on and off very fast.",
          ta: "~ குறியிடப்பட்ட டிஜிட்டல் பின்கள் (~3, ~5, ~6 போன்றவை) PWM மூலம் அனலாக் வெளியீட்டையும் போலியாக செய்யலாம்.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "What voltage does a digital pin output for HIGH?", ta: "HIGH-க்கு டிஜிட்டல் பின் என்ன மின்னழுத்தத்தை வெளியிடும்?" },
        options: [
          { en: "5V", ta: "5V" },
          { en: "0V", ta: "0V" },
          { en: "It varies smoothly", ta: "மென்மையாக மாறுபடும்" },
        ],
        answer: 0,
        explanation: { en: "HIGH means 5V; LOW means 0V — digital is always one or the other.", ta: "HIGH என்றால் 5V; LOW என்றால் 0V." },
      },
      {
        question: { en: "Which pin type would you use for a potentiometer that outputs a smooth range of voltage?", ta: "மென்மையான மின்னழுத்த வரம்பை வெளியிடும் பொட்டென்ஷியோமீட்டருக்கு எந்த பின் வகை தேவை?" },
        options: [
          { en: "A power pin", ta: "பவர் பின்" },
          { en: "A digital pin", ta: "டிஜிட்டல் பின்" },
          { en: "An analog pin", ta: "அனலாக் பின்" },
        ],
        answer: 2,
        explanation: { en: "Analog pins (A0–A5) read a range of values, not just on/off.", ta: "அனலாக் பின்கள் (A0–A5) ஆன்/ஆஃப் அல்லாமல் ஒரு வரம்பை படிக்கின்றன." },
      },
      {
        question: { en: "What does the ~ symbol next to a digital pin number mean?", ta: "டிஜிட்டல் பின் எண்ணுக்கு அருகில் உள்ள ~ சின்னம் என்ன அர்த்தம்?" },
        options: [
          { en: "That pin is broken", ta: "அந்த பின் உடைந்துவிட்டது" },
          { en: "It supports PWM (a fake analog output)", ta: "அது PWM-ஐ ஆதரிக்கிறது" },
          { en: "It only works with sensors", ta: "இது சென்சார்களுடன் மட்டும் வேலை செய்யும்" },
        ],
        answer: 1,
        explanation: { en: "PWM pins can simulate an analog signal by switching on/off very fast.", ta: "PWM பின்கள் மிக வேகமாக ஆன்/ஆஃப் செய்வதன் மூலம் அனலாக் சமிக்ஞையை உருவகப்படுத்தலாம்." },
      },
    ],
  },

  /* ------------------------------------------------------------------ 7 */
  {
    slug: "esp32",
    order: 7,
    title: { en: "ESP32", ta: "ESP32" },
    subtitle: {
      en: "An Arduino Uno with Wi-Fi and superpowers",
      ta: "Wi-Fi மற்றும் அதிக சக்தி கொண்ட Arduino Uno",
    },
    hero: "esp32",
    duration: 8,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Everything the Arduino Uno does, plus Wi-Fi, Bluetooth, and roughly ten times the brainpower.",
          ta: "Arduino Uno செய்யும் அனைத்தும், மேலும் Wi-Fi, Bluetooth, சுமார் பத்து மடங்கு அதிக சக்தி.",
        },
      },
      {
        type: "prose",
        text: {
          en: "The ESP32 is the board this whole program is built around. Where the Uno has one core running at 16MHz, the ESP32 has two cores running at up to 240MHz — and it has Wi-Fi and Bluetooth built directly into the chip. That's what makes Week 2's cloud dashboard possible: the same board that blinks an LED can also talk to the internet.",
          ta: "இந்த முழு திட்டமும் ESP32-ஐ மையமாகக் கொண்டது. Uno-வுக்கு 16MHz-இல் இயங்கும் ஒரு கோர் இருந்தால், ESP32-க்கு 240MHz வரை இயங்கும் இரண்டு கோர்கள் உள்ளன — மேலும் Wi-Fi மற்றும் Bluetooth சிப்பிலேயே உள்ளமைக்கப்பட்டுள்ளது.",
        },
      },
      {
        type: "hardware",
        slug: "esp32",
      },
      {
        type: "facts",
        items: [
          { label: "3.3V logic", text: { en: "Not 5V — important!", ta: "5V அல்ல — முக்கியம்!" } },
          { label: "30+ GPIO", text: { en: "More pins than Uno", ta: "Uno-வை விட அதிக பின்கள்" } },
          { label: "Wi-Fi + BLE", text: { en: "Built into the chip", ta: "சிப்பில் உள்ளமைக்கப்பட்டது" } },
          { label: "Dual-core", text: { en: "Up to 240MHz", ta: "240MHz வரை" } },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          en: "The single most important difference to remember: the ESP32 runs on 3.3V logic, not 5V like the Uno. A sensor designed only for 5V can damage a 3.3V pin — check a component's datasheet or ask your instructor before mixing boards.",
          ta: "நினைவில் கொள்ள வேண்டிய மிக முக்கியமான வேறுபாடு: ESP32, Uno போல 5V அல்ல, 3.3V-இல் இயங்குகிறது. 5V-க்கு மட்டும் வடிவமைக்கப்பட்ட சென்சார் 3.3V பின்னை சேதப்படுத்தலாம்.",
        },
      },
      {
        type: "heading",
        text: { en: "Arduino Uno vs ESP32", ta: "Arduino Uno vs ESP32" },
      },
      {
        type: "compare",
        items: [
          {
            icon: "gauge",
            term: { en: "Uno: simple & forgiving", ta: "Uno: எளிமையானது" },
            analogy: {
              en: "5V logic, one core, no wireless. The easiest board to start on and hard to damage by mistake.",
              ta: "5V, ஒரு கோர், வயர்லெஸ் இல்லை. தொடங்க எளிதானது.",
            },
          },
          {
            icon: "battery",
            term: { en: "ESP32: powerful & connected", ta: "ESP32: சக்தி வாய்ந்தது" },
            analogy: {
              en: "3.3V logic, two cores, Wi-Fi + Bluetooth. What every week from Week 1 onward is built on.",
              ta: "3.3V, இரண்டு கோர்கள், Wi-Fi + Bluetooth.",
            },
          },
        ],
      },
      {
        type: "prose",
        text: {
          en: "The good news: the code you write looks almost identical on both boards. `pinMode()`, `digitalWrite()`, `analogRead()` all work the same way. Once you understand one board, the other is mostly the same ideas with extra capability.",
          ta: "நல்ல செய்தி: இரு போர்டுகளிலும் நீங்கள் எழுதும் குறியீடு கிட்டத்தட்ட ஒரே மாதிரி தெரிகிறது. ஒரு போர்டைப் புரிந்துகொண்டால், மற்றொன்று பெரும்பாலும் அதே கருத்துகள்.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "What voltage does the ESP32 use for its logic pins?", ta: "ESP32 அதன் லாஜிக் பின்களுக்கு என்ன மின்னழுத்தத்தைப் பயன்படுத்துகிறது?" },
        options: [
          { en: "5V", ta: "5V" },
          { en: "3.3V", ta: "3.3V" },
          { en: "12V", ta: "12V" },
        ],
        answer: 1,
        explanation: { en: "3.3V — mixing in a 5V-only sensor without care can damage the board.", ta: "3.3V — கவனமின்றி 5V சென்சாரை இணைத்தால் போர்டு சேதமடையலாம்." },
      },
      {
        question: { en: "What does the ESP32 have that the Arduino Uno doesn't?", ta: "Arduino Uno-வில் இல்லாத எதை ESP32 கொண்டுள்ளது?" },
        options: [
          { en: "Digital pins", ta: "டிஜிட்டல் பின்கள்" },
          { en: "Built-in Wi-Fi and Bluetooth", ta: "உள்ளமைக்கப்பட்ட Wi-Fi மற்றும் Bluetooth" },
          { en: "The ability to run code", ta: "குறியீட்டை இயக்கும் திறன்" },
        ],
        answer: 1,
        explanation: { en: "Wi-Fi and Bluetooth are built directly into the ESP32 chip.", ta: "Wi-Fi மற்றும் Bluetooth ESP32 சிப்பிலேயே உள்ளமைக்கப்பட்டுள்ளது." },
      },
      {
        question: { en: "Is the code you write for an Uno very different from ESP32 code?", ta: "Uno-க்கு எழுதும் குறியீடு ESP32 குறியீட்டிலிருந்து மிகவும் வேறுபட்டதா?" },
        options: [
          { en: "Completely different languages", ta: "முற்றிலும் வேறுபட்ட மொழிகள்" },
          { en: "Mostly the same functions, like pinMode and digitalWrite", ta: "pinMode, digitalWrite போன்ற ஒரே செயல்பாடுகள்" },
          { en: "ESP32 can't be programmed at all", ta: "ESP32-ஐ நிரலாக்கவே முடியாது" },
        ],
        answer: 1,
        explanation: { en: "Both use the same Arduino-style functions — that's why skills transfer directly.", ta: "இரண்டும் ஒரே Arduino-பாணி செயல்பாடுகளைப் பயன்படுத்துகின்றன." },
      },
    ],
  },

  /* ------------------------------------------------------------------ 8 */
  {
    slug: "uploading-code",
    order: 8,
    title: { en: "Arduino IDE & Uploading Code", ta: "Arduino IDE & குறியீடு பதிவேற்றம்" },
    subtitle: {
      en: "From written code to a board that actually runs it",
      ta: "எழுதப்பட்ட குறியீட்டிலிருந்து அதை இயக்கும் போர்டு வரை",
    },
    hero: "arduino-uno",
    duration: 9,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Code sitting on your laptop does nothing. Uploading is the step that actually makes something happen.",
          ta: "உங்கள் லேப்டாப்பில் இருக்கும் குறியீடு எதுவும் செய்யாது. பதிவேற்றம் தான் உண்மையில் எதையாவது நடக்கச் செய்யும் படி.",
        },
      },
      {
        type: "prose",
        text: {
          en: "The Arduino IDE (Integrated Development Environment) is the app you write code in and send it to the board from. It's free, works on Windows/Mac/Linux, and is the same tool whether you're programming an Uno or an ESP32.",
          ta: "Arduino IDE (Integrated Development Environment) என்பது நீங்கள் குறியீட்டை எழுதி போர்டுக்கு அனுப்பும் ஆப். இது இலவசம், Windows/Mac/Linux-இல் வேலை செய்யும், Uno அல்லது ESP32 எதற்கும் அதே கருவி.",
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { en: "1. Install the Arduino IDE", ta: "1. Arduino IDE-ஐ நிறுவுங்கள்" },
            text: {
              en: "Download it free from arduino.cc/en/software and install it like any other app.",
              ta: "arduino.cc/en/software இலிருந்து இலவசமாக பதிவிறக்கி, மற்ற ஆப்களைப் போல நிறுவுங்கள்.",
            },
          },
          {
            title: { en: "2. Add ESP32 support (skip this for Uno)", ta: "2. ESP32 ஆதரவை சேர்க்கவும் (Uno-க்கு தேவையில்லை)" },
            text: {
              en: "The Uno works out of the box. For ESP32, open File → Preferences, paste the Espressif board-manager URL, then install \"esp32\" from Tools → Board → Boards Manager.",
              ta: "Uno உடனடியாக வேலை செய்யும். ESP32-க்கு, File → Preferences-ஐ திறந்து, Espressif board-manager URL-ஐ ஒட்டி, Tools → Board → Boards Manager-இல் இருந்து \"esp32\"-ஐ நிறுவவும்.",
            },
          },
          {
            title: { en: "3. Connect the board", ta: "3. போர்டை இணைக்கவும்" },
            text: {
              en: "Plug it into your laptop with a data-capable USB cable — some cables only charge, and won't work here.",
              ta: "டேட்டா திறன் கொண்ட USB கேபிள் மூலம் லேப்டாப்பில் செருகவும் — சில கேபிள்கள் சார்ஜ் மட்டும் செய்யும்.",
            },
          },
          {
            title: { en: "4. Select your board and port", ta: "4. உங்கள் போர்டு மற்றும் போர்ட்டைத் தேர்ந்தெடுக்கவும்" },
            text: {
              en: "Tools → Board, choose \"Arduino Uno\" or \"ESP32 Dev Module\". Then Tools → Port, choose the one that appeared when you plugged in (usually named COM3, COM4… on Windows).",
              ta: "Tools → Board, \"Arduino Uno\" அல்லது \"ESP32 Dev Module\"-ஐ தேர்ந்தெடுக்கவும். பின்னர் Tools → Port.",
            },
          },
          {
            title: { en: "5. Write or paste your code", ta: "5. உங்கள் குறியீட்டை எழுதவும் அல்லது ஒட்டவும்" },
            text: {
              en: "Every sketch needs a setup() function (runs once) and a loop() function (runs forever, over and over).",
              ta: "ஒவ்வொரு ஸ்கெட்சிற்கும் setup() (ஒரு முறை இயங்கும்) மற்றும் loop() (எப்போதும் மீண்டும் இயங்கும்) தேவை.",
            },
          },
          {
            title: { en: "6. Click Upload", ta: "6. Upload-ஐ கிளிக் செய்யவும்" },
            text: {
              en: "The arrow icon (→) in the top-left. Watch the black console at the bottom: it compiles, uploads, and finishes with \"Done uploading.\"",
              ta: "மேல்-இடதுபுறத்தில் உள்ள அம்பு ஐகான் (→). கீழே உள்ள கருப்பு கன்சோலைப் பாருங்கள்: இது தொகுத்து, பதிவேற்றி, \"Done uploading\" உடன் முடிக்கும்.",
            },
          },
        ],
      },
      {
        type: "code",
        filename: "blink.ino",
        language: "cpp",
        content: `// The classic first upload — works on Uno and ESP32 alike.
// On ESP32, GPIO2 is usually wired to the onboard LED too.

const int LED_PIN = 2;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`,
      },
      {
        type: "heading",
        text: { en: "When it doesn't work", ta: "வேலை செய்யாதபோது" },
      },
      {
        type: "facts",
        items: [
          { label: "No port listed", text: { en: "Try a different USB cable — many only charge", ta: "வேறு USB கேபிளை முயற்சிக்கவும்" } },
          { label: "\"avrdude\" error", text: { en: "Wrong board selected, or press the BOOT button on ESP32", ta: "தவறான போர்டு, அல்லது BOOT பொத்தானை அழுத்தவும்" } },
          { label: "Compile error", text: { en: "Read the red text — it names the exact line", ta: "சிவப்பு உரையை படிக்கவும் — சரியான வரியைக் காட்டும்" } },
          { label: "Nothing happens", text: { en: "Check GND is actually connected", ta: "GND உண்மையில் இணைக்கப்பட்டுள்ளதா என சரிபார்க்கவும்" } },
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "Every single error message in the Arduino IDE tells you something useful, even when it looks scary. Read the first line of red text before asking for help — it usually names the exact problem.",
          ta: "Arduino IDE-இல் உள்ள ஒவ்வொரு பிழை செய்தியும் பயனுள்ள ஒன்றைச் சொல்கிறது, பயமுறுத்தினாலும். உதவி கேட்கும் முன் முதல் வரியைப் படியுங்கள்.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "What does every Arduino sketch need?", ta: "ஒவ்வொரு Arduino ஸ்கெட்சிற்கும் என்ன தேவை?" },
        options: [
          { en: "A setup() and a loop() function", ta: "setup() மற்றும் loop() செயல்பாடு" },
          { en: "A Wi-Fi connection", ta: "Wi-Fi இணைப்பு" },
          { en: "A display screen", ta: "காட்சி திரை" },
        ],
        answer: 0,
        explanation: { en: "setup() runs once; loop() repeats forever — every sketch has both.", ta: "setup() ஒரு முறை; loop() எப்போதும் மீண்டும் — ஒவ்வொரு ஸ்கெட்சிற்கும் இரண்டும் உண்டு." },
      },
      {
        question: { en: "Your board doesn't show up under Tools → Port. What's the first thing to try?", ta: "Tools → Port-இல் உங்கள் போர்டு தெரியவில்லை. முதலில் என்ன முயற்சிக்க வேண்டும்?" },
        options: [
          { en: "Buy a new board", ta: "புதிய போர்டு வாங்குங்கள்" },
          { en: "Try a different USB cable", ta: "வேறு USB கேபிளை முயற்சிக்கவும்" },
          { en: "Reinstall Windows", ta: "Windows-ஐ மீண்டும் நிறுவவும்" },
        ],
        answer: 1,
        explanation: { en: "Many USB cables only carry power, not data — the classic first suspect.", ta: "பல USB கேபிள்கள் மின்சாரத்தை மட்டுமே கொண்டு செல்லும், டேட்டா அல்ல." },
      },
      {
        question: { en: "Where do you pick between \"Arduino Uno\" and \"ESP32 Dev Module\"?", ta: "\"Arduino Uno\" மற்றும் \"ESP32 Dev Module\" இடையே எங்கே தேர்வு செய்வது?" },
        options: [
          { en: "Tools → Board", ta: "Tools → Board" },
          { en: "File → Save", ta: "File → Save" },
          { en: "Edit → Undo", ta: "Edit → Undo" },
        ],
        answer: 0,
        explanation: { en: "Tools → Board tells the IDE which chip to compile for.", ta: "Tools → Board எந்த சிப்பிற்காக தொகுக்க வேண்டும் என்பதை IDE-க்கு கூறுகிறது." },
      },
    ],
  },

  /* ------------------------------------------------------------------ 9 */
  {
    slug: "arduino-programming",
    order: 9,
    title: { en: "Basic Arduino Programming", ta: "அடிப்படை Arduino நிரலாக்கம்" },
    subtitle: {
      en: "The four building blocks behind every sketch",
      ta: "ஒவ்வொரு ஸ்கெட்சின் பின்னாலும் உள்ள நான்கு அடிப்படை பகுதிகள்",
    },
    hero: "arduino-uno",
    duration: 10,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Code is just a list of instructions, read from top to bottom, one at a time.",
          ta: "குறியீடு என்பது மேலிருந்து கீழாக, ஒவ்வொன்றாகப் படிக்கப்படும் வழிமுறைகளின் பட்டியல்.",
        },
      },
      {
        type: "prose",
        text: {
          en: "Every sketch you'll write in this program — no matter how complex — is built from just four ideas: variables (remembering a value), functions (a named group of instructions), if statements (making a decision), and loops (repeating something). Learn these four and you can read almost any Arduino code you'll ever see.",
          ta: "இந்த திட்டத்தில் நீங்கள் எழுதும் ஒவ்வொரு ஸ்கெட்சும் — எவ்வளவு சிக்கலானதாக இருந்தாலும் — வெறும் நான்கு கருத்துகளில் கட்டமைக்கப்பட்டுள்ளது: மாறிகள், செயல்பாடுகள், if கூற்றுகள், மற்றும் சுழற்சிகள்.",
        },
      },
      {
        type: "heading",
        text: { en: "1. Variables — remembering a value", ta: "1. மாறிகள் — ஒரு மதிப்பை நினைவில் வைத்தல்" },
      },
      {
        type: "prose",
        text: {
          en: "A variable is a labelled box that holds a value your code can check or change later. You've already seen one: `const int LED_PIN = 2;` creates a box named LED_PIN holding the number 2.",
          ta: "மாறி என்பது ஒரு மதிப்பை வைத்திருக்கும் பெயரிடப்பட்ட பெட்டி. நீங்கள் ஏற்கனவே ஒன்றைப் பார்த்திருக்கிறீர்கள்: `const int LED_PIN = 2;`",
        },
      },
      {
        type: "code",
        filename: "variables.ino",
        content: `int distance = 0;       // whole numbers
float temperature = 0.0; // numbers with decimals
bool isDark = false;      // true or false only

// "const" means this value never changes after it's set
const int TRIG_PIN = 9;`,
      },
      {
        type: "heading",
        text: { en: "2. Functions — a named group of instructions", ta: "2. செயல்பாடுகள் — பெயரிடப்பட்ட வழிமுறைகளின் தொகுப்பு" },
      },
      {
        type: "prose",
        text: {
          en: "setup() and loop() are functions the Arduino IDE expects to find. You can also write your own — useful when you want to reuse the same steps more than once instead of copying and pasting them.",
          ta: "setup() மற்றும் loop() Arduino IDE எதிர்பார்க்கும் செயல்பாடுகள். நீங்களும் உங்கள் சொந்த செயல்பாடுகளை எழுதலாம்.",
        },
      },
      {
        type: "code",
        filename: "functions.ino",
        content: `void beepTwice() {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(100);
  digitalWrite(BUZZER_PIN, LOW);
  delay(100);
  digitalWrite(BUZZER_PIN, HIGH);
  delay(100);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  if (buttonPressed()) {
    beepTwice();   // call it whenever you need it
  }
}`,
      },
      {
        type: "heading",
        text: { en: "3. If statements — making a decision", ta: "3. If கூற்றுகள் — முடிவெடுத்தல்" },
      },
      {
        type: "prose",
        text: {
          en: "An if statement runs a block of code only when a condition is true. This is how a robot decides to turn instead of driving into a wall.",
          ta: "ஒரு நிபந்தனை உண்மையாக இருக்கும்போது மட்டுமே if கூற்று ஒரு குறியீடு தொகுதியை இயக்குகிறது.",
        },
      },
      {
        type: "code",
        filename: "conditions.ino",
        content: `int distance = readDistanceCm();

if (distance < 10) {
  stopMotors();
} else if (distance < 30) {
  slowDown();
} else {
  driveForward();
}`,
      },
      {
        type: "heading",
        text: { en: "4. Loops — repeating something", ta: "4. சுழற்சிகள் — ஒன்றை மீண்டும் செய்தல்" },
      },
      {
        type: "prose",
        text: {
          en: "loop() itself already repeats forever. A `for` loop repeats a fixed number of times inside it — handy for things like flashing an LED exactly five times.",
          ta: "loop() ஏற்கனவே எப்போதும் மீண்டும் நடக்கிறது. `for` சுழற்சி அதற்குள் ஒரு நிலையான எண்ணிக்கையில் மீண்டும் நடக்கிறது.",
        },
      },
      {
        type: "code",
        filename: "loops.ino",
        content: `for (int i = 0; i < 5; i++) {
  digitalWrite(LED_PIN, HIGH);
  delay(200);
  digitalWrite(LED_PIN, LOW);
  delay(200);
}
// i starts at 0, runs while i < 5, adds 1 each time — so this blinks 5 times`,
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "You don't need to memorise any of this. Every project in this program reuses the same handful of patterns — the more sketches you read and edit, the more familiar they become.",
          ta: "இதை மனப்பாடம் செய்ய தேவையில்லை. இந்த திட்டத்தில் உள்ள ஒவ்வொரு திட்டமும் அதே சில வடிவங்களை மீண்டும் பயன்படுத்துகிறது.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "What does a variable do?", ta: "ஒரு மாறி என்ன செய்கிறது?" },
        options: [
          { en: "Holds a value your code can check or change", ta: "உங்கள் குறியீடு சரிபார்க்கக்கூடிய மதிப்பை வைத்திருக்கிறது" },
          { en: "Uploads code to the board", ta: "போர்டுக்கு குறியீட்டை பதிவேற்றுகிறது" },
          { en: "Connects to Wi-Fi", ta: "Wi-Fi-உடன் இணைக்கிறது" },
        ],
        answer: 0,
        explanation: { en: "A variable is a labelled box for a value, like distance or isDark.", ta: "மாறி என்பது ஒரு மதிப்பிற்கான பெயரிடப்பட்ட பெட்டி." },
      },
      {
        question: { en: "When does the code inside an if statement run?", ta: "if கூற்றுக்குள் உள்ள குறியீடு எப்போது இயங்கும்?" },
        options: [
          { en: "Always, once per loop", ta: "எப்போதும், ஒரு சுழற்சிக்கு ஒரு முறை" },
          { en: "Only when its condition is true", ta: "அதன் நிபந்தனை உண்மையாக இருக்கும்போது மட்டும்" },
          { en: "Only during setup()", ta: "setup()-இன் போது மட்டும்" },
        ],
        answer: 1,
        explanation: { en: "if only runs its block when the condition evaluates to true.", ta: "நிபந்தனை உண்மையாக இருக்கும்போது மட்டுமே if அதன் தொகுதியை இயக்கும்." },
      },
      {
        question: { en: "In `for (int i = 0; i < 5; i++)`, how many times does the loop run?", ta: "`for (int i = 0; i < 5; i++)` இல், சுழற்சி எத்தனை முறை இயங்கும்?" },
        options: [
          { en: "4 times", ta: "4 முறை" },
          { en: "5 times", ta: "5 முறை" },
          { en: "Forever", ta: "எப்போதும்" },
        ],
        answer: 1,
        explanation: { en: "i goes 0,1,2,3,4 — five values — then stops once i is no longer less than 5.", ta: "i 0,1,2,3,4 ஆகச் செல்கிறது — ஐந்து மதிப்புகள்." },
      },
    ],
  },

  /* ----------------------------------------------------------------- 10 */
  {
    slug: "digital-analog-inputs",
    order: 10,
    title: { en: "Digital & Analog Inputs", ta: "டிஜிட்டல் & அனலாக் உள்ளீடுகள்" },
    subtitle: {
      en: "Buttons, dials and light — how the board reads the world",
      ta: "பொத்தான்கள், நாப்கள் மற்றும் ஒளி — போர்டு உலகை படிக்கும் விதம்",
    },
    hero: "potentiometer",
    duration: 11,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Every input is either a switch (on/off) or a dial (a range) — nothing else.",
          ta: "ஒவ்வொரு உள்ளீடும் ஒரு சுவிட்ச் (ஆன்/ஆஃப்) அல்லது ஒரு நாப் (ஒரு வரம்பு) — வேறு எதுவும் இல்லை.",
        },
      },
      {
        type: "prose",
        text: {
          en: "You already met digital and analog pins on the Arduino Uno lesson. This lesson puts real components on them: a button that's simply on or off, and two sensors — a potentiometer and an LDR — that report a smooth range of values.",
          ta: "Arduino Uno பாடத்தில் டிஜிட்டல் மற்றும் அனலாக் பின்களை ஏற்கனவே சந்தித்தீர்கள். இந்த பாடம் அவற்றில் உண்மையான பாகங்களை வைக்கிறது.",
        },
      },
      {
        type: "component",
        slug: "push-button",
        name: "Push Button",
        whatItIs: {
          en: "The simplest input component that exists — internally it's just two metal contacts that touch when you press it, and separate when you let go.",
          ta: "இருக்கும் மிக எளிய உள்ளீடு பாகம் — அழுத்தும்போது தொடும் இரண்டு உலோக தொடர்புகள், விட்டால் பிரியும்.",
        },
        example: {
          en: "The doorbell at your house, the power button on a TV remote, and every keyboard key are all push buttons underneath.",
          ta: "உங்கள் வீட்டு டோர்பெல், TV ரிமோட்டின் பவர் பொத்தான், கீபோர்டின் ஒவ்வொரு விசையும் உள்ளுக்குள் புஷ் பட்டன்கள்தான்.",
        },
        pins: ["Leg A", "Leg B"],
        wiring: {
          controller: "Arduino Uno",
          controllerPins: ["5V", "GND", "D2"],
          device: "Push Button",
          devicePins: ["Leg A", "Leg B"],
          links: [
            { from: "GND", to: "Leg A", color: "ground" },
            { from: "D2", to: "Leg B", color: "signal" },
          ],
        },
        code: {
          filename: "button.ino",
          content: `const int BUTTON_PIN = 2;

void setup() {
  Serial.begin(9600);
  // INPUT_PULLUP means the pin reads HIGH by default,
  // and drops to LOW when the button is pressed — no
  // extra resistor needed.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  bool pressed = digitalRead(BUTTON_PIN) == LOW;
  Serial.println(pressed ? "Pressed" : "Released");
  delay(100);
}`,
        },
      },
      {
        type: "component",
        slug: "potentiometer",
        name: "Potentiometer",
        whatItIs: {
          en: "A knob with three legs. The outer two connect to power and ground; the middle leg (the wiper) outputs a voltage between them that changes as you turn it.",
          ta: "மூன்று கால்கள் கொண்ட ஒரு நாப். வெளிப் பக்க இரண்டும் பவர் மற்றும் கிரவுண்டுடன் இணைகின்றன; நடு கால் (வைப்பர்) சுழற்றும்போது மாறும் மின்னழுத்தத்தை வெளியிடுகிறது.",
        },
        example: {
          en: "The volume knob on a speaker and the brightness dial on a lamp are both potentiometers.",
          ta: "ஸ்பீக்கரின் ஒலி அளவு நாப் மற்றும் விளக்கின் பிரகாசம் நாப் இரண்டும் பொட்டென்ஷியோமீட்டர்கள்.",
        },
        pins: ["Left (5V)", "Wiper (signal)", "Right (GND)"],
        wiring: {
          controller: "Arduino Uno",
          controllerPins: ["5V", "GND", "A0"],
          device: "Potentiometer",
          devicePins: ["Left", "Wiper", "Right"],
          links: [
            { from: "5V", to: "Left", color: "power" },
            { from: "GND", to: "Right", color: "ground" },
            { from: "A0", to: "Wiper", color: "signal" },
          ],
        },
        code: {
          filename: "potentiometer.ino",
          content: `const int POT_PIN = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(POT_PIN);      // 0 to 1023
  int angle = map(raw, 0, 1023, 0, 180); // rescale to 0-180
  Serial.println(angle);
  delay(100);
}`,
        },
      },
      {
        type: "component",
        slug: "ldr",
        name: "LDR (Light Sensor)",
        whatItIs: {
          en: "A resistor whose resistance drops as light increases. Paired with a fixed resistor, it forms a voltage divider an analog pin can read.",
          ta: "ஒளி அதிகரிக்கும்போது எதிர்ப்பு குறையும் ஒரு எதிர்ப்பான். ஒரு நிலையான எதிர்ப்பானுடன் இணைந்து, அனலாக் பின் படிக்கக்கூடிய மின்னழுத்த பிரிவை உருவாக்குகிறது.",
        },
        example: {
          en: "Streetlights that switch on automatically at dusk use exactly this sensor.",
          ta: "மாலையில் தானாக ஆன் ஆகும் தெரு விளக்குகள் சரியாக இந்த சென்சாரைப் பயன்படுத்துகின்றன.",
        },
        pins: ["Leg 1", "Leg 2"],
        wiring: {
          controller: "Arduino Uno",
          controllerPins: ["5V", "GND", "A0"],
          device: "LDR + Resistor",
          devicePins: ["Leg 1", "Leg 2"],
          links: [
            { from: "5V", to: "Leg 1", color: "power" },
            { from: "A0", to: "Leg 2", color: "signal" },
            { from: "GND", to: "Leg 2", color: "ground" },
          ],
        },
        code: {
          filename: "ldr.ino",
          content: `const int LDR_PIN = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int light = analogRead(LDR_PIN); // higher = brighter
  Serial.println(light);
  delay(200);
}`,
        },
      },
      {
        type: "heading",
        text: { en: "Applied example: Automatic Night Light", ta: "பயன்பாட்டு உதாரணம்: தானியங்கி இரவு விளக்கு" },
      },
      {
        type: "prose",
        text: {
          en: "Combine the LDR with an LED and you've built exactly what's inside a streetlight: read the brightness, decide if it's dark, switch the light on or off accordingly.",
          ta: "LDR-ஐ ஒரு LED-உடன் இணைத்தால், தெரு விளக்கில் இருப்பதை சரியாக கட்டமைத்துவிட்டீர்கள்.",
        },
      },
      {
        type: "code",
        filename: "automatic_light.ino",
        content: `const int LDR_PIN = A0;
const int LED_PIN = 8;
const int DARK_THRESHOLD = 400; // tune this to your room

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int light = analogRead(LDR_PIN);

  if (light < DARK_THRESHOLD) {
    digitalWrite(LED_PIN, HIGH); // it's dark — turn on
  } else {
    digitalWrite(LED_PIN, LOW);  // it's bright — turn off
  }
}`,
      },
    ],
    quiz: [
      {
        question: { en: "Why does INPUT_PULLUP mean you don't need an extra resistor for a button?", ta: "INPUT_PULLUP ஏன் பொத்தானுக்கு கூடுதல் எதிர்ப்பான் தேவையில்லை என்று அர்த்தம்?" },
        options: [
          { en: "It disables the pin", ta: "இது பின்னை முடக்குகிறது" },
          { en: "The board provides the resistor internally", ta: "போர்டு உள்நாட்டில் எதிர்ப்பானை வழங்குகிறது" },
          { en: "Buttons never need resistors", ta: "பொத்தான்களுக்கு எதிர்ப்பான் தேவையே இல்லை" },
        ],
        answer: 1,
        explanation: { en: "INPUT_PULLUP switches on a resistor already built into the chip.", ta: "INPUT_PULLUP சிப்பில் ஏற்கனவே உள்ள எதிர்ப்பானை இயக்குகிறது." },
      },
      {
        question: { en: "What does a potentiometer's middle pin (the wiper) do?", ta: "பொட்டென்ஷியோமீட்டரின் நடு பின் (வைப்பர்) என்ன செய்கிறது?" },
        options: [
          { en: "Always outputs 0V", ta: "எப்போதும் 0V வெளியிடும்" },
          { en: "Outputs a voltage that changes as you turn the knob", ta: "நாப்பை திருப்பும்போது மாறும் மின்னழுத்தத்தை வெளியிடும்" },
          { en: "Connects directly to GND only", ta: "GND-உடன் மட்டும் நேரடியாக இணைகிறது" },
        ],
        answer: 1,
        explanation: { en: "The wiper's voltage depends on the knob's rotation, which is what analogRead() picks up.", ta: "வைப்பரின் மின்னழுத்தம் நாப்பின் சுழற்சியைப் பொறுத்தது." },
      },
      {
        question: { en: "In the Automatic Night Light code, what happens when the room gets dark?", ta: "தானியங்கி இரவு விளக்கு குறியீட்டில், அறை இருட்டாகும்போது என்ன நடக்கும்?" },
        options: [
          { en: "The LDR value goes below the threshold and the LED turns on", ta: "LDR மதிப்பு வரம்பிற்குக் கீழே சென்று LED ஆன் ஆகும்" },
          { en: "The Arduino turns off", ta: "Arduino ஆஃப் ஆகும்" },
          { en: "Nothing — LDRs don't detect darkness", ta: "எதுவும் இல்லை — LDR-கள் இருட்டை கண்டறியாது" },
        ],
        answer: 0,
        explanation: { en: "Lower light reading = darker room, which triggers the LED via the if statement.", ta: "குறைந்த ஒளி அளவீடு = இருண்ட அறை, இது if கூற்று வழியாக LED-ஐ இயக்குகிறது." },
      },
    ],
  },

  /* ----------------------------------------------------------------- 11 */
  {
    slug: "motion-distance-sensors",
    order: 11,
    title: { en: "Motion & Distance Sensors", ta: "இயக்க & தூர சென்சார்கள்" },
    subtitle: {
      en: "How a robot knows what's near it, without touching it",
      ta: "தொடாமலேயே ரோபோ அருகில் உள்ளதை அறியும் விதம்",
    },
    hero: "ultrasonic-sensor",
    duration: 12,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Bats find their way in total darkness using sound. The HC-SR04 does exactly the same trick.",
          ta: "வௌவால்கள் முழு இருட்டிலும் ஒலியைப் பயன்படுத்தி வழி கண்டுபிடிக்கின்றன. HC-SR04 சரியாக அதே தந்திரத்தைச் செய்கிறது.",
        },
      },
      {
        type: "component",
        slug: "ultrasonic-sensor",
        name: "HC-SR04 Ultrasonic Sensor",
        whatItIs: {
          en: "Sends a burst of sound too high-pitched for humans to hear, then times how long the echo takes to bounce back. Since sound travels at a known speed, that time converts directly into distance.",
          ta: "மனிதர்கள் கேட்க முடியாத அளவு உயர் ஒலியை அனுப்பி, எதிரொலி திரும்ப வரும் நேரத்தை அளக்கிறது. ஒலியின் வேகம் தெரிந்திருப்பதால், அந்த நேரம் நேரடியாக தூரமாக மாறுகிறது.",
        },
        example: {
          en: "Car parking sensors that beep faster as you get closer to a wall use this exact principle.",
          ta: "சுவரை நெருங்கும்போது வேகமாக ஒலிக்கும் கார் பார்க்கிங் சென்சார்கள் இதே கொள்கையைப் பயன்படுத்துகின்றன.",
        },
        pins: ["VCC", "Trig", "Echo", "GND"],
        wiring: {
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
        code: {
          filename: "ultrasonic.ino",
          content: `const int TRIG_PIN = 5;
const int ECHO_PIN = 18;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

long readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2; // speed of sound -> cm
}

void loop() {
  Serial.print(readDistanceCm());
  Serial.println(" cm");
  delay(200);
}`,
        },
      },
      {
        type: "component",
        slug: "pir-sensor",
        name: "PIR Motion Sensor",
        whatItIs: {
          en: "PIR stands for Passive InfraRed. Warm bodies — people, animals — give off infrared heat, and this sensor triggers when that heat pattern suddenly changes nearby.",
          ta: "PIR என்றால் Passive InfraRed. வெப்பமான உடல்கள் அகச்சிவப்பு வெப்பத்தை வெளியிடுகின்றன, அந்த வெப்ப முறை திடீரென மாறும்போது இந்த சென்சார் இயங்குகிறது.",
        },
        example: {
          en: "Security lights that switch on the moment you walk up a driveway use a PIR sensor.",
          ta: "நீங்கள் நடைபாதையில் நடக்கும் தருணத்தில் ஆன் ஆகும் பாதுகாப்பு விளக்குகள் PIR சென்சாரைப் பயன்படுத்துகின்றன.",
        },
        pins: ["VCC", "OUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO27"],
          device: "PIR Sensor",
          devicePins: ["VCC", "OUT", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO27", to: "OUT", color: "signal" },
          ],
        },
        code: {
          filename: "pir.ino",
          content: `const int PIR_PIN = 27;

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    Serial.println("Motion detected!");
  }
  delay(200);
}`,
        },
      },
      {
        type: "component",
        slug: "ir-sensor",
        name: "IR Obstacle Sensor",
        whatItIs: {
          en: "Shines an infrared LED forward and watches for its own light bouncing back with a receiver. Simple, fast, and short-range — closer to \"is something there?\" than a precise distance reading.",
          ta: "முன்னோக்கி அகச்சிவப்பு LED-ஐ பிரகாசிக்க வைத்து, அதன் சொந்த ஒளி திரும்பி வருவதை ஒரு ரிசீவர் மூலம் கண்காணிக்கிறது.",
        },
        example: {
          en: "The line a line-follower robot tracks on the floor is read by exactly this kind of sensor.",
          ta: "லைன்-ஃபாலோவர் ரோபோ தரையில் பின்தொடரும் கோடு சரியாக இந்த வகை சென்சாரால் படிக்கப்படுகிறது.",
        },
        pins: ["VCC", "OUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO26"],
          device: "IR Sensor",
          devicePins: ["VCC", "OUT", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO26", to: "OUT", color: "signal" },
          ],
        },
        code: {
          filename: "ir_obstacle.ino",
          content: `const int IR_PIN = 26;

void setup() {
  Serial.begin(115200);
  pinMode(IR_PIN, INPUT);
}

void loop() {
  // Most IR obstacle modules pull LOW when something is detected
  bool blocked = digitalRead(IR_PIN) == LOW;
  Serial.println(blocked ? "Obstacle!" : "Clear");
  delay(100);
}`,
        },
      },
      {
        type: "heading",
        text: { en: "Applied example: Distance Meter", ta: "பயன்பாட்டு உதாரணம்: தூர அளவி" },
      },
      {
        type: "prose",
        text: {
          en: "The ultrasonic code above is already a working distance meter — open the Serial Monitor after uploading and watch the numbers change as you move your hand toward the sensor.",
          ta: "மேலே உள்ள அல்ட்ராசோனிக் குறியீடு ஏற்கனவே செயல்படும் தூர அளவி — பதிவேற்றிய பிறகு Serial Monitor-ஐ திறந்து உங்கள் கையை நகர்த்தும்போது எண்கள் மாறுவதைப் பாருங்கள்.",
        },
      },
      {
        type: "heading",
        text: { en: "Applied example: Motion Detector Alarm", ta: "பயன்பாட்டு உதாரணம்: இயக்க கண்டறிதல் அலாரம்" },
      },
      {
        type: "code",
        filename: "motion_alarm.ino",
        content: `const int PIR_PIN = 27;
const int BUZZER_PIN = 4;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    digitalWrite(BUZZER_PIN, HIGH); // sound the alarm
  } else {
    digitalWrite(BUZZER_PIN, LOW);
  }
}`,
      },
    ],
    quiz: [
      {
        question: { en: "How does the HC-SR04 measure distance?", ta: "HC-SR04 தூரத்தை எவ்வாறு அளக்கிறது?" },
        options: [
          { en: "It weighs the object", ta: "அது பொருளின் எடையை அளக்கிறது" },
          { en: "It times how long a sound echo takes to return", ta: "ஒலி எதிரொலி திரும்ப வரும் நேரத்தை அளக்கிறது" },
          { en: "It uses a camera", ta: "அது கேமராவைப் பயன்படுத்துகிறது" },
        ],
        answer: 1,
        explanation: { en: "Sound travels at a known speed, so echo time converts directly to distance.", ta: "ஒலி ஒரு அறியப்பட்ட வேகத்தில் பயணிக்கிறது, எனவே எதிரொலி நேரம் நேரடியாக தூரமாக மாறுகிறது." },
      },
      {
        question: { en: "What does PIR stand for?", ta: "PIR என்றால் என்ன?" },
        options: [
          { en: "Passive InfraRed", ta: "Passive InfraRed" },
          { en: "Power Input Regulator", ta: "Power Input Regulator" },
          { en: "Precise Impact Reader", ta: "Precise Impact Reader" },
        ],
        answer: 0,
        explanation: { en: "PIR sensors detect the infrared heat given off by warm bodies.", ta: "PIR சென்சார்கள் வெப்பமான உடல்கள் வெளியிடும் அகச்சிவப்பு வெப்பத்தை கண்டறிகின்றன." },
      },
      {
        question: { en: "Which sensor would a line-follower robot use to track a line on the floor?", ta: "தரையில் ஒரு கோட்டை பின்தொடர லைன்-ஃபாலோவர் ரோபோ எந்த சென்சாரைப் பயன்படுத்தும்?" },
        options: [
          { en: "PIR motion sensor", ta: "PIR இயக்க சென்சார்" },
          { en: "IR obstacle/reflectance sensor", ta: "IR தடை/பிரதிபலிப்பு சென்சார்" },
          { en: "Ultrasonic sensor", ta: "அல்ட்ராசோனிக் சென்சார்" },
        ],
        answer: 1,
        explanation: { en: "IR sensors reading reflected light are ideal for detecting a line's contrast.", ta: "பிரதிபலிக்கும் ஒளியைப் படிக்கும் IR சென்சார்கள் ஒரு கோட்டின் மாறுபாட்டைக் கண்டறிய ஏற்றவை." },
      },
    ],
  },

  /* ----------------------------------------------------------------- 12 */
  {
    slug: "environmental-sensors",
    order: 12,
    title: { en: "Environmental Sensors", ta: "சுற்றுச்சூழல் சென்சார்கள்" },
    subtitle: {
      en: "Weather, gas, fire, water — reading the world around the board",
      ta: "வானிலை, வாயு, தீ, நீர் — போர்டைச் சுற்றியுள்ள உலகை படித்தல்",
    },
    hero: "temperature-sensor",
    duration: 12,
    blocks: [
      {
        type: "hook",
        text: {
          en: "A weather station, a gas alarm and a fire alarm are the same idea repeated: read a condition, compare it to a safe range, react.",
          ta: "வானிலை நிலையம், வாயு எச்சரிக்கை, தீ எச்சரிக்கை — மூன்றும் ஒரே கருத்து மீண்டும் மீண்டும்: ஒரு நிலையை படி, பாதுகாப்பான வரம்புடன் ஒப்பிடு, பதிலளி.",
        },
      },
      {
        type: "component",
        slug: "temperature-sensor",
        name: "DHT11 (Temperature & Humidity)",
        whatItIs: {
          en: "Reads both temperature and humidity from one small module and sends both values over a single wire using a specific timing pattern the DHT library handles for you.",
          ta: "ஒரு சிறிய மாடியூலிலிருந்து வெப்பநிலை மற்றும் ஈரப்பதம் இரண்டையும் படித்து, ஒரே வயர் வழியாக அனுப்புகிறது.",
        },
        example: {
          en: "The temperature and humidity reading on a smart home app comes from a sensor exactly like this.",
          ta: "ஸ்மார்ட் ஹோம் ஆப்பில் உள்ள வெப்பநிலை மற்றும் ஈரப்பத அளவீடு சரியாக இது போன்ற ஒரு சென்சாரிலிருந்து வருகிறது.",
        },
        pins: ["VCC", "DATA", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["3.3V", "GND", "GPIO4"],
          device: "DHT11",
          devicePins: ["VCC", "DATA", "GND"],
          links: [
            { from: "3.3V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO4", to: "DATA", color: "signal" },
          ],
        },
        code: {
          filename: "dht11.ino",
          content: `#include <DHT.h>   // Library: "DHT sensor library" by Adafruit

#define DHT_PIN 4
DHT dht(DHT_PIN, DHT11);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature(); // Celsius
  float hum = dht.readHumidity();     // %

  Serial.print("Temp: "); Serial.print(temp);
  Serial.print("C  Humidity: "); Serial.print(hum);
  Serial.println("%");
  delay(2000); // DHT11 needs ~2s between readings
}`,
        },
      },
      {
        type: "component",
        slug: "gas-sensor",
        name: "MQ Gas Sensor",
        whatItIs: {
          en: "Contains a material whose resistance changes when it absorbs gas molecules — smoke, LPG, or carbon monoxide depending on the exact MQ model. The higher the analog reading, the more gas is present.",
          ta: "வாயு மூலக்கூறுகளை உறிஞ்சும்போது எதிர்ப்பு மாறும் ஒரு பொருளைக் கொண்டுள்ளது — புகை, LPG, அல்லது கார்பன் மோனாக்சைடு.",
        },
        example: {
          en: "The gas leak alarm in a kitchen uses an MQ-series sensor to detect LPG in the air.",
          ta: "சமையலறையில் உள்ள வாயு கசிவு எச்சரிக்கை காற்றில் LPG-ஐ கண்டறிய MQ-தொடர் சென்சாரைப் பயன்படுத்துகிறது.",
        },
        pins: ["VCC", "AOUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO34"],
          device: "MQ-2 Gas Sensor",
          devicePins: ["VCC", "AOUT", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO34", to: "AOUT", color: "signal" },
          ],
        },
        code: {
          filename: "gas_sensor.ino",
          content: `const int GAS_PIN = 34;
const int SAFE_LIMIT = 300; // tune after testing your sensor

void setup() {
  Serial.begin(115200);
}

void loop() {
  int level = analogRead(GAS_PIN);
  Serial.println(level);
  if (level > SAFE_LIMIT) {
    Serial.println("WARNING: gas detected!");
  }
  delay(500);
}`,
        },
      },
      {
        type: "component",
        slug: "flame-sensor",
        name: "Flame Sensor",
        whatItIs: {
          en: "Tuned to detect the specific infrared wavelength a flame gives off, which sunlight and ordinary bulbs mostly don't — so it reacts specifically to fire.",
          ta: "தீ வெளியிடும் குறிப்பிட்ட அகச்சிவப்பு அலைநீளத்தை கண்டறிய டியூன் செய்யப்பட்டுள்ளது.",
        },
        example: {
          en: "Industrial fire-suppression systems use flame sensors to trigger sprinklers within seconds.",
          ta: "தொழில்துறை தீ அணைப்பு அமைப்புகள் சில வினாடிகளுக்குள் ஸ்பிரிங்க்ளர்களை இயக்க தீ சென்சார்களைப் பயன்படுத்துகின்றன.",
        },
        pins: ["VCC", "DOUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO32"],
          device: "Flame Sensor",
          devicePins: ["VCC", "DOUT", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO32", to: "DOUT", color: "signal" },
          ],
        },
        code: {
          filename: "flame_sensor.ino",
          content: `const int FLAME_PIN = 32;

void setup() {
  Serial.begin(115200);
  pinMode(FLAME_PIN, INPUT);
}

void loop() {
  // Most flame modules pull LOW when flame is detected
  if (digitalRead(FLAME_PIN) == LOW) {
    Serial.println("FIRE DETECTED!");
  }
  delay(200);
}`,
        },
      },
      {
        type: "component",
        slug: "soil-moisture-sensor",
        name: "Soil Moisture Sensor",
        whatItIs: {
          en: "Two exposed probes measure how easily electricity flows through the soil between them — wet soil conducts far better than dry soil.",
          ta: "இரண்டு வெளிப்படையான ஆய்வுகள் மண் வழியாக மின்சாரம் எவ்வளவு எளிதாக பாய்கிறது என்பதை அளக்கின்றன.",
        },
        example: {
          en: "Automatic plant-watering systems check this reading before deciding to turn on a water pump.",
          ta: "தானியங்கி தாவர நீர்ப்பாசன அமைப்புகள் நீர் பம்பை இயக்குவதற்கு முன் இந்த அளவீட்டைச் சரிபார்க்கின்றன.",
        },
        pins: ["VCC", "AOUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["3.3V", "GND", "GPIO35"],
          device: "Soil Moisture Sensor",
          devicePins: ["VCC", "AOUT", "GND"],
          links: [
            { from: "3.3V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO35", to: "AOUT", color: "signal" },
          ],
        },
        code: {
          filename: "soil_moisture.ino",
          content: `const int SOIL_PIN = 35;

void setup() {
  Serial.begin(115200);
}

void loop() {
  int moisture = analogRead(SOIL_PIN); // lower = wetter, typically
  Serial.println(moisture);
  delay(1000);
}`,
        },
      },
      {
        type: "component",
        slug: "rain-sensor",
        name: "Rain Sensor",
        whatItIs: {
          en: "A grid of exposed copper traces on a board — water droplets bridge the gaps between them, changing the resistance the board reads.",
          ta: "ஒரு பலகையில் வெளிப்படையான தாமிர பாதைகள் — நீர் துளிகள் அவற்றுக்கிடையேயான இடைவெளிகளை இணைத்து எதிர்ப்பை மாற்றுகின்றன.",
        },
        example: {
          en: "Automatic car wipers and smart clotheslines that retract before rain both start with a sensor like this.",
          ta: "தானியங்கி கார் ஒற்றர் மற்றும் மழைக்கு முன் திரும்பும் ஸ்மார்ட் துணி காயவைப்பு கயிறு இரண்டும் இது போன்ற சென்சாரில் தொடங்குகின்றன.",
        },
        pins: ["VCC", "AOUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO33"],
          device: "Rain Sensor",
          devicePins: ["VCC", "AOUT", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO33", to: "AOUT", color: "signal" },
          ],
        },
        code: {
          filename: "rain_sensor.ino",
          content: `const int RAIN_PIN = 33;

void setup() {
  Serial.begin(115200);
}

void loop() {
  int reading = analogRead(RAIN_PIN); // lower = wetter
  Serial.println(reading < 2000 ? "Raining" : "Dry");
  delay(500);
}`,
        },
      },
      {
        type: "component",
        slug: "sound-sensor",
        name: "Sound Sensor",
        whatItIs: {
          en: "A small microphone paired with a circuit that outputs a digital pulse whenever the sound level crosses a threshold you can adjust with the onboard screw.",
          ta: "ஒரு சிறிய மைக்ரோஃபோன் ஒரு சுற்றுடன் இணைந்து, ஒலி அளவு நீங்கள் சரிசெய்யக்கூடிய வரம்பைக் கடக்கும்போது டிஜிட்டல் துடிப்பை வெளியிடுகிறது.",
        },
        example: {
          en: "\"Clap to turn off the lights\" gadgets use exactly this kind of sensor.",
          ta: "\"கைதட்டி விளக்கை அணையுங்கள்\" கருவிகள் சரியாக இந்த வகை சென்சாரைப் பயன்படுத்துகின்றன.",
        },
        pins: ["VCC", "DOUT", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO25"],
          device: "Sound Sensor",
          devicePins: ["VCC", "DOUT", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO25", to: "DOUT", color: "signal" },
          ],
        },
        code: {
          filename: "sound_sensor.ino",
          content: `const int SOUND_PIN = 25;

void setup() {
  Serial.begin(115200);
  pinMode(SOUND_PIN, INPUT);
}

void loop() {
  if (digitalRead(SOUND_PIN) == HIGH) {
    Serial.println("Loud sound detected!");
  }
  delay(50);
}`,
        },
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "Notice the pattern repeating across every sensor on this page: read a value, compare it to a threshold, decide. That's the entire logic behind a weather station, a gas alarm, and a rain-warning system.",
          ta: "இந்த பக்கத்தில் உள்ள ஒவ்வொரு சென்சாரிலும் மீண்டும் வரும் வடிவத்தைக் கவனியுங்கள்: ஒரு மதிப்பை படி, ஒரு வரம்புடன் ஒப்பிடு, முடிவெடு.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "What two things does the DHT11 measure?", ta: "DHT11 எந்த இரண்டு விஷயங்களை அளக்கிறது?" },
        options: [
          { en: "Distance and light", ta: "தூரம் மற்றும் ஒளி" },
          { en: "Temperature and humidity", ta: "வெப்பநிலை மற்றும் ஈரப்பதம்" },
          { en: "Sound and motion", ta: "ஒலி மற்றும் இயக்கம்" },
        ],
        answer: 1,
        explanation: { en: "DHT11 reads both temperature and humidity from one module.", ta: "DHT11 ஒரே மாடியூலிலிருந்து வெப்பநிலை மற்றும் ஈரப்பதம் இரண்டையும் படிக்கிறது." },
      },
      {
        question: { en: "What does an MQ gas sensor actually detect?", ta: "MQ வாயு சென்சார் உண்மையில் எதை கண்டறிகிறது?" },
        options: [
          { en: "Light intensity", ta: "ஒளி தீவிரம்" },
          { en: "A change in resistance caused by absorbed gas", ta: "உறிஞ்சப்பட்ட வாயுவால் ஏற்படும் எதிர்ப்பு மாற்றம்" },
          { en: "Sound volume", ta: "ஒலி அளவு" },
        ],
        answer: 1,
        explanation: { en: "The sensing material's resistance shifts as it absorbs gas molecules.", ta: "உணரும் பொருளின் எதிர்ப்பு வாயு மூலக்கூறுகளை உறிஞ்சும்போது மாறுகிறது." },
      },
      {
        question: { en: "A soil moisture sensor works by measuring what?", ta: "மண் ஈரப்பத சென்சார் எதை அளந்து செயல்படுகிறது?" },
        options: [
          { en: "Temperature of the soil", ta: "மண்ணின் வெப்பநிலை" },
          { en: "How easily electricity flows between two probes in the soil", ta: "மண்ணில் உள்ள இரு ஆய்வுகளுக்கிடையே மின்சாரம் எவ்வளவு எளிதாக பாய்கிறது" },
          { en: "The colour of the soil", ta: "மண்ணின் நிறம்" },
        ],
        answer: 1,
        explanation: { en: "Wet soil conducts electricity much better than dry soil.", ta: "ஈரமான மண் உலர்ந்த மண்ணை விட மின்சாரத்தை நன்றாக கடத்துகிறது." },
      },
    ],
  },

  /* ----------------------------------------------------------------- 13 */
  {
    slug: "outputs-actuators",
    order: 13,
    title: { en: "Outputs & Actuators", ta: "வெளியீடுகள் & ஆக்சுவேட்டர்கள்" },
    subtitle: {
      en: "Turning a decision into light, sound and motion",
      ta: "ஒரு முடிவை ஒளி, ஒலி மற்றும் இயக்கமாக மாற்றுதல்",
    },
    hero: "servo-motor",
    duration: 13,
    blocks: [
      {
        type: "hook",
        text: {
          en: "Sensors give a robot senses. Actuators are how it actually does something about what it senses.",
          ta: "சென்சார்கள் ரோபோவுக்கு உணர்வுகளைத் தருகின்றன. ஆக்சுவேட்டர்கள் அது உணர்வதைப் பற்றி உண்மையில் ஏதாவது செய்யும் விதம்.",
        },
      },
      {
        type: "component",
        slug: "rgb-led",
        name: "RGB LED",
        whatItIs: {
          en: "Three LEDs — red, green and blue — packed into one bulb, each with its own pin. Mixing their brightness with PWM produces almost any colour, the same way a screen's pixels do.",
          ta: "சிவப்பு, பச்சை, நீலம் ஆகிய மூன்று LED-கள் ஒரே பல்பில், ஒவ்வொன்றுக்கும் தனி பின். PWM மூலம் அவற்றின் பிரகாசத்தை கலப்பது எந்த நிறத்தையும் உருவாக்குகிறது.",
        },
        example: {
          en: "Smart bulbs that change colour from a phone app are built from the same red-green-blue mixing idea.",
          ta: "ஃபோன் ஆப்பிலிருந்து நிறத்தை மாற்றும் ஸ்மார்ட் பல்புகள் அதே சிவப்பு-பச்சை-நீலம் கலவை கருத்தில் கட்டமைக்கப்பட்டுள்ளன.",
        },
        pins: ["R", "G", "B", "GND (common cathode)"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["GPIO25", "GPIO26", "GPIO27", "GND"],
          device: "RGB LED",
          devicePins: ["R", "G", "B", "GND"],
          links: [
            { from: "GPIO25", to: "R", color: "signal" },
            { from: "GPIO26", to: "G", color: "signal2" },
            { from: "GPIO27", to: "B", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
          ],
        },
        code: {
          filename: "rgb_led.ino",
          content: `const int R_PIN = 25, G_PIN = 26, B_PIN = 27;

void setup() {
  pinMode(R_PIN, OUTPUT);
  pinMode(G_PIN, OUTPUT);
  pinMode(B_PIN, OUTPUT);
}

void setColor(int r, int g, int b) { // each 0-255
  analogWrite(R_PIN, r);
  analogWrite(G_PIN, g);
  analogWrite(B_PIN, b);
}

void loop() {
  setColor(255, 0, 0); delay(500); // red
  setColor(0, 255, 0); delay(500); // green
  setColor(0, 0, 255); delay(500); // blue
}`,
        },
      },
      {
        type: "component",
        slug: "buzzer",
        name: "Buzzer",
        whatItIs: {
          en: "A piezo disc that vibrates and produces sound when you apply voltage — an \"active\" buzzer just needs HIGH/LOW, while a \"passive\" one needs a tone() frequency to sing at all.",
          ta: "மின்னழுத்தம் கொடுக்கும்போது அதிர்ந்து ஒலியை உருவாக்கும் ஒரு பீசோ வட்டு.",
        },
        example: {
          en: "The beep your microwave makes when the timer ends is a buzzer exactly like this one.",
          ta: "உங்கள் மைக்ரோவேவ் டைமர் முடியும்போது எழுப்பும் பீப் ஒலி இது போன்ற ஒரு பஸர்தான்.",
        },
        pins: ["+", "−"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["GPIO4", "GND"],
          device: "Buzzer",
          devicePins: ["+", "−"],
          links: [
            { from: "GPIO4", to: "+", color: "signal" },
            { from: "GND", to: "−", color: "ground" },
          ],
        },
        code: {
          filename: "buzzer.ino",
          content: `const int BUZZER_PIN = 4;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(200);
  digitalWrite(BUZZER_PIN, LOW);
  delay(800);
}`,
        },
      },
      {
        type: "component",
        slug: "servo-motor",
        name: "Servo Motor",
        whatItIs: {
          en: "A motor with built-in electronics that turns to a specific angle (usually 0°–180°) and holds it — you tell it where to point, not how fast to spin.",
          ta: "ஒரு குறிப்பிட்ட கோணத்திற்கு (பொதுவாக 0°–180°) திரும்பி அதை வைத்திருக்கும் உள்ளமைக்கப்பட்ட எலக்ட்ரானிக்ஸ் கொண்ட மோட்டார்.",
        },
        example: {
          en: "The steering mechanism in an RC car and a robot arm's joints both use servo motors.",
          ta: "RC காரின் திசைமாற்றி பொறிமுறை மற்றும் ரோபோ கையின் மூட்டுகள் இரண்டும் சர்வோ மோட்டார்களைப் பயன்படுத்துகின்றன.",
        },
        pins: ["Signal", "VCC", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["GPIO13", "5V", "GND"],
          device: "Servo Motor",
          devicePins: ["Signal", "VCC", "GND"],
          links: [
            { from: "GPIO13", to: "Signal", color: "signal" },
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
          ],
        },
        code: {
          filename: "servo.ino",
          content: `#include <ESP32Servo.h>

Servo myServo;

void setup() {
  myServo.attach(13);
}

void loop() {
  myServo.write(0);   delay(1000); // point to 0 degrees
  myServo.write(90);  delay(1000); // point to 90 degrees
  myServo.write(180); delay(1000); // point to 180 degrees
}`,
        },
      },
      {
        type: "component",
        slug: "dc-motor",
        name: "DC Motor + L298N Driver",
        whatItIs: {
          en: "A DC motor just spins continuously — it can't take direction commands from a tiny GPIO pin, which can't supply enough current. The L298N driver sits in between: your board tells the driver which way and how fast, and the driver supplies the real current from a separate battery.",
          ta: "DC மோட்டார் தொடர்ந்து சுழல்கிறது — சிறிய GPIO பின் அதிக மின்னோட்டம் வழங்க முடியாது. L298N டிரைவர் இடையில் நிற்கிறது.",
        },
        example: {
          en: "Every wheeled robot in this program — line followers, obstacle avoiders — drives its wheels through a motor driver exactly like this.",
          ta: "இந்த திட்டத்தில் உள்ள ஒவ்வொரு சக்கர ரோபோவும் இது போன்ற ஒரு மோட்டார் டிரைவர் மூலம் அதன் சக்கரங்களை இயக்குகிறது.",
        },
        pins: ["IN1", "IN2", "ENA", "GND", "12V"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["GPIO14", "GPIO12", "GPIO27", "GND"],
          device: "L298N → Motor",
          devicePins: ["IN1", "IN2", "ENA", "GND"],
          links: [
            { from: "GPIO14", to: "IN1", color: "signal" },
            { from: "GPIO12", to: "IN2", color: "signal2" },
            { from: "GPIO27", to: "ENA", color: "signal" },
            { from: "GND", to: "GND", color: "ground" },
          ],
        },
        code: {
          filename: "dc_motor.ino",
          content: `const int IN1 = 14, IN2 = 12, ENA = 27;

void setup() {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);
}

void driveForward(int speed) { // speed 0-255
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, speed);
}

void stopMotor() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
}

void loop() {
  driveForward(200);
  delay(2000);
  stopMotor();
  delay(2000);
}`,
        },
      },
      {
        type: "component",
        slug: "stepper-motor",
        name: "Stepper Motor",
        whatItIs: {
          en: "Instead of spinning freely, a stepper moves in exact, repeatable steps (often 1.8° each) — send it 200 steps and it turns exactly one full rotation, every time.",
          ta: "சுதந்திரமாக சுழலாமல், ஸ்டெப்பர் துல்லியமான, மீண்டும் நிகழக்கூடிய படிகளில் நகர்கிறது (பெரும்பாலும் ஒவ்வொன்றும் 1.8°).",
        },
        example: {
          en: "A 3D printer's precise head movement and a CNC machine both rely on stepper motors.",
          ta: "3D பிரிண்டரின் துல்லியமான தலை இயக்கம் மற்றும் CNC இயந்திரம் இரண்டும் ஸ்டெப்பர் மோட்டார்களைச் சார்ந்துள்ளன.",
        },
        pins: ["IN1", "IN2", "IN3", "IN4"],
      },
      {
        type: "heading",
        text: { en: "Applied example: Traffic Light", ta: "பயன்பாட்டு உதாரணம்: ட்ராஃபிக் லைட்" },
      },
      {
        type: "code",
        filename: "traffic_light.ino",
        content: `const int RED = 25, YELLOW = 26, GREEN = 27;

void setup() {
  pinMode(RED, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
}

void loop() {
  digitalWrite(GREEN, HIGH);
  delay(3000);
  digitalWrite(GREEN, LOW);

  digitalWrite(YELLOW, HIGH);
  delay(1000);
  digitalWrite(YELLOW, LOW);

  digitalWrite(RED, HIGH);
  delay(3000);
  digitalWrite(RED, LOW);
}`,
      },
      {
        type: "heading",
        text: { en: "Applied example: Servo Controller", ta: "பயன்பாட்டு உதாரணம்: சர்வோ கட்டுப்படுத்தி" },
      },
      {
        type: "prose",
        text: {
          en: "Combine the potentiometer from the Inputs lesson with a servo, and you can steer the servo's angle live with your hand — the same idea behind an RC controller.",
          ta: "உள்ளீடு பாடத்தில் உள்ள பொட்டென்ஷியோமீட்டரை ஒரு சர்வோவுடன் இணைத்தால், உங்கள் கையால் நேரடியாக சர்வோவின் கோணத்தை திசைதிருப்பலாம்.",
        },
      },
      {
        type: "code",
        filename: "servo_controller.ino",
        content: `#include <ESP32Servo.h>

Servo myServo;
const int POT_PIN = 34;

void setup() {
  myServo.attach(13);
}

void loop() {
  int raw = analogRead(POT_PIN);           // 0-4095 on ESP32
  int angle = map(raw, 0, 4095, 0, 180);
  myServo.write(angle);
  delay(15);
}`,
      },
    ],
    quiz: [
      {
        question: { en: "Why can't a GPIO pin drive a DC motor directly?", ta: "GPIO பின்னால் நேரடியாக DC மோட்டாரை இயக்க முடியாதது ஏன்?" },
        options: [
          { en: "GPIO pins can't output any current", ta: "GPIO பின்களால் எந்த மின்னோட்டத்தையும் வெளியிட முடியாது" },
          { en: "A motor needs far more current than a GPIO pin can safely supply", ta: "மோட்டாருக்கு GPIO பின் பாதுகாப்பாக வழங்கக்கூடியதை விட அதிக மின்னோட்டம் தேவை" },
          { en: "Motors only work with Bluetooth", ta: "மோட்டார்கள் Bluetooth-உடன் மட்டுமே வேலை செய்யும்" },
        ],
        answer: 1,
        explanation: { en: "A motor driver like the L298N supplies the real current from a separate battery.", ta: "L298N போன்ற மோட்டார் டிரைவர் தனி பேட்டரியிலிருந்து உண்மையான மின்னோட்டத்தை வழங்குகிறது." },
      },
      {
        question: { en: "What's the difference between a servo and a stepper motor?", ta: "சர்வோ மற்றும் ஸ்டெப்பர் மோட்டார் இடையே உள்ள வேறுபாடு என்ன?" },
        options: [
          { en: "No difference at all", ta: "எந்த வேறுபாடும் இல்லை" },
          { en: "A servo holds a specific angle; a stepper moves in precise repeatable steps", ta: "சர்வோ ஒரு குறிப்பிட்ட கோணத்தை வைத்திருக்கும்; ஸ்டெப்பர் துல்லியமான படிகளில் நகரும்" },
          { en: "Steppers can only spin one direction ever", ta: "ஸ்டெப்பர்கள் எப்போதும் ஒரே திசையில் மட்டுமே சுழலும்" },
        ],
        answer: 1,
        explanation: { en: "Servos point at an angle; steppers move in exact counted steps.", ta: "சர்வோக்கள் ஒரு கோணத்தில் சுட்டிக்காட்டுகின்றன; ஸ்டெப்பர்கள் துல்லியமான எண்ணப்பட்ட படிகளில் நகர்கின்றன." },
      },
      {
        question: { en: "How does an RGB LED create colours like purple or orange?", ta: "RGB LED ஊதா அல்லது ஆரஞ்சு போன்ற நிறங்களை எவ்வாறு உருவாக்குகிறது?" },
        options: [
          { en: "It has a fourth hidden colour LED", ta: "இதில் மறைந்திருக்கும் நான்காவது நிற LED உள்ளது" },
          { en: "By mixing the brightness of its red, green and blue LEDs", ta: "அதன் சிவப்பு, பச்சை, நீல LED-களின் பிரகாசத்தை கலப்பதன் மூலம்" },
          { en: "By changing its supply voltage", ta: "அதன் மின்சப்ளையை மாற்றுவதன் மூலம்" },
        ],
        answer: 1,
        explanation: { en: "PWM brightness mixing of R, G and B produces the full colour range.", ta: "R, G, B-இன் PWM பிரகாச கலவை முழு நிற வரம்பையும் உருவாக்குகிறது." },
      },
    ],
  },

  /* ----------------------------------------------------------------- 14 */
  {
    slug: "displays-communication",
    order: 14,
    title: { en: "Displays & Communication", ta: "காட்சிகள் & தொடர்பு" },
    subtitle: {
      en: "Showing information, and talking to other devices",
      ta: "தகவலைக் காட்டுதல், மற்ற சாதனங்களுடன் பேசுதல்",
    },
    hero: "oled-display",
    duration: 12,
    blocks: [
      {
        type: "hook",
        text: {
          en: "So far every result has lived in the Serial Monitor. Displays and communication modules let a project speak without a laptop attached.",
          ta: "இதுவரை ஒவ்வொரு முடிவும் Serial Monitor-இல் மட்டுமே இருந்தது. காட்சிகள் மற்றும் தொடர்பு மாடியூல்கள் லேப்டாப் இல்லாமல் ஒரு திட்டம் பேச அனுமதிக்கின்றன.",
        },
      },
      {
        type: "component",
        slug: "lcd-display",
        name: "16×2 LCD Display",
        whatItIs: {
          en: "Shows two lines of 16 characters each. The classic version needs 6+ wires, but an I2C adapter module reduces that to just 4 — power, ground, and two data wires shared with other I2C devices.",
          ta: "ஒவ்வொன்றும் 16 எழுத்துகள் கொண்ட இரண்டு வரிகளைக் காட்டுகிறது. I2C அடாப்டர் மாடியூல் வயர்களை 4-ஆகக் குறைக்கிறது.",
        },
        example: {
          en: "The two-line screen on an old microwave or a water dispenser is a 16×2 LCD exactly like this.",
          ta: "பழைய மைக்ரோவேவ் அல்லது தண்ணீர் டிஸ்பென்சரில் உள்ள இரு-வரி திரை சரியாக இது போன்ற 16×2 LCD தான்.",
        },
        pins: ["VCC", "GND", "SDA", "SCL"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO21", "GPIO22"],
          device: "LCD (I2C)",
          devicePins: ["VCC", "GND", "SDA", "SCL"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO21", to: "SDA", color: "signal" },
            { from: "GPIO22", to: "SCL", color: "signal2" },
          ],
        },
        code: {
          filename: "lcd_display.ino",
          content: `#include <Wire.h>
#include <LiquidCrystal_I2C.h> // Library: "LiquidCrystal I2C"

LiquidCrystal_I2C lcd(0x27, 16, 2); // address, columns, rows

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("InnovateX 3.0");
  lcd.setCursor(0, 1);
  lcd.print("Hello, world!");
}

void loop() {}`,
        },
      },
      {
        type: "component",
        slug: "oled-display",
        name: "OLED Display",
        whatItIs: {
          en: "A small, crisp pixel display (commonly 128×64) that draws its own light per pixel, so it stays sharp and readable even with no backlight. Also connects over I2C.",
          ta: "தனது சொந்த ஒளியை ஒவ்வொரு பிக்சலாக வரையும் ஒரு சிறிய, தெளிவான பிக்சல் திரை (பொதுவாக 128×64).",
        },
        example: {
          en: "Fitness trackers and small smartwatches almost always use an OLED screen for their crisp, low-power display.",
          ta: "ஃபிட்னஸ் டிராக்கர்கள் மற்றும் சிறிய ஸ்மார்ட்வாட்ச்கள் தெளிவான, குறைந்த மின்சக்தி காட்சிக்கு OLED திரையைப் பயன்படுத்துகின்றன.",
        },
        pins: ["VCC", "GND", "SDA", "SCL"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["3.3V", "GND", "GPIO21", "GPIO22"],
          device: "OLED (I2C)",
          devicePins: ["VCC", "GND", "SDA", "SCL"],
          links: [
            { from: "3.3V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO21", to: "SDA", color: "signal" },
            { from: "GPIO22", to: "SCL", color: "signal2" },
          ],
        },
        code: {
          filename: "oled_display.ino",
          content: `#include <Wire.h>
#include <Adafruit_SSD1306.h> // Library: "Adafruit SSD1306"

Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("InnovateX 3.0");
  display.display();
}

void loop() {}`,
        },
      },
      {
        type: "component",
        slug: "bluetooth-module",
        name: "HC-05 Bluetooth Module",
        whatItIs: {
          en: "Creates a wireless serial connection between the board and a phone or laptop — anything you'd normally send over USB, you can now send over the air.",
          ta: "போர்டுக்கும் ஃபோன் அல்லது லேப்டாப்பிற்கும் இடையே ஒரு வயர்லெஸ் சீரியல் இணைப்பை உருவாக்குகிறது.",
        },
        example: {
          en: "A phone app steering a robot forward, back, left and right over Bluetooth uses exactly this module.",
          ta: "ஒரு ரோபோவை முன், பின், இடது, வலமாக Bluetooth வழியாக இயக்கும் ஃபோன் ஆப் சரியாக இந்த மாடியூலைப் பயன்படுத்துகிறது.",
        },
        pins: ["VCC", "GND", "TXD", "RXD"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO16", "GPIO17"],
          device: "HC-05",
          devicePins: ["VCC", "GND", "RXD", "TXD"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO17", to: "RXD", color: "signal" },
            { from: "GPIO16", to: "TXD", color: "signal2" },
          ],
        },
        code: {
          filename: "bluetooth.ino",
          content: `#include <HardwareSerial.h>
HardwareSerial BT(2); // use ESP32's second UART

void setup() {
  Serial.begin(115200);
  BT.begin(9600, SERIAL_8N1, 16, 17); // RX, TX
}

void loop() {
  if (BT.available()) {
    char command = BT.read();
    Serial.print("Received: ");
    Serial.println(command);
    // e.g. 'F' = forward, 'B' = back, 'L' = left, 'R' = right
  }
}`,
        },
      },
      {
        type: "component",
        slug: "relay-module",
        name: "Relay Module",
        whatItIs: {
          en: "An electrically-controlled switch. A small signal from the board flips an internal mechanical switch that can handle a completely separate, much higher-power circuit — like mains electricity.",
          ta: "மின்சாரத்தால் கட்டுப்படுத்தப்படும் ஒரு சுவிட்ச். போர்டிலிருந்து வரும் சிறிய சமிக்ஞை, முற்றிலும் வேறான, அதிக-சக்தி சுற்றை கையாளக்கூடிய உள் இயந்திர சுவிட்சை மாற்றுகிறது.",
        },
        example: {
          en: "Smart plugs that switch a real household lamp on from an app do it with a relay just like this.",
          ta: "ஆப்பிலிருந்து உண்மையான வீட்டு விளக்கை ஆன் செய்யும் ஸ்மார்ட் பிளக்குகள் இது போன்ற ரிலே மூலம் செய்கின்றன.",
        },
        pins: ["VCC", "IN", "GND"],
        wiring: {
          controller: "ESP32",
          controllerPins: ["5V", "GND", "GPIO23"],
          device: "Relay Module",
          devicePins: ["VCC", "IN", "GND"],
          links: [
            { from: "5V", to: "VCC", color: "power" },
            { from: "GND", to: "GND", color: "ground" },
            { from: "GPIO23", to: "IN", color: "signal" },
          ],
        },
        code: {
          filename: "relay.ino",
          content: `const int RELAY_PIN = 23;

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
}

void loop() {
  digitalWrite(RELAY_PIN, HIGH); // switch load ON
  delay(5000);
  digitalWrite(RELAY_PIN, LOW);  // switch load OFF
  delay(5000);
}`,
        },
      },
      {
        type: "callout",
        tone: "warn",
        text: {
          en: "Relays that switch mains electricity (the wall socket) are dangerous if wired wrong. Only work on the mains side of a relay with an instructor present — the low-voltage signal side is always safe to wire yourself.",
          ta: "மெயின்ஸ் மின்சாரத்தை (சுவர் சாக்கெட்) மாற்றும் ரிலேக்கள் தவறாக இணைக்கப்பட்டால் ஆபத்தானவை. பயிற்றுநர் இருக்கும்போது மட்டுமே மெயின்ஸ் பக்கத்தில் வேலை செய்யுங்கள்.",
        },
      },
      {
        type: "heading",
        text: { en: "Capstone: Obstacle Avoiding Robot", ta: "இறுதி திட்டம்: தடை தவிர்க்கும் ரோபோ" },
      },
      {
        type: "prose",
        text: {
          en: "This is where every earlier lesson meets. An HC-SR04 senses what's ahead, code decides whether the path is clear, and an L298N driver turns that decision into motion — the exact sense-think-act loop from the very first lesson in this section.",
          ta: "இங்குதான் முந்தைய ஒவ்வொரு பாடமும் சந்திக்கின்றன. HC-SR04 முன்னால் என்ன இருக்கிறது என்பதை உணர்கிறது, குறியீடு பாதை தெளிவாக உள்ளதா என்று முடிவு செய்கிறது, L298N டிரைவர் அந்த முடிவை இயக்கமாக மாற்றுகிறது.",
        },
      },
      {
        type: "wiring",
        data: {
          controller: "ESP32",
          controllerPins: ["GPIO5", "GPIO18", "GPIO14", "GPIO12"],
          device: "HC-SR04 + L298N",
          devicePins: ["Trig", "Echo", "IN1", "IN2"],
          links: [
            { from: "GPIO5", to: "Trig", color: "signal" },
            { from: "GPIO18", to: "Echo", color: "signal2" },
            { from: "GPIO14", to: "IN1", color: "power" },
            { from: "GPIO12", to: "IN2", color: "ground" },
          ],
        },
        caption: {
          en: "Both modules also need 5V + GND from the board, and the motors need their own battery through the L298N.",
          ta: "இரண்டு மாடியூல்களுக்கும் போர்டிலிருந்து 5V + GND தேவை, மோட்டார்களுக்கு L298N வழியாக தனி பேட்டரி தேவை.",
        },
      },
      {
        type: "code",
        filename: "obstacle_avoider.ino",
        content: `const int TRIG_PIN = 5, ECHO_PIN = 18;
const int IN1 = 14, IN2 = 12;
const int STOP_DISTANCE = 15; // cm

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

long readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  return pulseIn(ECHO_PIN, HIGH) * 0.034 / 2;
}

void driveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
}

void turnRight() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, HIGH); // one wheel forward, one held — pivots
}

void loop() {
  long distance = readDistanceCm();

  if (distance < STOP_DISTANCE) {
    turnRight();
    delay(400);
  } else {
    driveForward();
  }
}`,
      },
      {
        type: "callout",
        tone: "info",
        text: {
          en: "This sketch is deliberately simple — real obstacle-avoiding robots usually check left and right before choosing a turn direction. Once this works, try adding a second sensor or a servo that sweeps the HC-SR04 side to side.",
          ta: "இந்த ஸ்கெட்ச் வேண்டுமென்றே எளிமையாக உள்ளது — உண்மையான தடை-தவிர்க்கும் ரோபோக்கள் பொதுவாக திசையைத் தேர்ந்தெடுப்பதற்கு முன் இடது மற்றும் வலதைச் சரிபார்க்கும்.",
        },
      },
    ],
    quiz: [
      {
        question: { en: "Why does a 16x2 LCD with an I2C adapter only need 4 wires instead of 6+?", ta: "I2C அடாப்டருடன் கூடிய 16x2 LCD-க்கு ஏன் 6+ க்கு பதிலாக 4 வயர்கள் மட்டுமே தேவை?" },
        options: [
          { en: "It doesn't need power", ta: "இதற்கு பவர் தேவையில்லை" },
          { en: "The adapter combines the data lines into two shared wires (SDA/SCL)", ta: "அடாப்டர் டேட்டா லைன்களை இரண்டு பகிரப்பட்ட வயர்களாக இணைக்கிறது" },
          { en: "It only shows one character", ta: "இது ஒரு எழுத்தை மட்டுமே காட்டும்" },
        ],
        answer: 1,
        explanation: { en: "I2C shares SDA and SCL across multiple devices, cutting the wire count.", ta: "I2C பல சாதனங்களில் SDA மற்றும் SCL-ஐ பகிர்ந்து வயர் எண்ணிக்கையை குறைக்கிறது." },
      },
      {
        question: { en: "What does the HC-05 module let you do?", ta: "HC-05 மாடியூல் உங்களை என்ன செய்ய அனுமதிக்கிறது?" },
        options: [
          { en: "Measure temperature", ta: "வெப்பநிலையை அளக்க" },
          { en: "Send data wirelessly to a phone or laptop over Bluetooth", ta: "Bluetooth வழியாக ஃபோன் அல்லது லேப்டாப்பிற்கு வயர்லெஸாக டேட்டா அனுப்ப" },
          { en: "Display text on a screen", ta: "திரையில் உரையைக் காட்ட" },
        ],
        answer: 1,
        explanation: { en: "HC-05 creates a wireless serial link — the basis of app-controlled projects.", ta: "HC-05 ஒரு வயர்லெஸ் சீரியல் இணைப்பை உருவாக்குகிறது." },
      },
      {
        question: { en: "In the Obstacle Avoiding Robot, what triggers the robot to turn?", ta: "தடை தவிர்க்கும் ரோபோவில், ரோபோ திரும்புவதற்கு என்ன காரணம்?" },
        options: [
          { en: "A timer that always turns every 5 seconds", ta: "எப்போதும் ஒவ்வொரு 5 வினாடிக்கும் திரும்பும் டைமர்" },
          { en: "The ultrasonic distance dropping below the stop threshold", ta: "அல்ட்ராசோனிக் தூரம் நிறுத்த வரம்பிற்குக் கீழே செல்வது" },
          { en: "Pressing a button", ta: "ஒரு பொத்தானை அழுத்துவது" },
        ],
        answer: 1,
        explanation: { en: "The if statement compares live distance to STOP_DISTANCE and turns when it's too close.", ta: "if கூற்று நேரடி தூரத்தை STOP_DISTANCE உடன் ஒப்பிட்டு, மிக அருகில் இருக்கும்போது திரும்புகிறது." },
      },
    ],
  },
];

export function getLesson(slug: string) {
  return LESSONS.find((lesson) => lesson.slug === slug);
}
