FROM node:current-alpine

RUN mkdir /app
WORKDIR /app

COPY app.js .
COPY LICENSE .
COPY package.json .
COPY build.txt .
COPY views ./views
COPY public ./public

RUN npm install 
RUN npm audit fix --force

EXPOSE 3000

CMD ["node", "app.js"]
