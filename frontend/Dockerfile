FROM node:8.10.0-alpine as builder

RUN apk update && \
    apk upgrade && \
    apk add git

WORKDIR /app
COPY ./build /app/build
COPY package.json .
COPY ./node_modules /app/node_modules

RUN cd /app && npm install --production

RUN npm install -g serve
CMD serve -s build -p 8080
