import { dbConfig } from "../_config/db.config";
import mysql2 from "mysql2/promise";

export async function connectWithRetry(
  retries: number,
  delay: number,
  callback: () => void
) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await mysql2.createConnection(dbConfig);
      console.log("Database connection successful ✅");
      callback();
      await connection.end();
      return;
    } catch (error) {
      console.error(
        `Error connecting to the database (attempt ${i + 1} of ${retries}): ❗`,
        error
      );
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  console.error(
    "Could not connect to the database after multiple attempts. Exiting... ❌"
  );
  process.exit(1);
}
