## Tiny CRM

# Show help
help:
    @just --list

# Build and Start de development server
[group('dev')]
up:
    @docker compose up --build -d --wait
    @npm install
    @docker compose exec app npm run migrate:dev
    @echo Open http://localhost:3000

# Runs the migations
[group('dev')]
migrate:
    @docker compose exec app npm run migrate:dev

# Start the development server
[group('dev')]
start:
    @docker compose start

# Pause the development server
[group('dev')]
stop:
    @docker compose stop

# Stop the development server
[group('dev')]
down:
    @docker compose down

# Build a production image
[group('production')]
build:
    @docker build --target runner -t tiny-crm:latest .

# Run various quality checks
[group('quality')]
quality:
    @docker compose exec app npm run format
    @docker compose exec app npm run lint
