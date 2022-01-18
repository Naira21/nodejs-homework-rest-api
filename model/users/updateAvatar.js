import UserModel from "../userScheme.js";

export const updateAvatar = async (id, avatar) => {
  return await UserModel.updateOne({ _id: id }, { avatar });
};
