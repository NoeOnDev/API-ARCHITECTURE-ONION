import { Router } from "express";
import { registerUserController } from "../../dependencyInjection";

const authRoutes = Router();

authRoutes.post(
  "/register",
  registerUserController.handle.bind(registerUserController)
);

export default authRoutes;
