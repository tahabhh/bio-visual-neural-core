# Bio-Visual Neural Core: Comprehensive Technical & Clinical Safety Report

## 1. Problem Statement & Target Users
Over 43 million individuals live with total blindness globally. Invasive cortical implants require high-risk neurosurgery, whereas cloud-dependent smart glasses suffer from network latency and severe privacy exposure. **Bio-Visual Neural Core (BVNC)** provides a 100% offline, wearable Edge-AI alternative that translates real-time optical streams into safe, non-invasive micro-current frequency signatures over the **mastoid process**.

## 2. OpenCV 5 & TinyML Edge Architecture
- **Foveal-Weighted Chromatic Encoding (`src/color_encoder.py`):** Prioritizes the central 32x32 foveal region (70% weight) alongside peripheral context (30% weight), computing ITU-R BT.709 luminance and red-green / blue-yellow opponent contrast.
- **INT8 Edge Salience & Hazard Detection (`src/tflite_edge_inference.py`):** Computes spatial gradient energy and bilateral hemisphere asymmetry locally on the edge device without internet connectivity.
- **Agentic Vision Orchestrator (`src/agentic_vision_controller.py`):** Dynamically transitions between four neuro-stimulation regimes (`IDLE_SAFE`, `CHROMATIC_EXPLORATION`, `SPATIAL_CONTOUR_LOCK`, and `PROXIMITY_HAZARD_ALERT`) based on real-time visual scene risk.

## 3. Dual-Layer Electrical Safety & Fault Tolerance
- **Software Guard (`src/safety_monitor.py`):** Clamps frequency (`40–1200 Hz`) and PWM duty (`0–220`), ensuring instantaneous current never exceeds `448.5 µA` (`< 450 µA` ceiling).
- **Firmware 16-Bit Timer1 & Watchdog (`firmware/nano_neural_firmware/`):** Verifies every 6-byte UART frame via `CRC-8` (`0x07` polynomial) and immediately zeroes output on Pin D9 if serial heartbeats lapse for `> 500 ms`.
