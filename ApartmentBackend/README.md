# App Backend

this repo contains the modeley backend built with node, express and postgres

### Prerequisites

in order to install this repo you need to make sure you have git, node and postgres installed on your machine

### Installing

A step by step series of examples that tell you how to get a development env running

clone this repo

open terminal and change directory to the project root

install project dependencies

```
npm install
```

create .env in project root directory and copy its data from env.example

```
cp env.example .env
```

create database with whatever name you want in postgres
fill out the .env file with the name for database you chose and also change the other env variable according the description provided in `env.example`

run migrations

```
knex migrate:latest
```

run the project

```
npm run dev
```

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Knex](https://knexjs.org/) - Database migration
- [Knex Cheatsheet](https://devhints.io/knex) - Database migration
- [Objectionjs](https://vincit.github.io/objection.js/) - Database ORM
- [npm](https://www.npmjs.com/) - Dependency Management
- [Postgres](https://www.postgresql.org/) - Relational Database Management server

## Authors

- **Ahmed Hatem**
