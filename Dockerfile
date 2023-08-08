FROM node:18-alpine3.15 as build

WORKDIR /usr/app/dev

COPY . .

RUN npm install --legacy-peer-deps

FROM node:18-alpine3.15 as main
WORKDIR /usr/app/dev
COPY --from=build /usr/app/dev /usr/app/dev

EXPOSE ${DOCKER_PORT}

CMD ["npm", "run", "start:dev"]
