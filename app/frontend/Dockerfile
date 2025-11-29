FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port where Vite runs
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]