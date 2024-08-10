# Frontend/Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

ENTRYPOINT npm install && npm run dev
