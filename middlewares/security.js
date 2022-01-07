import jwt from "jsonwebtoken";
import { findById } from "../model/users/index.js";
const secret = process.env.SECRET;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, secret);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const security = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isTokenValid = verifyToken(token);
  if (!isTokenValid) {
    return res.status(401).json({
      Status: "401 Unauthorized",
      ContentType: "application/json",
      ResponseBody: {
        message: "Not authorized",
      },
    });
  }
  const payload = jwt.decode(token);
  const foundUser = await findById(payload.id);
  if (!foundUser || foundUser.token !== token) {
    return res.status(401).json({
      Status: "401 Unauthorized",
      ContentType: "application/json",
      ResponseBody: {
        message: "Not authorized",
      },
    });
  }
  req.user = foundUser;
  next();
};

export default security;
