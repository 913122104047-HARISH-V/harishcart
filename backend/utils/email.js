const sgMail = require("@sendgrid/mail");

const sendEmail = async (options) => {
  try {
    // Set API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email message
    const msg = {
      to: options.email,
      from: `"HarishCart Support" <${process.env.EMAIL_USER}>`, // must be verified in SendGrid
      subject: options.subject,
      text: options.message,   // plain text
      html: `<p>${options.message}</p>`, // optional HTML version
    };

    // Send email
    const result = await sgMail.send(msg);

    return result;

  } catch (error) {
    console.error("Email send failed:", error.response?.body || error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;


/*const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (NOT your real password)
      },
    });

    const mailOptions = {
      from: `"HarishCart Support" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;

  } catch (error) {
    console.error('Email send failed:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
*/