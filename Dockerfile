# Etapa de desarrollo 
FROM node:lts-iron AS dev
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "dev"]

# Etapa de construcción
FROM node:lts-iron as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine as production
COPY --from=build /usr/src/app/.output/public /usr/share/nginx/html
COPY --from=build /usr/src/app/.output/server /usr/share/nginx/server
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]