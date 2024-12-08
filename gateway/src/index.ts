import express from "express";
import proxy from "express-http-proxy";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";
import { env } from "./_config/env.config";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use("/api/v1/users", proxy(env.services.USERS_SERVICE_URL));
app.use("/api/v1/notifications", proxy(env.services.NOTIFICATIONS_SERVICE_URL));
app.use("/api/v1/cases", proxy(env.services.CASES_SERVICE_URL));

app.listen(port, () => {
  console.log(`Gateway running at http://localhost:${port} 🚀`);
});
