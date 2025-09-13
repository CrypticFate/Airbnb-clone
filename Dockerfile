# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Production stage
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/dist /app/dist

# Verify build output
RUN ls -la /app/dist/

# Expose port
EXPOSE 5000

# Start serve with SPA support
CMD ["serve", "-s", "/app/dist", "-l", "5000"]