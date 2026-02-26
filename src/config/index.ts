import dotenv from "dotenv";
dotenv.config();

const config = {
  db: process.env.CONNECTION_STR, // use the Neon connection string
  jwtSecret: process.env.JWT_SECRET
};

export default config;