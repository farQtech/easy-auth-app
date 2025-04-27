# Build Stage
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./

# Install  dependencies
RUN echo "Installing dependencies..." && \
    npm ci  && \
    echo "Dependencies installed"

# Copy the full monorepo
COPY . .

# Build all apps
RUN echo "Building applications..." && \
    npx turbo run build && \
    echo "Applications built"


#  Production Stage Alpine for a smaller image 
FROM node:20-alpine AS runner

WORKDIR /app

# Required for some native modules
RUN apk add --no-cache libc6-compat

# Copy necessary files from builder
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/client/dist ./public
COPY --from=builder /app/apps/api/package*.json ./

# Install only production dependencies
RUN echo "Installing production dependencies..." && \
    npm install --production && \
    echo "Production dependencies installed"

EXPOSE 3000

CMD ["node", "dist/main"]
