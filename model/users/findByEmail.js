import UserModel from "../userScheme.js";

export const findByEmail = async (email) => {
  return await UserModel.findOne({ email });
};
