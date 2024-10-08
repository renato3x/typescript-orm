FROM node:lts

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
