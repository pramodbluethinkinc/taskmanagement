FROM node:18-alpine3.19

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN apk update && apk add curl

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]