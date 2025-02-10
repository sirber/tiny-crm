FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json prisma/ ./
RUN npm i
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json entrypoint.sh prisma/ ./
RUN npm i --omit dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["./entrypoint.sh"]
