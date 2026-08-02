/*
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
}
