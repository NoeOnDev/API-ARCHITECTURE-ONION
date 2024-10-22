import { DataSourceOptions } from "typeorm";
import { env } from "./env.config";

export const config: DataSourceOptions = {
  type: "postgres",
  host: env.db.DB_HOST,
  port: env.db.DB_PORT,
  username: env.db.DB_USER,
  password: env.db.DB_PASSWORD,
  database: env.db.DB_NAME,
  entities: [],
  synchronize: true,
};
