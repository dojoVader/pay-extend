# Use the official Node.js image as the base image
FROM node:20-alpine AS build

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Copy the rest of the application files
COPY . .

# Install the application dependencies
RUN npm install
# Expose the application port
EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /apps

RUN cd vue-dashboard && npm run build

RUN cp vue-dashboard/exports/* -R backend/public/

CMD ["npm", "run", "start"]
