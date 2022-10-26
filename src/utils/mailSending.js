const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

export const mailSending = async (userEmail, subject, text) => {
  try {
    let mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "FCode eCruitment",
        link: `https://127.0.0.1:5173/`,
      },
    });
    const email = {
      body: {
        name: userEmail,
        intro: text,
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.MY_EMAIL,
      to: userEmail,
      subject: subject,
      html: emailBody,
    };
    await transporter.sendMail(message);

    return true;
  } catch (error) {
    throw error;
  }
};
