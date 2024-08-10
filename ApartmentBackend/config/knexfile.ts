import { Knex } from "knex";
import dotenv from "dotenv";
const knex_migration_table_name = "knex_migrations";
const migrations_folder = `${__dirname}/../migrations`;
const seeds_folder = `${__dirname}/../seeds`;
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: "635241",
      charset: "utf-8",
    },
    migrations: {
      tableName: knex_migration_table_name,
      directory: migrations_folder,
    },
    seeds: {
      directory: seeds_folder,
    },
    acquireConnectionTimeout: 1000,
    debug: true,
  },
};

export default config;
