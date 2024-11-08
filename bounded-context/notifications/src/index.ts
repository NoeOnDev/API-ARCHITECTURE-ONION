import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/odmConnection";
import { initializeConsumers } from "./_helpers/initializeConsumers";
import tokenRoutes from "./tokens/infrastructure/http/routes/tokenRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

app.get("/", (_req, res) => {
  res.send("Welcome to the notifications API 🚀");
});

app.use("/api/v1", tokenRoutes);

connectWithRetry(10, 10000, () => {
  initializeConsumers();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
