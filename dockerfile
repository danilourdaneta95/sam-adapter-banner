FROM node:16.18.1-alpine
WORKDIR /usr/src/app

LABEL name="admision-centralizada-banner" version="node:16.10.0-alpine"
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --network-timeout 1000000

COPY . ./

RUN yarn build

EXPOSE 3005

ENTRYPOINT [ "yarn", "start:prod" ]
