#!/bin/sh

set -e

echo "Running migrations..."
cd migrate && npx prisma migrate deploy

echo "Starting Next.js server..."
node server.js
