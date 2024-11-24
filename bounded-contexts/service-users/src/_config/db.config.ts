import { Pool } from "pg";
import { env } from "./env.config";

export const pool = new Pool({
  user: env.db.DB_USER,
  password: env.db.DB_PASSWORD,
  database: env.db.DB_NAME,
  host: env.db.DB_HOST,
  port: env.db.DB_PORT,
});
