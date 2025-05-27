# Tiny CRM

Small CRM for small business. This is a "learning project",
made with NextJS. The database is with Postgresql.

### Requirements

- Docker or Podman, with compose

### Stack

- NextJS 15
- MySQL 8.4
- Prisma

## Development

### Bootstrap

1. Generate a JWT secret

```bash
openssl rand -hex 64
```

2. Save it to `.env.local`

```env
JWT_SECRET=[my secret]
```

3. Start the development server

```bash
make dev
```

### Update the database schema

1. modify `prisma/schema.prisma`
2. run `make migration`

## Enable registration

```env
NEXT_PUBLIC_REGISTER_ENABLED=true
```

## Production

### Via Docker Infra

This software is best run with the [Docker Infra](https://github.com/sirber/infra).
You can use this sample `docker-compose.yml`

```yaml
services:
  app:
    restart: always
    image: ghcr.io/sirber/tiny-crm:latest
    depends_on:
      - db
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:crm@db:3306/tiny-crm
      - NODE_ENV=production
      - JWT_SECRET=[my secret]
      - NEXT_PUBLIC_REGISTER_ENABLED=false

  db:
    image: mysql:8.4
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=crm
      - MYSQL_DATABASE=tiny-crm
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
```

### Via a Docker host

To run elsewhere, you can use the image directly and configure using environment variables:

```env
NEXT_PUBLIC_REGISTER_ENABLED=false
DATABASE_URL=mysql://[user:pass]@[db-name]:3306/[schema]
JWT_SECRET=[my secret]
```
