import express from "express";
import cors from "cors";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/odmConnection";
import { initializeConsumers } from "./_helpers/initializeConsumers";
import tokenRoutes from "./tokens/infrastructure/http/routes/tokenRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use(tokenRoutes);

connectWithRetry(10, 10000, () => {
  initializeConsumers(10, 10000);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
