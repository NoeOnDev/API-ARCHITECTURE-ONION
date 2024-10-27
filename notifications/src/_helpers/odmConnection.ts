import mongoose from "mongoose";
import { mongoConfig } from "../_config/odm.config";

export async function connectWithRetry(
  retries: number,
  delay: number,
  callback: () => void
) {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoConfig.url);
      console.log("MongoDB connection successful ✅");
      callback();
      return;
    } catch (error) {
      console.error(
        `Error connecting to MongoDB (attempt ${i + 1} of ${retries}): ❗`,
        error
      );
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  console.error(
    "Could not connect to MongoDB after multiple attempts. Exiting... ❌"
  );
  process.exit(1);
}
