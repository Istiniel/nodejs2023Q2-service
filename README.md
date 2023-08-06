# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker compose up --build

npm run migration:generate ./src/db/migrations/migrationName

npm run migration:run

npm run test
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Docker-compose

```
docker compose up --build
```

### Docker check for vulnerabilities

```
npm run docker-scan:app
npm run docker-scan:db
npm run docker-scan
```

### Docker Hub image repository (by istiniel)

[home-library-service2023q2](https://hub.docker.com/search?q=home-library-service2023q2)

### Postgres migration

```
npm run migration:generate ./src/db/migrations/migrationName
npm run migration:run
```
