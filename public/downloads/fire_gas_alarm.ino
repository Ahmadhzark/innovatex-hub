/*
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
}
