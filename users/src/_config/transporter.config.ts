import nodemailer from "nodemailer";
import { env } from "./env.config";

export const transporter = nodemailer.createTransport({
  host: env.email.EMAIL_HOST,
  port: env.email.EMAIL_PORT,
  secure: true,
  auth: {
    user: env.email.EMAIL_USER,
    pass: env.email.EMAIL_PASSWORD,
  },
});
