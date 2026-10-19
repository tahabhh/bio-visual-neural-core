# Agentic Vision Workflow & OpenCV 5 Decision Pipeline

## Perception -> Reasoning -> Action Loop
The Bio-Visual Neural Core operates as an autonomous closed-loop perception agent:

1. **Perception Stage (OpenCV 5 + TinyML):**
   - Captures RGB frame, extracts foveal luminance, chromatic opponent channels, Sobel edge energy, and bilateral spatial bias.
2. **Reasoning Stage (`AgenticVisionController`):**
   - Evaluates environmental state:
     - *Case A (Camera Covered / Pitch Dark):* Switches to `IDLE_SAFE` (`PWM <= 40`) to eliminate unnecessary neural fatigue.
     - *Case B (Central Obstacle Proximity >= 0.62):* Escalates immediately to `PROXIMITY_HAZARD_ALERT` (`1.35x` frequency shift) to warn the user of an approaching physical hazard.
     - *Case C (High Edge Salience >= 0.35):* Locks onto structural boundaries via `SPATIAL_CONTOUR_LOCK`.
     - *Case D (Open Scene):* Engages `CHROMATIC_EXPLORATION` for rich color-to-frequency translation.
3. **Action & Verification Stage:**
   - Passes target parameters through `BioSafetyMonitor`, constructs a `CRC-8` verified binary frame, and drives the 16-bit hardware timer on the ATmega328P.
