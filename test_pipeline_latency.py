import time
import unittest
import numpy as np
from src.color_encoder import OpticalColorEncoder
from src.tflite_edge_inference import EdgeNeuralInferenceEngine


class TestPipelineRealTimeLatency(unittest.TestCase):
    def test_single_frame_processing_under_15ms(self):
        encoder = OpticalColorEncoder()
        inference = EdgeNeuralInferenceEngine()
        frame = np.random.randint(0, 256, (120, 160, 3), dtype=np.uint8)

        t0 = time.perf_counter()
        metrics = encoder.process_frame(frame)
        features = inference.extract_spatial_features(metrics["resized_frame"])
        elapsed_ms = (time.perf_counter() - t0) * 1000.0

        self.assertLess(elapsed_ms, 15.0)
        self.assertIn("salience", features)


if __name__ == "__main__":
    unittest.main()
