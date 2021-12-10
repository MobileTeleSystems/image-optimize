FROM node:16-alpine3.11 AS development

RUN env

WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm install --only=development
COPY ./src ./src
RUN npm run build


FROM node:16-alpine3.11 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]