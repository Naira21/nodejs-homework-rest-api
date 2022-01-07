import UserModel from "../userScheme.js";

export const findById = async (id) => {
  return await UserModel.findById(id);
};
