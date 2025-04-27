FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

# root dependencies
RUN echo "Installing root dependencies..." && \
    npm install && \
    echo "Root dependencies installed"

# Copy client package files
COPY apps/client/package*.json ./apps/client/

# client dependencies
RUN echo "Installing client dependencies..." && \
    cd apps/client && npm install && \
    echo "Client dependencies installed"

COPY apps/client ./apps/client

EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--workspace=apps/client"] 