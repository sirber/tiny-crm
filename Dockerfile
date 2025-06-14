# Tiny-CRM Docker File
# based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:24.2-slim AS base
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY prisma/ ./prisma/
RUN npm install

FROM base AS dev
WORKDIR /app
CMD ["npm", "run", "dev"]

FROM deps AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
RUN npm run build

FROM base AS migrate
WORKDIR /app
COPY --from=deps /app/prisma/ ./
RUN npm install prisma pg mysql2

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
COPY --from=migrate --chown=nextjs:nodejs /app/ ./migrate
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["sh", "./entrypoint.sh"]
