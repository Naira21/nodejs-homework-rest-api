import UserModel from "../userScheme.js";

export const findByVerifyToken = async (verificationToken) => {
  return await UserModel.findOne({ verificationToken });
};
