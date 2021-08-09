FROM node:fermium-slim

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y curl wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

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
