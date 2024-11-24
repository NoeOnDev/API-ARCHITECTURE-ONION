import Joi from "joi";

export const registerUserSchema = Joi.object({
  contactId: Joi.string().uuid().trim().required(),
  username: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  password: Joi.string()
    .min(8)
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required(),
  role: Joi.string().trim().required(),
});

export const loginUserSchema = Joi.object({
  identifier: Joi.alternatives().try(
    Joi.string().email().trim().required(),
    Joi.string().min(3).max(30).trim().regex(/^[a-zA-Z0-9]+$/).required()
  ).required(),
  password: Joi.string().min(8).trim().required(),
});

export const requestPasswordChangeSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

export const updatePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required(),
});
