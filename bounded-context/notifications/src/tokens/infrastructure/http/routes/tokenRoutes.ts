import { Router } from "express";
import { validateTokenController } from "../../dependencyInjection";

const tokenRoutes = Router();

tokenRoutes.post(
  "/token/validate",
  validateTokenController.handle.bind(validateTokenController)
);

export default tokenRoutes;
