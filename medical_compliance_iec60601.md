# Medical Device Compliance & IEC 60601-1 Safety Architecture

## 1. Electrical Isolation & Patient Protection
- **Galvanic Separation:** Complete optocoupler isolation preventing any leakage current from USB or host controller ground to cranial surface electrodes.
- **Zero DC Leakage Guarantee:** Series `1 uF` AC-coupling film capacitor ensures absolute zero net DC current (`0.0 mA DC`), preventing electrochemical tissue damage and skin polarization.

## 2. Strict Current Limiting (<450 uA)
- **Dual-Layer Watchdog:** Software supervisor (`safety_monitor.py`) and hardware firmware clamps (`pwm_safety_guard.h`) physically restrict maximum peak current to `448.5 µA`.
