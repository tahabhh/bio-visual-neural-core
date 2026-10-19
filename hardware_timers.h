#ifndef HARDWARE_TIMERS_H
#define HARDWARE_TIMERS_H

#include <Arduino.h>

// Configures 16-bit Timer1 on ATmega328P (Pin D9 / OC1A) for dynamic frequency & duty cycle modulation
inline void configureTimer1PWM(uint16_t freqHz, uint8_t dutyCycle255) {
    if (dutyCycle255 == 0) {
        TCCR1A = 0;
        TCCR1B = 0;
        digitalWrite(9, LOW);
        return;
    }
    // Prescaler = 8 on 16MHz clock -> 2MHz timer tick
    uint32_t topVal = (2000000UL / (uint32_t)freqHz) - 1UL;
    if (topVal > 65535UL) topVal = 65535UL;
    if (topVal < 100UL) topVal = 100UL;

    uint16_t icr1 = (uint16_t)topVal;
    uint16_t ocr1a = (uint16_t)(((uint32_t)icr1 * (uint32_t)dutyCycle255) / 255UL);

    TCCR1A = (1 << COM1A1) | (1 << WGM11);
    TCCR1B = (1 << WGM13) | (1 << WGM12) | (1 << CS11);
    ICR1 = icr1;
    OCR1A = ocr1a;
}

#endif
