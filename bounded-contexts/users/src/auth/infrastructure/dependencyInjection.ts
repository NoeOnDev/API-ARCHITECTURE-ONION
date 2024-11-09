import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/RegisterUser";
import { VerifyUser } from "../application/VerifyUser";
import { LoginUser } from "../application/LoginUser";

import { RegisterUserController } from "./http/controllers/RegisterUserController";
import { LoginUserController } from "./http/controllers/LoginUserController";

import { Argon2HashService } from "./services/Argon2HashService";
import { rabbitmqEventPublisher } from "../../shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

const hashService = new Argon2HashService();

const registerUser = new RegisterUser(
  userRepository,
  contactRepository,
  hashService,
  rabbitmqEventPublisher
);
const verifyUser = new VerifyUser(
  userRepository,
  contactRepository,
  rabbitmqEventPublisher
);
const loginUser = new LoginUser(userRepository, hashService);

const registerUserController = new RegisterUserController(registerUser);
const loginUserController = new LoginUserController(loginUser);

export { registerUserController, verifyUser, loginUserController };
