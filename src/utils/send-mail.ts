import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER ?? "thaitoan3039015@gmail.com",
    pass: process.env.EMAIL_PASS ?? "cdhk eezh dnww axag",
  },
});
