import AuthService from "../../service/auth/index.js";

const authService = new AuthService();

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(401).json({
      Status: "401 Unauthorized",
      ResponseBody: {
        message: "Email or password is wrong",
      },
    });
  }
  const token = authService.getToken(user);
  const subscription = user.subscription;
  await authService.setToken(user.id, token, user.subscription);
  res.status(200).json({
    Status: "200 OK",
    ContentType: "application/json",
    ResponseBody: { token, user: { subscription, email } },
  });
};
