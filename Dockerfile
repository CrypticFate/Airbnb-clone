# Use Node.js 18 Alpine for smaller image
FROM node:18-alpine

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

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE $PORT

# Start the server
CMD ["npm", "run", "server"]