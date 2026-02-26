import type { Knex } from "knex";
import { env } from "./src/config/env";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: env.CONNECTION_STR
      ? env.CONNECTION_STR
      : {
          host: env.DB_HOST,
          user: env.DB_USER,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
          port: env.DB_PORT,
        },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/database/seeds",
      extension: "ts",
    },
  },
};

export default knexConfig;