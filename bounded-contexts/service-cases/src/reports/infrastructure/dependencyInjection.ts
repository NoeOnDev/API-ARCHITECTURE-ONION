import { pool } from "../../_config/db.config";

import { PostgresReportRepository } from "./persistence/PostgresReportRepository";

import { CreateReport } from "../application/CreateReport";
import { FindReportsByLocality } from "../application/FindReportsByLocality";

import { CreateReportController } from "../infrastructure/http/controllers/CreateReportController";
import { FindReportsByLocalityController } from "../infrastructure/http/controllers/FindReportsByLocalityController";

import { JwtMiddleware } from "../../_shared/infrastructure/middlewares/JwtMiddleware";
import { JwtTokenService } from "./services/JwtTokenService";

const jwtTokenService = new JwtTokenService();

const jwtMiddleware = new JwtMiddleware(jwtTokenService);

const reportRepository = new PostgresReportRepository(pool);

const createReport = new CreateReport(reportRepository);
const findReportsByLocality = new FindReportsByLocality(reportRepository);

const createReportController = new CreateReportController(createReport);
const findReportsByLocalityController = new FindReportsByLocalityController(
  findReportsByLocality
);

export {
  createReportController,
  findReportsByLocalityController,
  jwtMiddleware,
};
