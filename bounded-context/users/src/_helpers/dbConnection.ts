import { pool } from "../_config/db.config";

export async function connectWithRetry(
  retries: number,
  delay: number,
  callback: () => void
) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log("Database connection successful ✅");
      callback();
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
