#! /bin/sh

docker rm -f `docker ps | grep recruiting-web_prod | awk '{print $1}'`
docker rmi -f recruiting-web_prod
npm run build &&
docker-compose up -d --build

