import express from "express";
import cors from "cors";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/dbConnection";
import { initializeConsumers } from "./_helpers/initializeConsumers";
import contactRoutes from "./contacts/infrastructure/http/routes/contactRoutes";
import userRoutes from "./users/infrastructure/http/routes/userRoutes";
import authRoutes from "./auth/infrastructure/http/routes/authRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use(contactRoutes);
app.use(userRoutes);
app.use(authRoutes);

connectWithRetry(10, 10000, () => {
  initializeConsumers(10, 10000);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
