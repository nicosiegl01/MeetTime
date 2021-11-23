# Meettime-Backend
### START DATABASE

- Open new terminal a folder with docker-compose.ymal file
- Exec 'docker-compose up' command
- Open PGAdmin at via docker dektop

Exportcommand 
- docker exec -t my-db pg_dumpall -c -s -U db-user > ./export.sql



### RUN IN DOCKER WITH THESE COMMANDS
(start docker desktop before)

- ./mvnw package
- docker build -f src/main/docker/Dockerfile.jvm -t quarkus/meettime-jvm . 
- docker run --name meettime-backend -d -i --rm -p 80:80 quarkus/meettime-jvm