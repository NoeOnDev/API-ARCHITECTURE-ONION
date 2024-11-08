import express from "express";
import cors from "cors";
import { connectWithRetry } from "./_helpers/dbConnection";
import { env } from "./_config/env.config";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
