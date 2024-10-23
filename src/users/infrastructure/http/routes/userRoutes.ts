import { Router } from "express";
import {
  saveUserController,
  findAllUsersController,
  findUserByIdController,
  findUserByUsernameController,
  findUserByEmailController,
  deleteUserByIdController,
  existsUserByUsernameController,
  existsUserByEmailController,
} from "../../dependencyInjection";

const userRoutes = Router();

userRoutes.post("/users", saveUserController.handle.bind(saveUserController));
userRoutes.get(
  "/users",
  findAllUsersController.handle.bind(findAllUsersController)
);
userRoutes.get(
  "/users/id/:id",
  findUserByIdController.handle.bind(findUserByIdController)
);
userRoutes.get(
  "/users/username/:username",
  findUserByUsernameController.handle.bind(findUserByUsernameController)
);
userRoutes.get(
  "/users/email/:email",
  findUserByEmailController.handle.bind(findUserByEmailController)
);
userRoutes.delete(
  "/users/id/:id",
  deleteUserByIdController.handle.bind(deleteUserByIdController)
);
userRoutes.get(
  "/users/exists/username/:username",
  existsUserByUsernameController.handle.bind(existsUserByUsernameController)
);
userRoutes.get(
  "/users/exists/email/:email",
  existsUserByEmailController.handle.bind(existsUserByEmailController)
);

export default userRoutes;
