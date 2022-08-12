FROM node:latest

WORKDIR /api

COPY package.json .

RUN npm i

COPY . .

RUN chmod +x ./build.sh
CMD ["./build.sh"]