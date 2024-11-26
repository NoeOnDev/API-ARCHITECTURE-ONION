import { pool } from "../../_config/db.config";

import { PostgresAppointmentRepository } from "./persistence/PostgresAppointmentRepository";

import { CreateAppointment } from "../application/CreateAppointment";
import { FindAppointmentsByUserId } from "../application/FindAppointmentsByUserId";
import { FindAppointmentsByLocality } from "../application/FindAppointmentsByLocality";
import { UpdateAppointmentStatus } from "../application/UpdateAppointmentStatus";

import { CreateAppointmentController } from "./http/controllers/CreateAppointmentController";
import { FindAppointmentsByUserIdController } from "./http/controllers/FindAppointmentsByUserIdController";
import { FindAppointmentsByLocalityController } from "./http/controllers/FindAppointmentsByLocalityController";
import { UpdateAppointmentStatusController } from "./http/controllers/UpdateAppointmentStatusController";

import { JwtMiddleware } from "../../_shared/infrastructure/middlewares/JwtMiddleware";
import { JwtTokenService } from "../../reports/infrastructure/services/JwtTokenService";

const jwtTokenService = new JwtTokenService();
const jwtMiddleware = new JwtMiddleware(jwtTokenService);

const appointmentRepository = new PostgresAppointmentRepository(pool);

const createAppointment = new CreateAppointment(appointmentRepository);
const findAppointmentsByUserId = new FindAppointmentsByUserId(
  appointmentRepository
);
const findAppointmentsByLocality = new FindAppointmentsByLocality(
  appointmentRepository
);
const updateAppointmentStatus = new UpdateAppointmentStatus(
  appointmentRepository
);

const createAppointmentController = new CreateAppointmentController(
  createAppointment
);
const findAppointmentsByUserIdController =
  new FindAppointmentsByUserIdController(findAppointmentsByUserId);
const findAppointmentsByLocalityController =
  new FindAppointmentsByLocalityController(findAppointmentsByLocality);
const updateAppointmentStatusController = new UpdateAppointmentStatusController(
  updateAppointmentStatus
);

export {
  createAppointmentController,
  findAppointmentsByUserIdController,
  findAppointmentsByLocalityController,
  updateAppointmentStatusController,
  jwtMiddleware,
};
