import Joi from "joi";

export const validate = (schema) => {
  return (req, res, next) => {
    const options = { abortEarly: false, allowUnknown: false };

    const { error } = schema.validate(req.body, options);

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    next();
  };
};
