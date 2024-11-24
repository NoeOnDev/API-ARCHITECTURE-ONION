import { MongoTokenRepository } from "./persistence/MongoTokenRepository";

import { GenerateTokenForUser } from "../application/GenerateTokenForUser";
import { ValidateToken } from "../application/ValidateToken";

import { ValidateTokenController } from "./http/controllers/ValidateTokenController";

import { rabbitmqEventPublisher } from "./eventPublishers/rabbitmqEventPublisher";

import { JwtTokenService } from "./services/JwtTokenService";

import { JwtMiddleware } from "../../_shared/infrastructure/middlewares/JwtMiddleware";

const tokenRepository = new MongoTokenRepository();

const jwtTokenService = new JwtTokenService();

const generateTokenForUser = new GenerateTokenForUser(tokenRepository);
const validateToken = new ValidateToken(
  tokenRepository,
  jwtTokenService,
  rabbitmqEventPublisher
);

const jwtMiddleware = new JwtMiddleware(jwtTokenService);

const validateTokenController = new ValidateTokenController(validateToken);

export { validateTokenController, generateTokenForUser, jwtMiddleware };
