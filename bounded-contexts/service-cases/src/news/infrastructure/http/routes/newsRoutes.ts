import { Router } from "express";
import {
  createNewsController,
  findNewsByLocalityController,
  findNewsByUserIdController,
  jwtMiddleware,
} from "../../dependencyInjection";

const newsRoutes = Router();

newsRoutes.post(
  "/",
  jwtMiddleware.handle.bind(jwtMiddleware),
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
