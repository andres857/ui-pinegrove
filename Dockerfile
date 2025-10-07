# Etapa de desarrollo 
FROM node:lts-iron AS dev
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "dev", "--", "--host", "0.0.0.0"]

# Etapa de construcción y producción
FROM node:18-alpine as production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]