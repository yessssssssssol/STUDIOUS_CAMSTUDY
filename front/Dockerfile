FROM node:16

COPY . /app
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn upgrade
RUN yarn install
RUN yarn build

EXPOSE 3000
CMD [ "npm", "start" ]

