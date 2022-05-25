FROM registry.redhat.io/rhel8/nodejs-16

ENV APP_ROOT=/opt/app-root

WORKDIR $APP_ROOT

COPY app.js .
COPY LICENSE .
COPY package.json .
COPY build.txt .
COPY views ./views
COPY public ./public

RUN npm install 

EXPOSE 8080

CMD ["node", "app.js"]
