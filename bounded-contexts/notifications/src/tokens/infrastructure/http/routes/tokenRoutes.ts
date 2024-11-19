import { Router } from "express";
import {
  validateTokenController,
  jwtMiddleware,
} from "../../dependencyInjection";
import { validateRequest } from "../../../../_shared/infrastructure/middlewares/validationMiddleware";
import { validateTokenSchema } from "../../validationSchemas";

const tokenRoutes = Router();

tokenRoutes.post(
  "/token/validate",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(validateTokenSchema),
  validateTokenController.handle.bind(validateTokenController)
);

export default tokenRoutes;
