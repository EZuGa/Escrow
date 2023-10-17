FROM node:20.5.0

WORKDIR /app

# Update npm to the latest version
RUN npm install -g npm@latest

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install Angular CLI and application dependencies
RUN npm install -g @angular/cli && npm install


# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
