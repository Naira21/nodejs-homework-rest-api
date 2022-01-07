import Joi from "joi";

const userTemplate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
});

export const validateUserTemplate = async (req, res, next) => {
  try {
    await userTemplate.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({
      Status: "400 Bad Request",
      ContentType: "application/json",
      ResponseBody: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
  next();
};
