# Tiny CRM

Small CRM for small business. This is a "learning project",
made with NextJS. The database is in MySQL format.

### Requirements

- Docker

### Stack

- NextJS
- MySQL 8
- Prisma

## Development

### Bootstrap

```bash
make dev
make migrate
```

### Update the database schema

1. modify `prisma/schema.prisma`
2. run `make migration`

## Production

This software is best run with the [Docker Infra](https://github.com/sirber/infra).
You can use this sample `docker-compose.yml`

```yaml
services:
  app:
    restart: unless-stopped
    image: TODO
    working_dir: /app
    depends_on:
      - db
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:crm@db:3306/tiny-crm
      - NODE_ENV=production

  db:
    restart: unless-stopped
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=crm
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

TODO: migrate in an entrypoint?
