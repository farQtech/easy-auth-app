# Build Stage
FROM node:20 AS builder

WORKDIR /app

# Copy package files and turbo config
COPY package*.json ./
COPY turbo.json ./

RUN npm ci

# Copy the entire monorepo
COPY . .

# Install all dependencies (including devDependencies)
RUN npm ci

# Build all apps (api and client)
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Required for some native modules
RUN apk add --no-cache libc6-compat

# Copy built API and Client from builder
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/client/dist ./public
COPY --from=builder /app/apps/api/package*.json ./

# Install only production dependencies for API
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/main"]
