import sgMail from "@sendgrid/mail";
import {} from "dotenv/config";

export class SengridSender {
  async send(message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({
      ...message,
      from: process.env.SENDER_EMAIL_SENDGRID,
    });
  }
}
