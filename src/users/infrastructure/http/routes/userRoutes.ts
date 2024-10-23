import { Router } from "express";
import {
  saveUserController,
  findAllUsersController,
} from "../../dependencyInjection";

const userRoutes = Router();

userRoutes.post("/users", saveUserController.handle.bind(saveUserController));
userRoutes.get(
  "/users",
  findAllUsersController.handle.bind(findAllUsersController)
);

export default userRoutes;
