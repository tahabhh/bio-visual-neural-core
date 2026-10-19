class SerialTelemetryBridge:
    """
    Deterministic 6-byte binary packet framing with polynomial 0x07 CRC-8 verification
    for ATmega328P (Arduino Nano) real-time UART communication.
    Packet Layout: [0xAA] [FREQ_HIGH] [FREQ_LOW] [PWM_DUTY] [CRC8] [0x55]
    """

    START_BYTE = 0xAA
    END_BYTE = 0x55

    def __init__(self, port="/dev/ttyUSB0", baudrate=115200, simulate=True):
        self.port = port
        self.baudrate = baudrate
        self.simulate = simulate

    @staticmethod
    def compute_crc8(data_bytes: bytes) -> int:
        crc = 0x00
        for byte in data_bytes:
            crc ^= byte
            for _ in range(8):
                if crc & 0x80:
                    crc = ((crc << 1) ^ 0x07) & 0xFF
                else:
                    crc = (crc << 1) & 0xFF
        return crc

    def build_packet(self, freq_hz: int, pwm_duty: int) -> bytes:
        freq_high = (freq_hz >> 8) & 0xFF
        freq_low = freq_hz & 0xFF
        payload = bytes([freq_high, freq_low, pwm_duty & 0xFF])
        crc = self.compute_crc8(payload)
        return bytes([self.START_BYTE]) + payload + bytes([crc, self.END_BYTE])

    @classmethod
    def verify_packet(cls, packet: bytes) -> bool:
        if len(packet) != 6:
            return False
        if packet[0] != cls.START_BYTE or packet[5] != cls.END_BYTE:
            return False
        expected_crc = cls.compute_crc8(packet[1:4])
        return expected_crc == packet[4]

    def transmit(self, freq_hz: int, pwm_duty: int) -> bytes:
        return self.build_packet(freq_hz, pwm_duty)
