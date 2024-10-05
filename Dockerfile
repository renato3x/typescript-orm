FROM node:lts-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]
