FROM node:22-alpine AS base

FROM base AS builder
WORKDIR /app
COPY package*.json prisma/ ./
RUN npm i
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json entrypoint.sh prisma/ ./
RUN npm i --omit dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN chmod +x entrypoint.sh
EXPOSE 3000
CMD ["sh", "./entrypoint.sh"]
