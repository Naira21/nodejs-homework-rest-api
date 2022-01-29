import UserModel from "../userScheme.js";

export const updateVerify = async (id, status) => {
  return await UserModel.updateOne(
    { _id: id },
    { isVerify: status, verificationToken: null }
  );
};
