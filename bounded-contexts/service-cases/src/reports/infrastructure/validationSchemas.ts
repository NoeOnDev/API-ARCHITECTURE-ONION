import Joi from "joi";

export const createReportSchema = Joi.object({
  title: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  locality: Joi.string().trim().required(),
  street: Joi.string().trim().required(),
  createdAt: Joi.date().required(),
});

export const updateReportStatusSchema = Joi.object({
  reportId: Joi.string().uuid().required(),
  status: Joi.string().trim().required,
});
