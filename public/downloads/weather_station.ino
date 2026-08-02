/*
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
}
