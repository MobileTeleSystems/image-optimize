FROM node:18-alpine AS development

WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm ci --only=development
COPY ./src ./src
COPY ./test ./test

RUN npm run test
RUN npm run test:e2e
RUN npm run build


FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]