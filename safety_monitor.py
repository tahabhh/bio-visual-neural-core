import json


class BioSafetyMonitor:
    """
    Hardware-in-the-loop Bio-Safety Supervisor enforcing IEC 60601-1 inspired
    micro-current limits (<450 uA), duty cycle clamping, and cumulative charge tracking.
    """

    def __init__(self, config_path="config/hardware_safety_config.json"):
        with open(config_path, "r", encoding="utf-8") as f:
            self.config = json.load(f)["electrical_safety_bounds"]
        self.cumulative_charge_uc = 0.0

    def validate_telemetry(self, frequency_hz: int, pwm_duty: int, dt_sec: float = 0.033) -> tuple:
        safe_freq = max(
            self.config["min_frequency_hz"],
            min(int(frequency_hz), self.config["max_frequency_hz"]),
        )
        safe_pwm = max(
            self.config["min_pwm_duty"],
            min(int(pwm_duty), self.config["max_pwm_duty"]),
        )

        # Estimate instantaneous micro-current (linearly scaled up to 448.5 uA at PWM=220)
        estimated_ua = (safe_pwm / 220.0) * 448.5
        if estimated_ua > self.config["max_current_microamps"]:
            safe_pwm = 0
            estimated_ua = 0.0

        # Track net charge delivered per frame window
        self.cumulative_charge_uc += estimated_ua * dt_sec
        return safe_freq, safe_pwm

    def estimate_current_microamps(self, safe_pwm: int) -> float:
        return round((safe_pwm / 220.0) * 448.5, 2)
