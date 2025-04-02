# Tiny CRM

[group('info')]
help:
    @echo "Tiny CRM"
    @just --list

[group('dev')]
dev: 
    @npm install
    @docker compose up -d --wait
    @docker compose exec app npm run migrate:dev
    @echo Open http://localhost:3000

[group('dev')]
stop:
    @docker compose down

[group('dev')]
migrate:
    @docker compose exec app npm run migrate:dev

[group('dev')]
build:
    @docker build --target runner -t tiny-crm .

[group('quality')]
quality:
    @docker compose exec app npm run format
    @docker compose exec app npm run lint
