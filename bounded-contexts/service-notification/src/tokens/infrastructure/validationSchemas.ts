import Joi from "joi";

export const validateTokenSchema = Joi.object({
  code: Joi.string()
    .pattern(/^\d{5}$/, { name: "5 digits" })
    .trim()
    .required(),
});
