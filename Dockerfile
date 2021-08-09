FROM node:fermium-slim

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y curl

COPY package*.json ./
COPY src src
COPY nest-cli.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm ci
RUN npm install -g cross-env

ENV DB_CONNECTION=mysql
ENV DB_HOST=db
ENV DB_USERNAME=root
ENV DB_PASSWORD=secret
ENV DB_DATABASE=test
ENV DB_PORT=3306
ENV DB_SYNCHRONIZE=true

CMD [ "npm", "run", "test" ]
