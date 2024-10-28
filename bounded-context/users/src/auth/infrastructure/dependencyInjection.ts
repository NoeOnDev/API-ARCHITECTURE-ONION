import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/RegisterUser";

import { RegisterUserController } from "./http/controllers/RegisterUserController";

import { Argon2HashService } from "./services/Argon2HashService";

const hashService = new Argon2HashService();

const registerUser = new RegisterUser(
  userRepository,
  contactRepository,
  hashService
);

const registerUserController = new RegisterUserController(registerUser);

export { registerUserController };
