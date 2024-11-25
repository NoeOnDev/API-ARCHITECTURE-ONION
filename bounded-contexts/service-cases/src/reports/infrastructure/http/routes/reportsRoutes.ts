import { Router } from "express";
import {
  createReportController,
  findReportsByLocalityController,
  findReportsByUserIdController,
  jwtMiddleware,
} from "../../dependencyInjection";

const reportsRoutes = Router();

reportsRoutes.post(
  "/",
  jwtMiddleware.handle.bind(jwtMiddleware),
  createReportController.handle.bind(createReportController)
);
reportsRoutes.get(
  "/",
  jwtMiddleware.handle.bind(jwtMiddleware),
  findReportsByLocalityController.handle.bind(findReportsByLocalityController)
);
reportsRoutes.get(
  "/user",
  jwtMiddleware.handle.bind(jwtMiddleware),
  findReportsByUserIdController.handle.bind(findReportsByUserIdController)
);

export default reportsRoutes;
