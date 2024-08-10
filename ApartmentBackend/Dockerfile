# Backend/Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

# CMD ["sh", "-c", "npx ts-node -r dotenv/config node_modules/.bin/knex migrate:latest --knexfile config/knexfile.ts && npx ts-node -r dotenv/config node_modules/.bin/knex seed:run --knexfile config/knexfile.ts && npm run start"]

RUN npm install

# RUN npx knex migrate:latest

# RUN npx knex seed:run

# RUN npm run start

ENTRYPOINT npx knex migrate:rollback && npx knex migrate:latest && npx knex seed:run && npm run start
