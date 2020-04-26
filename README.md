This is a simple project that could be used as a template for Java Web application.

Technologies **not** used:
- No Spring Boot and other Spring Framework modules

Technologies used:
- *sparkjava* - a Java micro framework to create web apps
- *React* - a JS library for building user interface
- *Material-UI* - React components
- *gradle* - a project build tool
- *npm* - a JS build tool


Prerequisites
------
1. npm is installed (version 6.10+)
1. jdk is installed (version 14+)

Running Jar
------
1. To build JAR execute the command `./gradlew shadowJar`
1. To run JAR type `java -jar ./build/libs/app.jar` The app should be available at `http://localhost:8080`. You can change the port with the system property `java  -Dserver.port=8082 -jar ./build/libs/app.jar`

Development mode
------
1. To continuously rebuild JS run `npm run dev`
1. To make jar serve the latest JS use the `dev` system property `java  -Ddev=true -jar ./build/libs/app.jar`







