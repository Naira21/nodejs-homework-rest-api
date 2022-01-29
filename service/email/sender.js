import sgMail from "@sendgrid/mail";
import {} from "dotenv/config";
// import nodemail from "nodemailer";

export default class SengridSender {
  async send(message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({
      ...message,
      from: process.env.SENDER_EMAIL_SENDGRID,
    });
  }
}
// class NodemailerSender {
//   async send(message) {
//     const config = {
//       host: "smtp.meta.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "kisur4dance.meta.ua@meta.ua",
//         pass: "password",
//       },
//     };
//   }
// }
