FROM node:20-alpine

WORKDIR /app

# root package files
COPY package*.json ./
COPY turbo.json ./

#  root dependencies
RUN echo "Installing root dependencies..." && \
    npm install && \
    echo "Root dependencies installed"

COPY apps/api/package*.json ./apps/api/

# API dependencies
RUN echo "Installing API dependencies..." && \
    cd apps/api && npm install && \
    echo "API dependencies installed"

COPY apps/api ./apps/api

EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev", "--workspace=apps/api"] 