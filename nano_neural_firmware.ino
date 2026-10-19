#include "pwm_safety_guard.h"
#include "packet_protocol.h"
#include "hardware_timers.h"

const int STIMULATION_PWM_PIN = 9;
const int FAULT_INDICATOR_PIN = 13;

unsigned long lastPacketTimestamp = 0;
uint8_t rxBuffer[PACKET_SIZE];
uint8_t rxIndex = 0;

void setup() {
    pinMode(STIMULATION_PWM_PIN, OUTPUT);
    pinMode(FAULT_INDICATOR_PIN, OUTPUT);
    digitalWrite(STIMULATION_PWM_PIN, LOW);
    digitalWrite(FAULT_INDICATOR_PIN, LOW);
    Serial.begin(115200);
    lastPacketTimestamp = millis();
}

void loop() {
    while (Serial.available() > 0) {
        uint8_t incoming = Serial.read();
        if (rxIndex == 0 && incoming != PACKET_START_BYTE) {
            continue;
        }
        rxBuffer[rxIndex++] = incoming;
        if (rxIndex == PACKET_SIZE) {
            processTelemetryPacket(rxBuffer);
            rxIndex = 0;
        }
    }

    // Hardware safety watchdog cutoff if host link drops for >500ms
    if (millis() - lastPacketTimestamp > WATCHDOG_TIMEOUT_MS) {
        configureTimer1PWM(100, 0);
        digitalWrite(FAULT_INDICATOR_PIN, HIGH);
    }
}

void processTelemetryPacket(const uint8_t *pkt) {
    if (pkt[0] != PACKET_START_BYTE || pkt[5] != PACKET_END_BYTE) {
        return;
    }
    uint8_t expectedCrc = computeCRC8(&pkt[1], 3);
    if (expectedCrc != pkt[4]) {
        return;
    }
    uint16_t rawFreq = ((uint16_t)pkt[1] << 8) | pkt[2];
    uint8_t rawPwm = pkt[3];

    uint16_t safeFreq = clampSafeFrequency(rawFreq);
    uint8_t safePwm = clampSafePWM(rawPwm);

    configureTimer1PWM(safeFreq, safePwm);
    digitalWrite(FAULT_INDICATOR_PIN, LOW);
    lastPacketTimestamp = millis();
}
