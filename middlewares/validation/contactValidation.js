import Joi from "joi";
import mongoose from "mongoose";

const { Types } = mongoose;

const createTemplate = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).max(20).required(),
  favorite: Joi.boolean().optional(),
});

const renewedTemplate = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone");

const renewedFavoriteTemplate = Joi.object({
  favorite: Joi.bool().required(),
});

const queryScheme = Joi.object({
  limit: Joi.string().optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "email", "favorite").optional(),
  sortByDesc: Joi.string().valid("name", "email", "favorite").optional(),
  filter: Joi.string().optional(),
});

export const validateTemplate = async (req, res, next) => {
  try {
    await createTemplate.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};

export const validateRenewal = async (req, res, next) => {
  try {
    await renewedTemplate.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateRenewalFavorite = async (req, res, next) => {
  try {
    await renewedFavoriteTemplate.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectID" });
  }
  next();
};

export const validateQuery = async (req, res, next) => {
  try {
    await queryScheme.validateAsync(req.quer);
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};
