import { Pool } from "pg";
import config from ".";

// pool create
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

