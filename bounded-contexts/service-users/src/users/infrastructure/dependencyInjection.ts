import { pool } from "../../_config/db.config";

import { FindAllUsers } from "../application/FindAllUsers";
import { FindUserById } from "../application/FindUserById";
import { FindUserByUsername } from "../application/FindUserByUsername";
import { FindUserByEmail } from "../application/FindUserByEmail";
import { DeleteUserById } from "../application/DeleteUserById";

import { FindAllUsersController } from "./http/controllers/FindAllUsersController";
import { FindUserByIdController } from "./http/controllers/FindUserByIdController";
import { FindUserByUsernameController } from "./http/controllers/FindUserByUsernameController";
import { FindUserByEmailController } from "./http/controllers/FindUserByEmailController";
import { DeleteUserByIdController } from "./http/controllers/DeleteUserByIdController";

import { PostgresUserRepository } from "./persistence/PostgresUserRepository";

const userRepository = new PostgresUserRepository(pool);

const findAllUsers = new FindAllUsers(userRepository);
const findUserById = new FindUserById(userRepository);
const findUserByUsername = new FindUserByUsername(userRepository);
const findUserByEmail = new FindUserByEmail(userRepository);
const deleteUserById = new DeleteUserById(userRepository);

const findAllUsersController = new FindAllUsersController(findAllUsers);
const findUserByIdController = new FindUserByIdController(findUserById);
const findUserByUsernameController = new FindUserByUsernameController(
  findUserByUsername
);
const findUserByEmailController = new FindUserByEmailController(
  findUserByEmail
);
const deleteUserByIdController = new DeleteUserByIdController(deleteUserById);

export {
  userRepository,
  findAllUsersController,
  findUserByIdController,
  findUserByUsernameController,
  findUserByEmailController,
  deleteUserByIdController,
};
