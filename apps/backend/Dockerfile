# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci  # Clean install
COPY . .
RUN npm run build  # Compiles to /app/dist

# Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev  # Production deps only
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]
EXPOSE 3000