FROM eclipse-temurin:22-jdk

WORKDIR /app

COPY . /app

RUN ./mvnw clean install -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/my-springboot-project-0.0.1-SNAPSHOT.jar"]