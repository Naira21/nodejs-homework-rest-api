import { findByVerifyToken } from "../../model/users/findByVerifyToken.js";
import { updateVerify } from "../../model/users/updateVerify.js";

export const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.token;

  const userFromToken = await findByVerifyToken(verificationToken);

  if (userFromToken) {
    await updateVerify(userFromToken.id, true);
    return res.status(200).json({
      Status: "200 OK",
      ResponseBody: { message: "Verification successful" },
    });
  }

  res.status(404).json({
    Status: "404 Not Found",
    ResponseBody: { message: "User not found" },
  });
};
