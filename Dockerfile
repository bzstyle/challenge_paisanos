FROM node:12.18.3-alpine as dev

WORKDIR /app

RUN npm i -g @nestjs/cli

CMD ["npm", "run", "start:dev"]



FROM node:12.18.3-alpine as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build



FROM node:12.18.3-alpine

WORKDIR /app/dist

COPY --from=build /app/dist /app/dist

CMD ["npm", "run", "start:prod"]
