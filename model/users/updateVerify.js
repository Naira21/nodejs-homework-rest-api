import UserModel from "../userScheme.js";

export const updateVerify = async (id, status) => {
  return await UserModel.updateOne(
    { _id: id },
    { verify: status, verificationToken: null }
  );
};
