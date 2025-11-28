FROM node:20-alpine AS builder

WORKDIR /app/frontend

# 1. Copy package files first to optimize Docker layer caching.
#    If only the source code changes, npm install won't re-run.
COPY package.json .
COPY package-lock.json .

# 2. Install dependencies (using --production flag if you only need production dependencies)
RUN npm install

# 3. Copy the rest of the application source code
COPY . .

# 4. Run the production build command
#    This creates the static HTML, CSS, and JS files in the 'build' directory.
RUN npm run build

# Stage 2: The Production Server Environment (Final Image)
###################################################
# Use a tiny Nginx image to serve the static files. This image is very small (under 20MB).
FROM nginx:alpine

# 1. Copy the custom Nginx configuration (essential for client-side routing like React Router)
#    This file must be created locally (e.g., frontend/nginx.conf).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2. Copy the built static files from the 'builder' stage
#    --from=builder tells Docker to pull files from the previous stage.
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Expose port 80 (the default Nginx port)
EXPOSE 80

# The default Nginx CMD runs the web server.
CMD ["nginx", "-g", "daemon off;"]