import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  capacity: Joi.number().min(1).required(),
  startAt: Joi.date().required(),
  endAt: Joi.date().required(),
  venue: Joi.string().required(),
  description: Joi.string().optional(),
  posterUrl: Joi.string().optional(),
  materials: Joi.array().items(Joi.string()).optional()
});

export const updateEventSchema = Joi.object({
  title: Joi.string().optional(),
  category: Joi.string().optional(),
  capacity: Joi.number().min(1).optional(),
  startAt: Joi.date().optional(),
  endAt: Joi.date().optional(),
  venue: Joi.string().optional(),
  description: Joi.string().optional(),
  posterUrl: Joi.string().optional(),
  materials: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid("pending", "approved", "rejected").optional()
});
