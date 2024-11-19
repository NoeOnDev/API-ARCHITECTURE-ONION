import Joi from "joi";

export const registerUserSchema = Joi.object({
  contactId: Joi.string().uuid().trim().required(),
  username: Joi.string().min(3).max(30).trim().required(),
  password: Joi.string().min(8).trim().required(),
});

export const loginUserSchema = Joi.object({
  identifier: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

export const requestPasswordChangeSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

export const resendNotificationSchema = Joi.object({
  userId: Joi.string().uuid().trim().required(),
  eventType: Joi.string().trim().required(),
});

export const updatePasswordSchema = Joi.object({
  userId: Joi.string().uuid().trim().required(),
  eventType: Joi.string().trim().required(),
  newPassword: Joi.string().min(8).trim().required(),
});
