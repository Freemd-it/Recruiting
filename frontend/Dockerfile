FROM node:8.10.0-alpine as builder

RUN apk update && \
    apk upgrade && \
    apk add git

WORKDIR /app
COPY package.json .
RUN npm install --production

COPY . /app

RUN apk update && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone
    
RUN npm run build

FROM nginx:1.13.9-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
