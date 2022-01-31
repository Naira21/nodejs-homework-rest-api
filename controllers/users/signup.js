import AuthService from "../../service/auth/index.js";
import { EmailService, SengridSender } from "../../service/email/index.js";
const authService = new AuthService();

export const signup = async (req, res, next) => {
  try {
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
    const emailService = new EmailService(
      process.env.SENDGRID_API_KEY,
      new SengridSender()
    );

    const isSent = await emailService.sendVerifyEmail(
      email,
      data.name,
      data.verificationToken
    );
    delete data.verificationToken;

    res.status(201).json({
      Status: "201 Created",
      ContentType: "application/json",
      ResponseBody: { user: { ...data }, isSentEmailVerify: isSent },
    });
  } catch (error) {
    next(error);
  }
};
