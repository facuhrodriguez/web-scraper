FROM node:16.20.0-alpine3.18 as build

RUN mkdir -p /usr/src/web-scrapper

WORKDIR /usr/src/web-scrapper

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm run start