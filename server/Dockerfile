FROM node:alpine

WORKDIR /api

COPY package.json .

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN chmod +x ./build.sh
CMD ["./build.sh"]