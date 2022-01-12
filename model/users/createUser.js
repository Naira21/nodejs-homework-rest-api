import UserModel from "../userScheme.js";

export const createUser = async (body) => {
  const user = new UserModel(body);
  return await user.save();
};
