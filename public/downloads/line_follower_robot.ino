/*
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
}
