FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies in production mode
ENV NODE_ENV=production
RUN npm install

# Copy application files
COPY . .
# Ensure only necessary files are copied by using a .dockerignore file
# Create a .dockerignore file to exclude unnecessary files

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
