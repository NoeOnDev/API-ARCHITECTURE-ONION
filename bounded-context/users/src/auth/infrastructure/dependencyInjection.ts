import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/RegisterUser";

import { RegisterUserController } from "./http/controllers/RegisterUserController";

const registerUser = new RegisterUser(userRepository, contactRepository);

const registerUserController = new RegisterUserController(registerUser);

export { registerUserController };
