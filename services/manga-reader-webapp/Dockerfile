FROM node:16-alpine AS development
ENV NODE_ENV=development

# Setup the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]