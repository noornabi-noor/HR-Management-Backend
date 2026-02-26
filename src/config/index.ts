import dotenv from "dotenv";
import { env } from "./env";
dotenv.config();

const config = {
  db: env.CONNECTION_STR, 
  jwtSecret: env.JWT_SECRET
};

export default config;