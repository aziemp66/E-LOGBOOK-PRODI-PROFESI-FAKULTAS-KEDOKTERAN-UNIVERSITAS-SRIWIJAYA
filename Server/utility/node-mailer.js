require("dotenv").config();
const nodemailer = require("nodemailer");

// setup email data with unicode symbols
const sendMail = async (content) => {
  const email = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASSWORD;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    name: host,
    port: Number(port),
    secure: false, // true for 465, false for other ports
    auth: {
      user: email, // generated email address
      pass: password, // generated password
    },
  });

  await transporter.sendMail({
    from: email,
    ...content,
  });
};

module.exports = sendMail;
