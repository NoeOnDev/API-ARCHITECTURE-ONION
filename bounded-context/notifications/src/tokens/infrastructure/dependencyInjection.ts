import { MongoTokenRepository } from "./MongoTokenRepository";

import { GenerateTokenForUser } from "../application/GenerateTokenForUser";
import { ValidateToken } from "../application/ValidateToken";

import { GenerateTokenForUserController } from "./http/controllers/GenerateTokenForUserController";
import { ValidateTokenController } from "./http/controllers/ValidateTokenController";

import { rabbitmqEventPublisher } from "./eventPublishers/rabbitmqEventPublisher";

const tokenRepository = new MongoTokenRepository();

const generateTokenForUser = new GenerateTokenForUser(tokenRepository);
const validateToken = new ValidateToken(
  tokenRepository,
  rabbitmqEventPublisher
);

const generateTokenForUserController = new GenerateTokenForUserController(
  generateTokenForUser
);
const validateTokenController = new ValidateTokenController(validateToken);

export {
  generateTokenForUserController,
  validateTokenController,
  generateTokenForUser,
};