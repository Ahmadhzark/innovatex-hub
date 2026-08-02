/*
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
}
