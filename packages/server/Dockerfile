FROM node:8

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:docker

CMD [ "npm", "run", "start:docker" ]