import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/RegisterUser";
import { VerifyUser } from "../application/VerifyUser";
import { LoginUser } from "../application/LoginUser";
import { RequestPasswordChange } from "../application/RequestPasswordChange";
import { UpdatePassword } from "../application/UpdatePassword";

import { RegisterUserController } from "./http/controllers/RegisterUserController";
import { LoginUserController } from "./http/controllers/LoginUserController";
import { RequestPasswordChangeController } from "./http/controllers/RequestPasswordChangeController";
import { UpdatePasswordController } from "./http/controllers/UpdatePasswordController";

import { Argon2HashService } from "./services/Argon2HashService";
import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

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

const requestPasswordChange = new RequestPasswordChange(
  userRepository,
  rabbitmqEventPublisher
);

const updatePassword = new UpdatePassword(userRepository, hashService);

const registerUserController = new RegisterUserController(registerUser);
const loginUserController = new LoginUserController(loginUser);
const requestPasswordChangeController = new RequestPasswordChangeController(
  requestPasswordChange
);
const updatePasswordController = new UpdatePasswordController(updatePassword);

export {
  registerUserController,
  loginUserController,
  requestPasswordChangeController,
  updatePasswordController,
  verifyUser,
};
