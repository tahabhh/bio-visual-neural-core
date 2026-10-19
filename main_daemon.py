import argparse
import numpy as np
from src.color_encoder import OpticalColorEncoder
from src.tflite_edge_inference import EdgeNeuralInferenceEngine
from src.agentic_vision_controller import AgenticVisionController
from src.safety_monitor import BioSafetyMonitor
from src.serial_telemetry_bridge import SerialTelemetryBridge


def main():
    parser = argparse.ArgumentParser(description="Bio-Visual Neural Core v3.0 System Daemon")
    parser.add_argument("--simulate-hardware", action="store_true", help="Run deterministic synthetic optical loop")
    parser.add_argument("--frames", type=int, default=10, help="Number of frames to process in simulation")
    parser.add_argument("--port", type=str, default="/dev/ttyUSB0")
    parser.add_argument("--baud", type=int, default=115200)
    parser.add_argument("--safe-mode", action="store_true")
    args = parser.parse_args()

    np.random.seed(7)
    encoder = OpticalColorEncoder()
    inference = EdgeNeuralInferenceEngine()
    agent = AgenticVisionController()
    safety = BioSafetyMonitor()
    bridge = SerialTelemetryBridge(port=args.port, baudrate=args.baud, simulate=True)

    print("[BVNC v3.0] Agentic Edge-AI Daemon Active. Enforcing <450uA Mastoid Safety Bounds...")
    for step in range(args.frames):
        synthetic_frame = np.random.randint(0, 256, (120, 160, 3), dtype=np.uint8)
        c_metrics = encoder.process_frame(synthetic_frame)
        s_features = inference.extract_spatial_features(c_metrics["resized_frame"])
        decision = agent.orchestrate_stimulation(c_metrics, s_features)
        safe_freq, safe_pwm = safety.validate_telemetry(
            decision["modulated_frequency_hz"], decision["modulated_pwm_duty"]
        )
        current_ua = safety.estimate_current_microamps(safe_pwm)
        packet = bridge.transmit(safe_freq, safe_pwm)

        print(
            f"Frame #{step+1:02d} | Mode={decision['agent_mode']:<22} | "
            f"RGB=({c_metrics['r']:3d},{c_metrics['g']:3d},{c_metrics['b']:3d}) | "
            f"Salience={s_features['salience']:.2f} | Freq={safe_freq:4d}Hz | "
            f"PWM={safe_pwm:3d} ({current_ua:5.1f}uA) | UART={packet.hex().upper()}"
        )


if __name__ == "__main__":
    main()
