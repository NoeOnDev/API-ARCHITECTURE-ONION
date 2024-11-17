import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/RegisterUser";
import { VerifyUser } from "../application/VerifyUser";
import { LoginUser } from "../application/LoginUser";
import { RequestPasswordChange } from "../application/RequestPasswordChange";
import { UpdatePassword } from "../application/UpdatePassword";
import { ResendNotification } from "../application/ResendNotification";

import { RegisterUserController } from "./http/controllers/RegisterUserController";
import { LoginUserController } from "./http/controllers/LoginUserController";
import { RequestPasswordChangeController } from "./http/controllers/RequestPasswordChangeController";
import { UpdatePasswordController } from "./http/controllers/UpdatePasswordController";
import { ResendNotificationController } from "./http/controllers/ResendNotificationController";

import { Argon2HashService } from "./services/Argon2HashService";
import { MemoryEventMessageProvider } from "./persistence/MemoryEventMessageProvider";
import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

const hashService = new Argon2HashService();
const messageProvider = new MemoryEventMessageProvider();

const registerUser = new RegisterUser(
  userRepository,
  contactRepository,
  hashService,
  messageProvider,
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
  messageProvider,
  rabbitmqEventPublisher
);

const updatePassword = new UpdatePassword(
  userRepository,
  hashService,
  rabbitmqEventPublisher
);

const resendNotification = new ResendNotification(
  userRepository,
  messageProvider,
  rabbitmqEventPublisher
);

const registerUserController = new RegisterUserController(registerUser);
const loginUserController = new LoginUserController(loginUser);
const requestPasswordChangeController = new RequestPasswordChangeController(
  requestPasswordChange
);
const updatePasswordController = new UpdatePasswordController(updatePassword);
const resendNotificationController = new ResendNotificationController(
  resendNotification
);

export {
  registerUserController,
  loginUserController,
  requestPasswordChangeController,
  updatePasswordController,
  resendNotificationController,
  verifyUser,
};
