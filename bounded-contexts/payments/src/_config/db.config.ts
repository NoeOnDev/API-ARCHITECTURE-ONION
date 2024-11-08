import mysql, { Pool } from "mysql2/promise";
import { env } from "./env.config";

export const pool: Pool = mysql.createPool({
  host: env.db.DB_HOST,
  user: env.db.DB_USER,
  port: env.db.DB_PORT,
  password: env.db.DB_PASSWORD,
  database: env.db.DB_NAME,
});
