import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv'
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const msg: any = {
  from: `grans <${process.env.SENDGRID_EMAIL}>`,
  mail_settings: { sandbox_mode: { enable: false } }
};

() => {
  msg.mail_settings.sandbox_mode.enable = true;
};

const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    msg.to = email;
    msg.subject = subject;
    msg.text = message;
    await sgMail.send(msg);
    console.log("message sent...");
  } catch (err) {
    return err;
  }
};

export default sendEmail
