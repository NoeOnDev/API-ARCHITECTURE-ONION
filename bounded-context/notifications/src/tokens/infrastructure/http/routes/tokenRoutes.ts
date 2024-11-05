import { Router } from "express";
import {
  generateTokenForUserController,
  validateTokenController,
} from "../../dependencyInjection";

const tokenRoutes = Router();

tokenRoutes.post(
  "/token/generate",
  generateTokenForUserController.handle.bind(generateTokenForUserController)
);
tokenRoutes.post(
  "/token/validate",
  validateTokenController.handle.bind(validateTokenController)
);

export default tokenRoutes;
