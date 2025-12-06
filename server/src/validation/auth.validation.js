import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).trim().required(),
  kfupmId: Joi.string().min(5).max(20).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("student", "organizer", "admin").default("student"),
});

export const loginSchema = Joi.object({
  email: Joi.alternatives()
    .try(
      Joi.string().email().lowercase().trim(),
      Joi.string().min(5).max(50).trim() // allow KFUPM ID in the same field
    )
    .required(),
  password: Joi.string().required(),
});
