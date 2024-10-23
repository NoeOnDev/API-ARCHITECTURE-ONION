import { pool } from "../../_config/db.config";
import { PostgresUserRepository } from "./PostgresUserRepository";
import { SaveUser } from "../application/SaveUser";
import { FindAllUsers } from "../application/FindAllUsers";
import { SaveUserController } from "./http/controllers/SaveUserController";
import { FindAllUsersController } from "./http/controllers/FindAllUsersController";

import { PostgresContactRepository } from "../../contacts/infrastructure/PostgresContactRepository";

const userRepository = new PostgresUserRepository(pool);
const contactRepository = new PostgresContactRepository(pool);

const saveUser = new SaveUser(userRepository, contactRepository);
const findAllUsers = new FindAllUsers(userRepository);

const saveUserController = new SaveUserController(saveUser);
const findAllUsersController = new FindAllUsersController(findAllUsers);

export { saveUserController, findAllUsersController };
