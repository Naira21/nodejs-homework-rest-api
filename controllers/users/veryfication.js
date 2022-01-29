import { LocalStorage, FileStorage } from "../../service/storages/index.js";
import { findByVerifyToken } from "../../model/users/findByVerifyToken.js";
import { updateVerify } from "../../model/users/updateVerify.js";

const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.token;
  const userFromToken = findByVerifyToken(verificationToken);
  if (userFromToken) {
    await updateVerify(userFromToken.id, true);
    res.status(200).json({
      Status: "200 OK",
      ResponseBody: { message: "Verification successful" },
    });
  }
  res.status(200).json({
    Status: "404 Not Found",
    ResponseBody: { message: "User not found" },
  });
};

const retryEmailForVerifiedUser = async (req, res, next) => {
  const uploadService = new FileStorage(LocalStorage, req.file, req.user);

  const avatarURL = await uploadService.updateAvatar();

  res.status(200).json({
    Status: "200 OK",
    ContentType: "application/json",
    ResponseBody: { avatarURL },
  });
};

export { verifyUser, retryEmailForVerifiedUser };
