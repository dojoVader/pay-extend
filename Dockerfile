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

WORKDIR /apps/backend

RUN npm install



ENV USERNAMER=nestjs_user
ENV PASSWORDR=nestjs_password
ENV DB_NAME=nestjs_db
ENV HOST=localhost

CMD ["npm", "run","start:dev"]
