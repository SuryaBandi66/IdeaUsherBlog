# Use an official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 5001

# Start the application
CMD ["node", "src/server.js"]
