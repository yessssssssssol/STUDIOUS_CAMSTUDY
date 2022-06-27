FROM node:16

COPY . /app
WORKDIR /app

COPY package*.json ./

RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]