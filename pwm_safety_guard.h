#ifndef PWM_SAFETY_GUARD_H
#define PWM_SAFETY_GUARD_H

#include <Arduino.h>

#define MAX_SAFE_PWM_DUTY 220
#define MIN_SAFE_PWM_DUTY 0
#define MAX_SAFE_FREQ_HZ  1200
#define MIN_SAFE_FREQ_HZ  40
#define WATCHDOG_TIMEOUT_MS 500

inline uint8_t clampSafePWM(int pwmValue) {
    if (pwmValue > MAX_SAFE_PWM_DUTY) return MAX_SAFE_PWM_DUTY;
    if (pwmValue < MIN_SAFE_PWM_DUTY) return MIN_SAFE_PWM_DUTY;
    return (uint8_t)pwmValue;
}

inline uint16_t clampSafeFrequency(uint16_t freqHz) {
    if (freqHz > MAX_SAFE_FREQ_HZ) return MAX_SAFE_FREQ_HZ;
    if (freqHz < MIN_SAFE_FREQ_HZ) return MIN_SAFE_FREQ_HZ;
    return freqHz;
}

#endif
