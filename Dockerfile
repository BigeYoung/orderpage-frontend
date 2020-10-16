FROM node:12 AS npm
WORKDIR /root
COPY . /root
RUN npm install \
    && npm run build

FROM nginx
COPY --from=npm /root/dist /usr/share/nginx/html/
