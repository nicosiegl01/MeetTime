# Meettime-Backend
### START DATABASE
- Open new terminal a folder with docker-compose.ymal file
- Exec 'docker-compose up' command
- Open PGAdmin at via docker dektop

Exportcommand 
- docker exec -t postgres_container pg_dumpall -c -s -U db-user > ./export.sql



### RUN IN DOCKER WITH THESE COMMANDS
- ./mvnw package
- docker build -f src/main/docker/Dockerfile.jvm -t quarkus/meettime-jvm . 
- docker run -i --rm -p 8080:8080 -p 5005:5005 -e JAVA_ENABLE_DEBUG="true" quarkus/meettime-jvm