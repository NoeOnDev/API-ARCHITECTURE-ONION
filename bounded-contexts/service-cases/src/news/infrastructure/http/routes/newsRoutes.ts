import { Router } from "express";
import {
  createNewsController,
  findNewsByLocalityController,
  findNewsByUserIdController,
  jwtMiddleware,
} from "../../dependencyInjection";
import { validateRequest } from "../../../../_shared/infrastructure/middlewares/validationMiddleware";
import { createNewsSchema } from "../../validationSchemas";

const newsRoutes = Router();

newsRoutes.post(
  "/",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(createNewsSchema),
  createNewsController.handle.bind(createNewsController)
);
newsRoutes.get(
  "/user",
  jwtMiddleware.handle.bind(jwtMiddleware),
  findNewsByUserIdController.handle.bind(findNewsByUserIdController)
);
newsRoutes.get(
  "/locality",
  jwtMiddleware.handle.bind(jwtMiddleware),
  findNewsByLocalityController.handle.bind(findNewsByLocalityController)
);

export default newsRoutes;
