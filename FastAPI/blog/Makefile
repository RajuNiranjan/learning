# Makefile

# Variables
APP_NAME=main
HOST=127.0.0.1
PORT=8000

# Run FastAPI server
run:
	uvicorn main:app --reload 

# Install dependencies
install:
	pip install -r requirements.txt

# Format code with black
format:
	black .

# Lint code with flake8
lint:
	flake8 .

# Run tests (assuming you use pytest)
test:
	pytest

# Create virtual environment
venv:
	python -m venv venv

# Activate virtual environment (works on Unix/macOS)
activate:
	source venv/bin/activate
