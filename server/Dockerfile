FROM node:latest

WORKDIR /api

COPY package.json .

RUN npm i

# ADD . .

COPY . .

RUN ./build.sh
CMD ["./build.sh"]