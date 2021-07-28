FROM node:fermium-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY src src
COPY nest-cli.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y curl

ENV TYPEORM_CONNECTION=${TYPEORM_CONNECTION:-mysql}
ENV TYPEORM_HOST=${TYPEORM_HOST:-172.17.0.1}
ENV TYPEORM_USERNAME=${TYPEORM_USERNAME:-root}
ENV TYPEORM_PASSWORD=${TYPEORM_PASSWORD:-admin}
ENV TYPEORM_DATABASE=${TYPEORM_DATABASE:-test}
ENV TYPEORM_PORT=${TYPEORM_PORT:-3306}
ENV TYPEORM_LOGGING=${TYPEORM_LOGGING:-true}
ENV TYPEORM_SYNCHRONIZE=${TYPEORM_SYNCHRONIZE:-true}
ENV TYPEORM_ENTITIES=${TYPEORM_ENTITIES:-"dist/**/*.entity.ts,dist/**/*.entity.js"}

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

CMD [ "npm", "run", "start:prod"]
