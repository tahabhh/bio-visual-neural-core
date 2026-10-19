import json


class AgenticVisionController:
    """
    Active Vision Agent (Perception -> Reasoning -> Action Orchestration).
    Dynamically selects the optimal neuro-stimulation mode based on OpenCV 5 optical
    metrics and TinyML spatial hazard inference.
    """

    def __init__(self, profiles_path="config/stimulation_profiles.json"):
        with open(profiles_path, "r", encoding="utf-8") as f:
            self.profiles = json.load(f)["profiles"]

    def orchestrate_stimulation(self, color_metrics: dict, spatial_features: dict) -> dict:
        lum = color_metrics["luminance"]
        salience = spatial_features["salience"]
        hazard = spatial_features["hazard_proximity"]

        # Agentic Policy Decision Tree
        if lum < 12.0 and salience < 0.05:
            selected_mode = "IDLE_SAFE"
        elif hazard >= 0.62:
            selected_mode = "PROXIMITY_HAZARD_ALERT"
        elif salience >= 0.35:
            selected_mode = "SPATIAL_CONTOUR_LOCK"
        else:
            selected_mode = "CHROMATIC_EXPLORATION"

        profile = self.profiles[selected_mode]
        modulated_freq = int(color_metrics["frequency_hz"] * profile["freq_multiplier"])
        modulated_pwm = min(int(color_metrics["pwm_duty"]), int(profile["pwm_ceiling"]))

        return {
            "agent_mode": selected_mode,
            "mode_id": profile["mode_id"],
            "modulated_frequency_hz": modulated_freq,
            "modulated_pwm_duty": modulated_pwm,
            "reasoning_trace": (
                f"Lum={lum:.1f}, Salience={salience:.2f}, Hazard={hazard:.2f} -> Mode={selected_mode}"
            ),
        }
