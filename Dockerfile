# Use a Node.js image to build the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use a lightweight Nginx image to serve the app
FROM nginx:1.25-alpine

# Copy the built Angular app to Nginx
COPY --from=build /app/dist/quiz-app-frontend /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80
