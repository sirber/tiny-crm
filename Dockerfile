# Stage 1: Dependencies
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json /app/.next /app/public /app/
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]