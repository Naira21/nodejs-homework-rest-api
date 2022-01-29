// import { use } from "express/lib/application";
import Mailgen from "mailgen";

export default class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "dev":
        this.link = "http://localhost:3000";
        break;
      case "test":
        this.link = "http://localhost:5000";
        break;
      case "prod":
        this.link = "http://heroku/";
        break;
      default:
        this.link = "http://localhost:3000";
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "User",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: "To get started with our API, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(email);
  }
  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const message = {
      to: email,
      subject: "Email veryfication",
      html: emailBody,
    };
    try {
      const result = await this.sender.send(message);
      console.log(result);
      return true;
    } catch (error) {
      console.error(error.message);
    }
  }
}
