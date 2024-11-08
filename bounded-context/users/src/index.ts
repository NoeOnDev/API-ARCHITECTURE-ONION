import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/dbConnection";
import contactRoutes from "./contacts/infrastructure/http/routes/contactRoutes";
import userRoutes from "./users/infrastructure/http/routes/userRoutes";
import authRoutes from "./auth/infrastructure/http/routes/authRoutes";

import { createRabbitMQChannel } from "./_config/rabbitmq.config";
import { UserVerifiedConsumer } from "./auth/infrastructure/consumers/UserVerifiedConsumer";
import { verifyUser } from "./auth/infrastructure/dependencyInjection";

(async () => {
  const app = express();
  const port = env.port.PORT;

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  });

  app.use(limiter);

  app.get("/", (_req, res) => {
    res.send("Welcome to the users API 🚀");
  });

  app.use("/api/v1", contactRoutes);
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", authRoutes);

  const channel = await createRabbitMQChannel();

  const userVerifiedConsumer = new UserVerifiedConsumer(channel, verifyUser);

  userVerifiedConsumer.consume();

  connectWithRetry(10, 10000, () => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port} 🚀`);
    });
  });
})().catch(console.error);
