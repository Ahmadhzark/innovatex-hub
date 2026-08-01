import type { Bilingual } from "@/components/providers/LanguageProvider";

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
  | { type: "callout"; tone: "info" | "warn"; text: Bilingual };

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
];

export function getLesson(slug: string) {
  return LESSONS.find((lesson) => lesson.slug === slug);
}
