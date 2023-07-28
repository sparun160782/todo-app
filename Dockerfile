# Stage 1: Build the Angular app
FROM node:18.16.0-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular app source code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the built Angular app
FROM nginx:1.21.0-alpine

# Copy the built app from the previous stage
COPY --from=builder /app/dist/todo-app /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
