# Sandbox Web

Este proyecto es una aplicación web desarrollada con Angular. Incluye varias funcionalidades y herramientas para el desarrollo y mantenimiento del código, como Prettier para formateo de código y SonarQube para análisis estático.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu máquina:

- Node.js (>= 21.6.1)
- npm (>= 10.8.2)
- Angular CLI
- Docker y Docker Compose

## Instalación

1. **Clonar el repositorio**:

   ```sh
   git clone git@github.com:ti-tecnologico-de-monterrey-oficial/SandboxCode.git
   cd tec.sandbox.web.client
   ```

2. **Instalar las dependencias**:

   ```sh
   npm install
   ```

## Comandos Disponibles

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo y levantar la aplicación en un ambiente local, ejecuta:

```sh
npm start
```

Esto iniciará el servidor en `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

### Construcción del Proyecto

Para construir el proyecto, ejecuta:

```sh
npm run build
```

Los archivos de construcción se almacenarán en el directorio [`dist/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fignacio%2Fprojects%2FSandboxCode%2Ftec.sandbox.web.client%2Fdist%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2269e3c79a-e11e-4341-a165-30c176bce05c%22%5D '/home/ignacio/projects/SandboxCode/tec.sandbox.web.client/dist/'). Usa la opción `--prod` para una construcción de producción.

### Observador de Construcción

Para construir el proyecto en modo observador, ejecuta:

```sh
npm run watch
```

Esto construirá el proyecto y observará los cambios en los archivos fuente para reconstruir automáticamente.

### Pruebas Unitarias

Para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io), ejecuta:

```sh
npm test
```

### Linter

Para ejecutar el linter y corregir automáticamente los problemas de estilo de código, ejecuta:

```sh
npm run lint
```

### Formateo de Código

Para formatear el código fuente utilizando Prettier, ejecuta:

```sh
npm run format
```

### Análisis de Código con SonarQube

Para ejecutar el análisis de código estático con SonarQube, asegúrate de tener un archivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fignacio%2Fprojects%2FSandboxCode%2Ftec.sandbox.web.client%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2269e3c79a-e11e-4341-a165-30c176bce05c%22%5D '/home/ignacio/projects/SandboxCode/tec.sandbox.web.client/.env') configurado con las variables necesarias y ejecuta:

```sh
npm run sonar
```

### Verificación de Variables de Entorno

Para verificar las variables de entorno cargadas desde el archivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fignacio%2Fprojects%2FSandboxCode%2Ftec.sandbox.web.client%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2269e3c79a-e11e-4341-a165-30c176bce05c%22%5D '/home/ignacio/projects/SandboxCode/tec.sandbox.web.client/.env'), ejecuta:

```sh
npm run print-env
```

## Uso de Docker Compose para SonarQube

Para levantar SonarQube y su base de datos utilizando Docker Compose, sigue estos pasos:

1. **Crear el archivo [`docker-compose.yml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fignacio%2Fprojects%2FSandboxCode%2Ftec.sandbox.web.client%2Fdocker-compose.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2269e3c79a-e11e-4341-a165-30c176bce05c%22%5D '/home/ignacio/projects/SandboxCode/tec.sandbox.web.client/docker-compose.yml')**:

   ```yaml
   version: '3.8'

   services:
     angular-app:
       build:
         context: .
         dockerfile: Dockerfile
       ports:
         - '80:80'
       volumes:
         - ./nginx.conf:/etc/nginx/conf.d/default.conf
     sonarqube:
       image: sonarqube:latest
       ports:
         - '9000:9000'
       environment:
         - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
         - SONAR_WEB_HOST=0.0.0.0
         - SONAR_WEB_PORT=9000
       volumes:
         - sonarqube_conf:/opt/sonarqube/conf
         - sonarqube_data:/opt/sonarqube/data
         - sonarqube_logs:/opt/sonarqube/logs
         - sonarqube_extensions:/opt/sonarqube/extensions

   volumes:
     sonarqube_conf:
     sonarqube_data:
     sonarqube_logs:
     sonarqube_extensions:
   ```

2. **Levantar los servicios con Docker Compose**:

   ```sh
   docker-compose up
   ```

   Esto levantará los servicios de SonarQube, la base de datos PostgreSQL y el escáner de SonarQube.

## Configuración de SonarQube

Asegúrate de tener un archivo [`sonar-project.properties`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fignacio%2Fprojects%2FSandboxCode%2Ftec.sandbox.web.client%2Fsonar-project.properties%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2269e3c79a-e11e-4341-a165-30c176bce05c%22%5D '/home/ignacio/projects/SandboxCode/tec.sandbox.web.client/sonar-project.properties') configurado correctamente. Aquí tienes un ejemplo:

```properties
sonar.projectKey=sanbox
sonar.projectName=sanbox
sonar.projectVersion=1.0
sonar.sourceEncoding=UTF-8
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

## Contribuidores

- J. Navarrete <t-josenavarrete@itesm.mx>

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
