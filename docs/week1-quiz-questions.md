# Week 1 quiz — ready-made question set

Copy these straight into a Google Form (Quiz mode). Correct answers are marked **✓**.

Covers: the Foundation lessons (electricity, LED, resistor, breadboard) plus the Week 1 ESP32 build.

Suggested settings: 1 point per question, 8 questions, ~5 minutes.

---

### Identity questions (required, no points)

1. **Your full name** — Short answer, required
2. **Your team (1–10)** — Short answer or dropdown, required

---

### Q1. In the water-pipe analogy, what does voltage represent?

- How much water flows past a point
- **✓ How hard the pump pushes (pressure)**
- The width of the pipe
- The temperature of the water

*Feedback:* Voltage is pressure — the push behind the flow. Current is the flow itself.

---

### Q2. Which leg of an LED is the anode?

- The shorter leg
- **✓ The longer leg**
- Either one — it doesn't matter
- The one nearest the flat edge

*Feedback:* Long leg = anode = positive. The flat edge on the plastic body marks the cathode.

---

### Q3. What happens if you connect an LED backwards?

- It explodes
- It glows more dimly
- **✓ It simply doesn't light up**
- It gets hot and melts

*Feedback:* An LED only passes current one way. Backwards means no current, so no light — and no damage.

---

### Q4. Why must an LED always be used with a resistor?

- **✓ An LED has almost no resistance and would burn out**
- The resistor makes the LED brighter
- The resistor changes the LED's colour
- It's just a tradition

*Feedback:* Without a resistor, current rushes through uncontrolled and destroys the LED in seconds.

---

### Q5. Which resistor value is standard for one LED on a 5V supply?

- 10Ω
- **✓ 220Ω**
- 10,000Ω
- 1,000,000Ω

*Feedback:* 220Ω (red-red-brown) is the workshop standard.

---

### Q6. On a breadboard, how many holes are connected together in one terminal strip group?

- The entire row, all the way across
- **✓ Five**
- Two
- All of them

*Feedback:* Terminal strips connect in groups of five, and the centre gap splits the board in half.

---

### Q7. In the Week 1 circuit, which ESP32 pin drives the LED?

- GPIO0
- **✓ GPIO2**
- GND
- 3V3

*Feedback:* The sketch sets `LED_PIN = 2`, so GPIO2 is what switches on and off.

---

### Q8. In the blink sketch, what does `delay(500)` do?

- Blinks the LED 500 times
- Sets the brightness to 500
- **✓ Pauses the program for 500 milliseconds**
- Sets the pin number to 500

*Feedback:* 500 milliseconds is half a second — that's why the LED blinks once per second.

---

## Optional harder question

Use this as a tie-breaker or a bonus point.

### Q9. Why does the circuit need the ESP32's GND wired to the breadboard's ground rail?

- To make the board sit flat
- **✓ Without it the circuit isn't a complete loop, so no current flows**
- To give the LED its colour
- It isn't actually needed

*Feedback:* Current has to travel all the way around. Ground is the return path — leave it out and nothing lights up.

---

## Tamil versions

If you're running the quiz bilingually, put both languages in the same question so one form serves everyone:

> **In the water-pipe analogy, what does voltage represent?**
> *நீர்க்குழாய் ஒப்புமையில், மின்னழுத்தம் எதைக் குறிக்கிறது?*

Do the same for the options. One form, one response sheet, no duplication.
