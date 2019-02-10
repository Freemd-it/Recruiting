#! /bin/sh

docker rm -f `docker ps | grep frontend_prod | awk '{print $1}'`
docker rmi -f frontend_prod
docker-compose up -d --build

