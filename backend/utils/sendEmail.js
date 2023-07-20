const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    // host: process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host:"smpt.gmail.com",
    port:465,
    service: "gmail",
   
    auth: {
      user: `prathmesh.rcpit@gmail.com`,
      pass: `geclfcvdoaleakzv`,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;