import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  dateTime: Joi.date().required(),
});

export const updateAppointmentStatusSchema = Joi.object({
  appointmentId: Joi.string().uuid().required(),
  status: Joi.string().trim().required(),
});
