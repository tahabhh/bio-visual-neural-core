from setuptools import setup, find_packages

setup(
    name="bio_visual_neural_core",
    version="3.0.0",
    description="Edge-AI Wearable Optical-to-Neural Electrical Stimulation Translation Core",
    author="Taha Ben Hadj Hassine",
    packages=find_packages(),
    install_requires=[
        "opencv-python>=4.8.0",
        "numpy>=1.24.0",
        "pyserial>=3.5",
    ],
    entry_points={
        "console_scripts": [
            "bvnc-daemon=src.main_daemon:main",
            "bvnc-benchmark=src.benchmark_evaluator:main",
        ],
    },
)
