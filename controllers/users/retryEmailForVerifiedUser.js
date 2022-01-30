import { findByEmail } from "../../model/users/index.js";
import { EmailService, SengridSender } from "../../service/email/index.js";

export const retryEmailForVerifiedUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (user) {
    const { email, name, verificationToken } = user;
    const emailService = new EmailService(
      process.env.SENDGRID_API_KEY,
      new SengridSender()
    );
    const isSent = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken
    );
    if (isSent) {
      return res.status(200).json({
        Status: "200 Ok",
        ContentType: "application/json",
        ResponseBody: { message: "Verification email sent" },
      });
    }
    return res.status(400).json({
      Status: "400 Bad Request",
      ContentType: "application/json",
      ResponseBody: { message: "Verification has already been passed" },
    });
  }

  res.status(400).json({
    Status: "404 Not Found",
    ResponseBody: { message: "missing required field email" },
  });
};
