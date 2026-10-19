#ifndef NEURAL_ADAPTATION_FILTER_H
#define NEURAL_ADAPTATION_FILTER_H

#include <Arduino.h>

inline uint8_t applyNeuralAdaptationDither(uint8_t basePWM, unsigned long millisTick) {
    if (basePWM == 0) return 0;
    
    int ditherOffset = (int)((millisTick / 250UL) % 3) - 1;
    int adaptedPWM = (int)basePWM + ditherOffset;
    
    if (adaptedPWM > 220) return 220;
    if (adaptedPWM < 10) return 10;
    return (uint8_t)adaptedPWM;
}

#endif
