import express from "express";
import cors from "cors";
import { connectWithRetry } from "./_helpers/dbConnection";
import { env } from "./_config/env.config";
import { productRoutes } from "./products/infrastructure/http/routes/productRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use(productRoutes);

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
