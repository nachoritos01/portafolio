FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm i --force
RUN npm i -g @angular/cli
COPY . ./
RUN ng build

FROM nginx:alpine
COPY --from=build /app/dist/tec.sandbox.web.client/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
