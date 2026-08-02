/*
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
}
