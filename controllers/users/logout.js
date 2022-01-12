import AuthService from "../../service/auth/index.js";

const authService = new AuthService();

export const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(204).json({ Status: "204 No Content" });
};
