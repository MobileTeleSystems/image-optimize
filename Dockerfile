FROM node:25-alpine AS development

WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json eslint.config.mjs ./
RUN npm ci
COPY ./src ./src
COPY ./test ./test

RUN npm run test
RUN npm run test:e2e
RUN npm run build


FROM node:25-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

COPY package*.json ./
RUN sed -i '/"prepare":/d' ./package.json
RUN npm ci --omit=dev
COPY --from=development /app/dist ./dist

USER nestjs

CMD ["node", "dist/main"]