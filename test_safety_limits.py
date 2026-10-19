import unittest
import numpy as np
from src.color_encoder import OpticalColorEncoder
from src.safety_monitor import BioSafetyMonitor
from src.serial_telemetry_bridge import SerialTelemetryBridge


class TestBioVisualSafetyLimits(unittest.TestCase):
    def test_pwm_clamping_never_exceeds_safety_cap(self):
        monitor = BioSafetyMonitor()
        freq, pwm = monitor.validate_telemetry(5000, 255)
        self.assertLessEqual(pwm, 220)
        self.assertLessEqual(freq, 1200)
        self.assertLessEqual(monitor.estimate_current_microamps(pwm), 450.0)

    def test_encoder_output_bounds_on_saturated_input(self):
        encoder = OpticalColorEncoder()
        white_frame = np.full((64, 64, 3), 255, dtype=np.uint8)
        result = encoder.process_frame(white_frame)
        self.assertLessEqual(result["pwm_duty"], 220)
        self.assertGreaterEqual(result["frequency_hz"], 40)

    def test_packet_crc_framing_and_tamper_rejection(self):
        bridge = SerialTelemetryBridge()
        pkt = bridge.build_packet(440, 150)
        self.assertTrue(bridge.verify_packet(pkt))
        # Corrupt 1 bit in payload and verify rejection
        corrupted = bytearray(pkt)
        corrupted[2] ^= 0xFF
        self.assertFalse(bridge.verify_packet(bytes(corrupted)))


if __name__ == "__main__":
    unittest.main()
