import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  requestPasswordChangeController,
  updatePasswordController,
  resendNotificationController,
} from "../../dependencyInjection";
import { validateRequest } from "../../../../_helpers/validationMiddleware";
import {
  registerUserSchema,
  loginUserSchema,
  requestPasswordChangeSchema,
  resendNotificationSchema,
  updatePasswordSchema,
} from "../../validationSchemas";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserController.handle.bind(registerUserController)
);
authRoutes.post(
  "/login",
  validateRequest(loginUserSchema),
  loginUserController.handle.bind(loginUserController)
);
authRoutes.post(
  "/request-password-change",
  validateRequest(requestPasswordChangeSchema),
  requestPasswordChangeController.handle.bind(requestPasswordChangeController)
);
authRoutes.post(
  "/update-password",
  validateRequest(updatePasswordSchema),
  updatePasswordController.handle.bind(updatePasswordController)
);
authRoutes.post(
  "/resend-notification",
  validateRequest(resendNotificationSchema),
  resendNotificationController.handle.bind(resendNotificationController)
);

export default authRoutes;
