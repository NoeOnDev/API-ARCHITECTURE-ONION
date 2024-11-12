import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  requestPasswordChangeController,
  updatePasswordController,
} from "../../dependencyInjection";

const authRoutes = Router();

authRoutes.post(
  "/register",
  registerUserController.handle.bind(registerUserController)
);

authRoutes.post("/login", loginUserController.handle.bind(loginUserController));

authRoutes.post(
  "/request-password-change",
  requestPasswordChangeController.handle.bind(requestPasswordChangeController)
);

authRoutes.post(
  "/update-password",
  updatePasswordController.handle.bind(updatePasswordController)
);

export default authRoutes;
