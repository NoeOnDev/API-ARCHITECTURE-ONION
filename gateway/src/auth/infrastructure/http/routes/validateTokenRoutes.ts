import { Router } from "express";
import { validateTokenController } from "../controllers/validateTokenController";
import { jwtMiddleware } from "../../dependencyInjection";

const validateTokenRoutes = Router();

validateTokenRoutes.get(
  "/verify-token",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateTokenController
);

export default validateTokenRoutes;
