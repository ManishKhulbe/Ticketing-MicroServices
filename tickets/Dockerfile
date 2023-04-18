FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i --quite --only=prod

COPY ./ ./

CMD ["npm" , "start"]