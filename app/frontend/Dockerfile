FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
# FIX: Use npm install instead of npm ci, or try adding --force to ensure native dependencies are installed.
# We'll stick with npm ci, but try cleaning up the package lock first, as recommended by the error.
RUN rm -f node_modules && npm install --force

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

# --- FINAL STAGE (Development Server) ---

FROM node:20-alpine

# Use the confirmed Vite port (5173) instead of 3000
EXPOSE 5173 

# Copy package files
COPY ./package.json package-lock.json /app/

# CRITICAL FIX: Copy all source code and configuration files (vite.config.js, src/, index.html, etc.)
COPY . /app/ 

# Copy development dependencies (needed for 'npm run dev')
COPY --from=development-dependencies-env /app/node_modules /app/node_modules 

# Copy the production build (optional for dev, but harmless)
COPY --from=build-env /app/build /app/build

WORKDIR /app

CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]