import express from "express";
import cors from "cors";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/dbConnection";
import reportsRoutes from "./reports/infrastructure/http/routes/reportsRoutes";
import appointmentsRoutes from "./appointments/infrastructure/http/routes/appointmentsRoutes";
import newsRoutes from "./news/infrastructure/http/routes/newsRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use(reportsRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/news", newsRoutes);

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
