# Stage 1: Dependencies
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json prisma/schema.prisma ./
RUN npm install --production=false --no-fund --no-audit
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json /app/.next /app/public /app/
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
RUN npm install --production --no-fund --no-audit
EXPOSE 3000
CMD ["npm", "start"]