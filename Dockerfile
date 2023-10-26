FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Node.js application will run on
EXPOSE 5000

# Prisma
RUN npx prisma generate

CMD [ "npm", "run", "dev" ]
