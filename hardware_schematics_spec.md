# Hardware Pinout, Optocoupler Isolation & Current Regulation Specification

## 1. Microcontroller Target: Arduino Nano (ATmega328P @ 16MHz)
- **Pin D9 (`OC1A` / 16-Bit Timer1):** Variable-frequency (`40 Hz - 1200 Hz`), duty-clamped (`<= 86.2%`) PWM output.
- **Pin D13:** Hardware Watchdog & CRC Fault Indicator LED.
- **UART Interface (`115200 bps`):** Deterministic 6-byte packet (`0xAA [FREQ_H] [FREQ_L] [PWM] [CRC8] 0x55`).

## 2. Analog Bio-Safety Isolation Stage
1. **Galvanic Isolation:** High-speed PC817 / 6N137 optocoupler separating the USB/digital logic ground from the cranial electrode rail.
2. **Biphasic AC Capacitive Coupling:** Series `1 uF` film capacitor blocking any residual DC offset (`0.0 mA DC` guarantee) to prevent skin polarization or electrochemical irritation.
3. **Constant-Current Limiter:** Precision Howland current pump and shunt Zener clamp physically restricting peak output current to `< 450 uA` across mastoid skin impedances (`5 kOhm - 20 kOhm`).
