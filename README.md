# Tiny CRM

Small CRM for small business. This is a "learning project",
made with NextJS. The database is in MySQL format.

### Requirements

- Docker

### Stack

- NextJS 15
- PostgreSQL 17
- Prisma

## Development

### Bootstrap

```bash
make dev
```

### Update the database schema

1. modify `prisma/schema.prisma`
2. run `make migration`

## Production

### Via Docker Infra

This software is best run with the [Docker Infra](https://github.com/sirber/infra).
You can use this sample `docker-compose.yml`

```yaml
services:
  app:
    restart: unless-stopped
    image: ghcr.io/sirber/tiny-crm:latest
    working_dir: /app
    depends_on:
      - db
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:crm@db:5432/tiny-crm?connection_limit=10
      - NODE_ENV=production

  migrate:
    image: ghcr.io/sirber/tiny-crm-migrate:latest
    restart: "no"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:crm@db:5432/tiny-crm?connection_limit=10
    command: ["npx", "prisma", "migrate", "deploy"] # Command to run migrations

  db:
    image: postgres:17-alpine
    restart: unless-stopped
    command: -c 'max_connections=1000'
    environment:
      - POSTGRES_PASSWORD=crm
    ports:
      - "5432:5432"
    volumes:
      - ./data:/var/lib/postgresql/data
```

### Via a Docker host

To run elsewhere, you can use the image directly and configure using environment variables:

```
NEXT_PUBLIC_REGISTER_ENABLED=true
DATABASE_URL=postgresql://[user:pass]@[db-name]:5432/[schema]?connection_limit=10
```

docker build --target migrate -t tiny-crm-migrate .
docker build --target runner -t tiny-crm .
