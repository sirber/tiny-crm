#!/bin/sh

set -e

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting Next.js server..."
exec node server.js
