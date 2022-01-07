import UserModel from "../userScheme.js";

export const renewToken = async (id, token) => {
  return await UserModel.updateOne({ _id: id }, { token });
};
