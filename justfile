## Tiny CRM

# Show help
help:
    @just --list

# Start de development server
[group('dev')]
dev: stop
    @npm install
    @docker compose build
    @docker compose up -d
    @echo Open http://localhost:3000

# Stop the development server
[group('dev')]
stop:
    @docker compose down

# Migrate the database, for development
[group('dev')]
migrate:
    @docker compose exec app npm run migrate:dev

# Build a production image
[group('dev')]
build:
    @docker build --target runner -t tiny-crm .

# Run various quality checks
[group('quality')]
quality:
    @docker compose exec app npm run format
    @docker compose exec app npm run lint
