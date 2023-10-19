FROM node:20.5.0

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install Angular CLI and application dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the application
COPY . .

# Build the Angular app for production
RUN ng build --output-path=/app/dist/escrow

