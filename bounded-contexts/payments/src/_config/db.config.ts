import { env } from "./env.config";

export const dbConfig = {
  host: env.db.DB_HOST,
  user: env.db.DB_USER,
  port: env.db.DB_PORT,
  password: env.db.DB_PASSWORD,
  database: env.db.DB_NAME,
  connectionLimit: 10,
};
