FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose port used by React dev server
EXPOSE 5173

# Start the app in development mode
CMD ["npm", "run","dev"]
