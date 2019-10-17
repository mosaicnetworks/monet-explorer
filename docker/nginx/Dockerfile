# # Build app
# FROM node:10 as react-build
# WORKDIR /app
# COPY . ./
# RUN ls -la .
# RUN yarn
# RUN yarn build

# Host on nginx
FROM nginx:1.15.2-alpine

RUN mkdir -p /var/www/static_django

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

