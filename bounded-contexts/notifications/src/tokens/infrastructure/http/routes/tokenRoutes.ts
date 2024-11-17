import { Router } from "express";
import { validateTokenController } from "../../dependencyInjection";
import { validateRequest } from "../../../../_helpers/validationMiddleware";
import { validateTokenSchema } from "../../validationSchemas";

const tokenRoutes = Router();

tokenRoutes.post(
  "/token/validate",
  validateRequest(validateTokenSchema),
  validateTokenController.handle.bind(validateTokenController)
);

export default tokenRoutes;
