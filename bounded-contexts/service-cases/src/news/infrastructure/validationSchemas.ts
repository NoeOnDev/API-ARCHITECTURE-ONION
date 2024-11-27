import Joi from "joi";

export const createNewsSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  createdAt: Joi.date().required(),
});
