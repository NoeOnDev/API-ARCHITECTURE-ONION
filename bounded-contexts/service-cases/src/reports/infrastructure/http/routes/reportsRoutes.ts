import { Router } from "express";
import {
  createReportController,
  findReportsByLocalityController,
  findReportsByUserIdController,
  updateReportStatusController,
  jwtMiddleware,
} from "../../dependencyInjection";
import { validateRequest } from "../../../../_shared/infrastructure/middlewares/validationMiddleware";
import {
  createReportSchema,
  updateReportStatusSchema,
} from "../../validationSchemas";

const reportsRoutes = Router();

reportsRoutes.post(
  "/",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(createReportSchema),
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
reportsRoutes.patch(
  "/status",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(updateReportStatusSchema),
  updateReportStatusController.handle.bind(updateReportStatusController)
);

export default reportsRoutes;
