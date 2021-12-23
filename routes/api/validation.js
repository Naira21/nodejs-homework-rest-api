import Joi from "joi";

const createTemplate = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).max(20).required(),
});

const renewedTemplate = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idTemplate = Joi.object({ id: Joi.string().required() });

export const validateTemplate = async (req, res, next) => {
  try {
    const value = await createTemplate.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};

export const validateRenewal = async (req, res, next) => {
  try {
    const value = await renewedTemplate.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateId = async (req, res, next) => {
  try {
    const value = await idTemplate.validateAsync(req.params);
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};
