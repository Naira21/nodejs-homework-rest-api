import {
  findByEmail,
  createUser,
  renewToken,
} from "../../model/users/index.js";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

const secret = process.env.SECRET;

class AuthService {
  async create(body) {
    const { id, email, subscription, avatar } = await createUser(body);
    return {
      id,
      email,
      subscription,
      avatar,
    };
  }

  async getUser(email, password) {
    const user = await findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }
  getToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, secret, { expiresIn: "8h" });
    return token;
  }
  async isUserSignedup(email) {
    const user = await findByEmail(email);
    return !!user;
  }
  async setToken(id, token, subscription) {
    await renewToken(id, token);
  }
  async setSubscription(id, subscription) {
    await renewSubscription(id, subscription);
  }
}
export default AuthService;
