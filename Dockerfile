FROM node:22-alpine AS base

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm i
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS migrate
WORKDIR /app
COPY prisma/ ./
RUN npm install prisma pg

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
COPY --from=migrate /app/ ./migrate
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["sh", "./entrypoint.sh"]
