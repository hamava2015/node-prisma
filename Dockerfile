FROM node:alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Node.js application will run on
EXPOSE 3000

CMD [ "npm", "run", "start:migrate" ]
