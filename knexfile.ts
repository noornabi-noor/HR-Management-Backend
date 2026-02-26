import type { Knex } from "knex";
import config from "./src/config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: config.db,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
  },
};

export default knexConfig;
