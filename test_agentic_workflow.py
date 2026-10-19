import unittest
import numpy as np
from src.color_encoder import OpticalColorEncoder
from src.tflite_edge_inference import EdgeNeuralInferenceEngine
from src.agentic_vision_controller import AgenticVisionController


class TestAgenticVisionWorkflow(unittest.TestCase):
    def test_dark_occluded_frame_triggers_idle_safe_mode(self):
        encoder = OpticalColorEncoder()
        inference = EdgeNeuralInferenceEngine()
        agent = AgenticVisionController()

        dark_frame = np.zeros((64, 64, 3), dtype=np.uint8)
        c_metrics = encoder.process_frame(dark_frame)
        s_features = inference.extract_spatial_features(c_metrics["resized_frame"])
        decision = agent.orchestrate_stimulation(c_metrics, s_features)

        self.assertEqual(decision["agent_mode"], "IDLE_SAFE")
        self.assertLessEqual(decision["modulated_pwm_duty"], 40)


if __name__ == "__main__":
    unittest.main()
