import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import config from "../config/config";
dotenv.config();

sgMail.setApiKey(config.sendgridKey);

const msg: any = {
  from: `grans <${config.sendgridEmail}>`,
  mail_settings: { sandbox_mode: { enable: false } },
};
const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    msg.to = email;
    msg.subject = subject;
    msg.text = message;
    await sgMail.send(msg);
    console.log("Message sent");
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendEmail
