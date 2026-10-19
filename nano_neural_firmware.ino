const int STIMULATION_PIN = 9; // PWM output pin connected to isolation/regulation circuit

void setup() {
  pinMode(STIMULATION_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    int pwmValue = Serial.parseInt();
    // Enforce safe micro-ampere boundaries
    pwmValue = constrain(pwmValue, 0, 255);
    analogWrite(STIMULATION_PIN, pwmValue);
  }
}
