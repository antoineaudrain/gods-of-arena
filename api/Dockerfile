FROM node:12-alpine

# Create app directory
WORKDIR /api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "src/api.js" ]