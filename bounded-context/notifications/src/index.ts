import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/odmConnection";
import tokenRoutes from "./tokens/infrastructure/http/routes/tokenRoutes";

import { createRabbitMQChannel } from "./_config/rabbitmq.config";
import { UserCreatedConsumer } from "./notifications/infrastructure/consumers/UserCreatedConsumer";
import { ContactCreatedConsumer } from "./notifications/infrastructure/consumers/ContactCreatedConsumer";
import { generateTokenForUser } from "./tokens/infrastructure/dependencyInjection";
import { sendNotification } from "./notifications/infrastructure/dependencyInjection";

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
    res.send("Welcome to the notifications API 🚀");
  });

  app.use("/api/v1", tokenRoutes);

  const channel = await createRabbitMQChannel();

  const userCreatedConsumer = new UserCreatedConsumer(
    channel,
    generateTokenForUser,
    sendNotification
  );
  await userCreatedConsumer.consume();

  const contactCreatedConsumer = new ContactCreatedConsumer(
    channel,
    sendNotification
  );
  await contactCreatedConsumer.consume();

  connectWithRetry(10, 10000, () => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port} 🚀`);
    });
  });
})().catch(console.error);
