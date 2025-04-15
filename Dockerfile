# Tiny-CRM Docker File
# based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22-slim AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json prisma/ ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS migrate
WORKDIR /app
COPY prisma/ ./
RUN npm install prisma pg

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
