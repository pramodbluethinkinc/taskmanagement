# Step 1: Build the app in a node environment
FROM node:18-alpine3.19 AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_REDIRECT_URI
ARG VITE_AUTH_URL
ARG VITE_CLIENT_ID
ARG VITE_REALM
ARG VITE_API_BASE_URL
ARG VITE_AVATAR_BASE_URL

ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI
ENV VITE_AUTH_URL=$VITE_AUTH_URL
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_REALM=$VITE_REALM
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_AVATAR_BASE_URL=$VITE_AVATAR_BASE_URL

RUN yarn build

# Step 2: Serve the app from a lightweight node environment
FROM node:18-alpine3.19

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json ./
COPY yarn.lock ./
COPY vite.config.ts ./

RUN apk update && apk add curl
RUN yarn install --production
RUN yarn add vite typescript -g

EXPOSE 5173

CMD ["yarn","run", "preview", "--host"]