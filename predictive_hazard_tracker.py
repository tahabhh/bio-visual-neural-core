import numpy as np

class PredictiveHazardTracker:
    """
    Advanced optical flow and velocity vector estimation for predictive obstacle tracking.
    Anticipates approaching collision vectors and dynamically adjusts neural stimulation urgency.
    """
    def __init__(self, history_buffer_size=5):
        self.buffer_size = history_buffer_size
        self.centroid_history = []

    def update_and_predict(self, current_salience: float, lateral_bias: float) -> dict:
        self.centroid_history.append((current_salience, lateral_bias))
        if len(self.centroid_history) > self.buffer_size:
            self.centroid_history.pop(0)

        if len(self.centroid_history) >= 2:
            delta_salience = self.centroid_history[-1][0] - self.centroid_history[0][0]
            approach_velocity = delta_salience / float(len(self.centroid_history))
        else:
            approach_velocity = 0.0

        is_approaching_hazard = approach_velocity > 0.08

        return {
            "approach_velocity": round(float(approach_velocity), 4),
            "is_approaching_hazard": is_approaching_hazard,
            "dynamic_boost_factor": 1.45 if is_approaching_hazard else 1.0
        }
