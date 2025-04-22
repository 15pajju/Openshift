FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy all files
COPY . .

# Build React app
RUN cd client && npm run build

# Production environment
FROM node:18-alpine

WORKDIR /app

# Copy from build
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./
COPY --from=build /app/client/build ./client/build

# Install production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "server.js"] 