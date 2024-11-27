import { Router } from "express";
import {
  createAppointmentController,
  findAppointmentsByUserIdController,
  findAppointmentsByLocalityController,
  updateAppointmentStatusController,
  jwtMiddleware,
} from "../../dependencyInjection";
import { validateRequest } from "../../../../_shared/infrastructure/middlewares/validationMiddleware";
import {
  createAppointmentSchema,
  updateAppointmentStatusSchema,
} from "../../validationSchemas";

const appointmentsRoutes = Router();

appointmentsRoutes.post(
  "/",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(createAppointmentSchema),
  createAppointmentController.handle.bind(createAppointmentController)
);

appointmentsRoutes.get(
  "/user",
  jwtMiddleware.handle.bind(jwtMiddleware),
  findAppointmentsByUserIdController.handle.bind(
    findAppointmentsByUserIdController
  )
);

appointmentsRoutes.get(
  "/locality",
  jwtMiddleware.handle.bind(jwtMiddleware),
  findAppointmentsByLocalityController.handle.bind(
    findAppointmentsByLocalityController
  )
);

appointmentsRoutes.patch(
  "/status",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(updateAppointmentStatusSchema),
  updateAppointmentStatusController.handle.bind(
    updateAppointmentStatusController
  )
);

export default appointmentsRoutes;
