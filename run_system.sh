#!/usr/bin/env bash
set -e

echo "====================================================================="
echo "  BIO-VISUAL NEURAL CORE (v3.0) - ENTERPRISE EDGE-AI BOOTLOADER      "
echo "====================================================================="

echo "[1/4] Verifying Python Edge-AI Runtime..."
python3 --version

echo "[2/4] Executing Automated Bio-Safety & Protocol Unit Tests..."
python3 -m unittest discover -s tests -v

echo "[3/4] Running Reproducible Latency & Charge-Balance Benchmark..."
python3 -m src.benchmark_evaluator --frames 50

echo "[4/4] Starting Real-Time Agentic Optical-to-Neural Telemetry Daemon..."
python3 -m src.main_daemon --simulate-hardware --frames 10

echo "====================================================================="
echo "  ALL SYSTEMS NOMINAL - OPERATING WITHIN <450 uA MASTOID LIMITS      "
echo "====================================================================="
