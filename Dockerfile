FROM node:16-alpine3.14

WORKDIR /app

COPY . .

RUN npm install \
    && npm run build

CMD ["node", "dist/main"]