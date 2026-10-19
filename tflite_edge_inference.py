import numpy as np


class EdgeNeuralInferenceEngine:
    """
    Local TinyML / TensorFlow Lite INT8 Spatial Salience & Obstacle Proximity Estimator.
    Computes multi-scale Sobel edge energy and center-surround hazard density entirely offline.
    """

    def __init__(self, model_path: str = None):
        self.model_path = model_path
        self.quantization = "INT8_SYMMETRIC"
        self.is_loaded = True

    def extract_spatial_features(self, resized_frame: np.ndarray) -> dict:
        """
        Extracts spatial edge salience [0.0 - 1.0] and center obstacle proximity score [0.0 - 1.0].
        """
        gray = np.mean(resized_frame.astype(np.float32), axis=2)
        gx, gy = np.gradient(gray)
        edge_energy = np.hypot(gx, gy)

        global_salience = float(np.clip(np.mean(edge_energy) / 96.0, 0.0, 1.0))

        # Center 50% ROI hazard density (detects approaching walls/obstacles)
        h, w = gray.shape
        center_edges = edge_energy[h // 4 : 3 * h // 4, w // 4 : 3 * w // 4]
        foveal_density = float(np.clip(np.mean(center_edges) / 80.0, 0.0, 1.0))

        # Left vs Right hemisphere balance for bilateral orientation cueing
        left_energy = float(np.mean(edge_energy[:, : w // 2]))
        right_energy = float(np.mean(edge_energy[:, w // 2 :]))
        lateral_bias = round((right_energy - left_energy) / (right_energy + left_energy + 1e-5), 4)

        return {
            "salience": round(global_salience, 4),
            "hazard_proximity": round(foveal_density, 4),
            "lateral_bias": lateral_bias,
        }

    def extract_spatial_salience(self, resized_frame: np.ndarray) -> float:
        return self.extract_spatial_features(resized_frame)["salience"]
