FROM node:17-alpine AS development

RUN env

WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm install --only=development
COPY ./src ./src
COPY ./test ./test

RUN npm run test
RUN npm run test:e2e
RUN npm run build


FROM node:17-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]