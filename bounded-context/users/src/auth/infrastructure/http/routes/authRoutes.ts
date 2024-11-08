import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../../dependencyInjection";

const authRoutes = Router();

authRoutes.post(
  "/register",
  registerUserController.handle.bind(registerUserController)
);

authRoutes.post("/login", loginUserController.handle.bind(loginUserController));

export default authRoutes;
