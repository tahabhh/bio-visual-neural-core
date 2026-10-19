.PHONY: install test benchmark run clean

install:
	pip install -r requirements.txt

test:
	python3 -m unittest discover -s tests -v

benchmark:
	python3 -m src.benchmark_evaluator --frames 200

run:
	python3 -m src.main_daemon --simulate-hardware --frames 15

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
