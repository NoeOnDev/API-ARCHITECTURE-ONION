import { Router } from "express";
import {
  findAllUsersController,
  findUserByIdController,
  findUserByUsernameController,
  findUserByEmailController,
  deleteUserByIdController,
  existsUserByUsernameController,
  existsUserByEmailController,
} from "../../dependencyInjection";

const userRoutes = Router();

userRoutes.get("/", findAllUsersController.handle.bind(findAllUsersController));
userRoutes.get(
  "/id/:id",
  findUserByIdController.handle.bind(findUserByIdController)
);
userRoutes.get(
  "/username/:username",
  findUserByUsernameController.handle.bind(findUserByUsernameController)
);
userRoutes.get(
  "/email/:email",
  findUserByEmailController.handle.bind(findUserByEmailController)
);
userRoutes.delete(
  "/id/:id",
  deleteUserByIdController.handle.bind(deleteUserByIdController)
);
userRoutes.get(
  "/exists/username/:username",
  existsUserByUsernameController.handle.bind(existsUserByUsernameController)
);
userRoutes.get(
  "/exists/email/:email",
  existsUserByEmailController.handle.bind(existsUserByEmailController)
);

export default userRoutes;
