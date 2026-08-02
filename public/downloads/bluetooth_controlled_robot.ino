/*
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
}
