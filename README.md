# Tiny CRM

Small CRM for small business. This is a "learning project", 
made with NextJS. The database is in MySQL format.

### Requirements
- Docker

## Development

### Bootstrap

```bash
make dev
make migrate
```

## Production

This software is best run with the [Docker Infra](https://github.com/sirber/infra). The database is in SQLite, so backups are easy. It will be available as `./database/crm.db`

```bash
make build
make prod
make migrate
```