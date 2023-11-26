FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:18-alpine as prod

WORKDIR /app

COPY ./package*.json ./

COPY ./data-source.ts ./

COPY ./.env ./

COPY --from=builder /app/dist /app/dist

RUN npm install