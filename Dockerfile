FROM node:10-alpine as build
WORKDIR /banking-ui
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN pwd
RUN ls
RUN npm run ng build -- --prod

#------
FROM nginx:1.14.1-alpine
EXPOSE 80
## Copy our default nginx config
COPY container/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY container/start.sh /usr/share/nginx/html/start.sh

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /banking-ui/dist/banking-ng /usr/share/nginx/html
CMD ["sh","start.sh"]
