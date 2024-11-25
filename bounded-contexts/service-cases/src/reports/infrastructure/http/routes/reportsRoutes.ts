import { Router } from "express";
import {
  createReportController,
  findReportsByLocalityController,
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

export default reportsRoutes;
