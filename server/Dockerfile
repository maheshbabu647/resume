# Use Puppeteer's official image with Chromium and dependencies
FROM ghcr.io/puppeteer/puppeteer:latest

# Create app directory inside container
WORKDIR /app

# Copy dependency files as root to avoid permission issues
COPY --chown=pptruser:pptruser package*.json ./

# Install backend dependencies as pptruser
USER pptruser
RUN npm install

# Copy the rest of your app
COPY --chown=pptruser:pptruser . .

# Expose backend port
EXPOSE 4000

# Start your Node.js app
CMD ["node", "index.js"]