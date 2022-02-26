FROM node:16-alpine3.14 AS dev

WORKDIR /app

COPY . .

FROM node:16-alpine3.14 AS prod

WORKDIR /app

COPY . .

RUN npm install \
    && npm run build

CMD ["node", "dist/main"]