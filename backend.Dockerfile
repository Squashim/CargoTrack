FROM amazoncorretto:22-alpine
WORKDIR /app

# Instalacja Mavena
RUN apk add --no-cache maven

COPY backend/cargoTrack/pom.xml .
RUN mvn dependency:go-offline

# Montowanie katalogu z kodem źródłowym
COPY backend/cargoTrack /app
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN apk add inotify-tools
RUN chmod +x /docker-entrypoint.sh
EXPOSE 8080

# Uruchomienie Spring Boot z automatycznym przeładowywaniem
ENTRYPOINT ["/docker-entrypoint.sh"]
