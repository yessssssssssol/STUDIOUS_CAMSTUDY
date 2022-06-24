FROM node:16

COPY . /app
WORKDIR /app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install

EXPOSE 5000
CMD [ "pm2", "--name", "Server", "start", "--", "start" ]