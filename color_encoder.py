import numpy as np
try:
    import cv2
    HAS_OPENCV = True
except ImportError:
    HAS_OPENCV = False


class OpticalColorEncoder:
    """
    OpenCV 5 Compatible Optical Preprocessor & Perceptual CIE-LAB / RGB Encoder.
    Transforms 64x64 spatial regions into deterministic neural frequency (Hz)
    and charge-balanced PWM duty parameters.
    """

    def __init__(self, resolution=(64, 64)):
        self.resolution = resolution

    def _resize_frame(self, frame: np.ndarray) -> np.ndarray:
        if HAS_OPENCV:
            return cv2.resize(frame, self.resolution, interpolation=cv2.INTER_AREA)
        # Pure numpy fallback for headless CI environments
        h, w = frame.shape[:2]
        th, tw = self.resolution
        row_idx = (np.arange(th) * (h / th)).astype(int)
        col_idx = (np.arange(tw) * (w / tw)).astype(int)
        return frame[row_idx[:, None], col_idx]

    def process_frame(self, frame: np.ndarray) -> dict:
        if frame is None or frame.size == 0:
            raise ValueError("Empty or corrupted optical frame received.")

        resized = self._resize_frame(frame)

        # Extract central foveal ROI (32x32 center) vs peripheral ring
        h, w = resized.shape[:2]
        fovea = resized[h // 4 : 3 * h // 4, w // 4 : 3 * w // 4]

        avg_bgr = np.mean(resized, axis=(0, 1))
        foveal_bgr = np.mean(fovea, axis=(0, 1))

        # Blend 70% foveal attention + 30% peripheral context
        b = int(0.7 * foveal_bgr[0] + 0.3 * avg_bgr[0])
        g = int(0.7 * foveal_bgr[1] + 0.3 * avg_bgr[1])
        r = int(0.7 * foveal_bgr[2] + 0.3 * avg_bgr[2])

        # ITU-R BT.709 perceptual luminance
        luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)

        # Opponent color channels (Red-Green & Blue-Yellow approximations)
        rg_opponent = abs(r - g) / 255.0
        by_opponent = abs((r + g) / 2.0 - b) / 255.0
        chromatic_contrast = float(np.clip((rg_opponent + by_opponent) * 0.5, 0.0, 1.0))

        # Deterministic frequency mapping [40 Hz .. 920 Hz base carrier]
        base_frequency_hz = int(40 + (luminance / 255.0) * 800 + (chromatic_contrast * 80))

        # Deterministic PWM duty cycle [0 .. 220 hardware safety ceiling]
        raw_pwm = int((r * 0.35) + (g * 0.45) + (b * 0.20))
        safe_pwm = int(np.clip(raw_pwm, 0, 220))

        return {
            "r": r,
            "g": g,
            "b": b,
            "luminance": round(float(luminance), 2),
            "chromatic_contrast": round(chromatic_contrast, 4),
            "frequency_hz": base_frequency_hz,
            "pwm_duty": safe_pwm,
            "resized_frame": resized,
        }
