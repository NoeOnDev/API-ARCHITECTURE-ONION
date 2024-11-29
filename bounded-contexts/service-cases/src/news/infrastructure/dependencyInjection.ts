import { pool } from "../../_config/db.config";

import { PostgresNewsRepository } from "./persistence/PostgresNewsRepository";

import { CreateNews } from "../application/CreateNews";
import { FindNewsByUserId } from "../application/FindNewsByUserId";
import { FindNewsByLocality } from "../application/FindNewsByLocality";

import { CreateNewsController } from "./http/controllers/CreateNewsController";
import { FindNewsByUserIdController } from "./http/controllers/FindNewsByUserIdController";
import { FindNewsByLocalityController } from "./http/controllers/FindNewsByLocalityController";

import { JwtTokenService } from "../../reports/infrastructure/services/JwtTokenService";
import { JwtMiddleware } from "../../_shared/infrastructure/middlewares/JwtMiddleware";

import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

const tokenService = new JwtTokenService();
const jwtMiddleware = new JwtMiddleware(tokenService);

const newsRepository = new PostgresNewsRepository(pool);

const createNews = new CreateNews(newsRepository, rabbitmqEventPublisher);
const findNewsByUserId = new FindNewsByUserId(newsRepository);
const findNewsByLocality = new FindNewsByLocality(newsRepository);

const createNewsController = new CreateNewsController(createNews);
const findNewsByUserIdController = new FindNewsByUserIdController(
  findNewsByUserId
);
const findNewsByLocalityController = new FindNewsByLocalityController(
  findNewsByLocality
);

export {
  createNewsController,
  findNewsByUserIdController,
  findNewsByLocalityController,
  jwtMiddleware,
};
