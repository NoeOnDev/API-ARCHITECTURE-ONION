import { MongoTokenRepository } from "./MongoTokenRepository";

import { GenerateTokenForUser } from "../application/GenerateTokenForUser";
import { ValidateToken } from "../application/ValidateToken";

import { ValidateTokenController } from "./http/controllers/ValidateTokenController";

import { rabbitmqEventPublisher } from "./eventPublishers/rabbitmqEventPublisher";

const tokenRepository = new MongoTokenRepository();

const generateTokenForUser = new GenerateTokenForUser(tokenRepository);
const validateToken = new ValidateToken(
  tokenRepository,
  rabbitmqEventPublisher
);

const validateTokenController = new ValidateTokenController(validateToken);

export { validateTokenController, generateTokenForUser };
