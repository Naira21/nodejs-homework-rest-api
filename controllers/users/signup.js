import AuthService from "../../service/auth/index.js";

const authService = new AuthService();

export const signup = async (req, res, next) => {
  const { email } = req.body;
  const isUserSignedup = await authService.isUserSignedup(email);
  if (isUserSignedup) {
    return res.status(409).json({
      Status: "409 Conflict",
      ContentType: "application/json",
      ResponseBody: {
        message: "Email in use",
      },
    });
  }
  const data = await authService.create(req.body);
  res.status(201).json({
    Status: "201 Created",
    ContentType: "application/json",
    ResponseBody: { user: data },
  });
};
