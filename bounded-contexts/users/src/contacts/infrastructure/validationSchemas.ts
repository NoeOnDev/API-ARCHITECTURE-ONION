import Joi from "joi";

export const saveContactSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)
    .required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .required(),
  hobby: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),
});
