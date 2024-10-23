import { pool } from "../../_config/db.config";
import { PostgresUserRepository } from "./PostgresUserRepository";
import { SaveUser } from "../application/SaveUser";
import { FindAllUsers } from "../application/FindAllUsers";
import { FindUserById } from "../application/FindUserById";
import { FindUserByUsername } from "../application/FindUserByUsername";
import { FindUserByEmail } from "../application/FindUserByEmail";
import { SaveUserController } from "./http/controllers/SaveUserController";
import { FindAllUsersController } from "./http/controllers/FindAllUsersController";
import { FindUserByIdController } from "./http/controllers/FindUserByIdController";
import { FindUserByUsernameController } from "./http/controllers/FindUserByUsernameController";
import { FindUserByEmailController } from "./http/controllers/FindUserByEmailController";

import { PostgresContactRepository } from "../../contacts/infrastructure/PostgresContactRepository";

const userRepository = new PostgresUserRepository(pool);
const contactRepository = new PostgresContactRepository(pool);

const saveUser = new SaveUser(userRepository, contactRepository);
const findAllUsers = new FindAllUsers(userRepository);
const findUserById = new FindUserById(userRepository);
const findUserByUsername = new FindUserByUsername(userRepository);
const findUserByEmail = new FindUserByEmail(userRepository);

const saveUserController = new SaveUserController(saveUser);
const findAllUsersController = new FindAllUsersController(findAllUsers);
const findUserByIdController = new FindUserByIdController(findUserById);
const findUserByUsernameController = new FindUserByUsernameController(
  findUserByUsername
);
const findUserByEmailController = new FindUserByEmailController(
  findUserByEmail
);

export {
  saveUserController,
  findAllUsersController,
  findUserByIdController,
  findUserByUsernameController,
  findUserByEmailController,
};
