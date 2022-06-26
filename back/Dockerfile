FROM node:16

COPY . /app
WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5000
CMD [ "npm", "start" ]