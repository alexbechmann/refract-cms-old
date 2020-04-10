FROM node:10 as build-deps

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . .

WORKDIR /usr/src/app

RUN npm run build

CMD npm run start:prod

# FROM nginx:1.12-alpine

# COPY --from=build-deps /usr/src/app/dist /etc/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80