FROM node:18-alpine3.15

WORKDIR /usr/app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE ${DOCKER_PORT}

CMD ["npm", "run", "start:dev"]