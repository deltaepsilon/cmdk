FROM mhart/alpine-node:16

COPY package.json /cmdk/package.json
COPY yarn.lock /cmdk/yarn.lock

WORKDIR /cmdk

RUN yarn
