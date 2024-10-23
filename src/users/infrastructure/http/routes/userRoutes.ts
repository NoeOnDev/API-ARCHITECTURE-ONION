import { Router } from "express";
import {
  saveUserController,
  findAllUsersController,
  findUserByIdController,
  findUserByUsernameController,
  findUserByEmailController,
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

export default userRoutes;
