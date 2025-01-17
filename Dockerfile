# Use the official Node.js image as the base image
# Choose the version of Node.js that is compatible with your project
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port that Vite runs on (default is 5173)
EXPOSE 5173

# Set the environment variable for production
ENV NODE_ENV=production

# Run the Vite development server by default
# Replace `npm run dev` with your specific start script if different
CMD ["npm", "run", "dev"]
