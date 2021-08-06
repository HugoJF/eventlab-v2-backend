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
RUN npm run build

ENV DB_CONNECTION=${DB_CONNECTION:-mysql}
ENV DB_HOST=${DB_HOST:-172.17.0.1}
ENV DB_USERNAME=${DB_USERNAME:-root}
ENV DB_PASSWORD=${DB_PASSWORD:-secret}
ENV DB_DATABASE=${DB_DATABASE:-test}
ENV DB_PORT=${DB_PORT:-3306}
ENV DB_SYNCHRONIZE=${DB_SYNCHRONIZE:-true}

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

CMD [ "npm", "run", "start:prod"]
