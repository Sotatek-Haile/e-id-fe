# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that your app will run on
EXPOSE 4000

# Define the command to run your app using npm start
CMD ["yarn", "run", "start"]
