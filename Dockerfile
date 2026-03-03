FROM node:20-alpine

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of backend code
COPY . .

# Tailwind needs this at runtime for watch/build
EXPOSE 3000

CMD ["npm", "run", "start"]
