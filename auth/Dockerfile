FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i --quite

COPY ./ ./

CMD ["npm" , "start"]