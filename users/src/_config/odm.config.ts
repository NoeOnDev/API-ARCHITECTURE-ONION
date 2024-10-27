import { env } from "./env.config";

export const mongoConfig = {
  url: env.mongo.MONGO_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
