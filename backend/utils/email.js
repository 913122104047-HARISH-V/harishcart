const nodemailer=require('nodemailer')

const sendEmail = async options =>{   // options object contain user email id ,msg and subject 
    const transport = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // This is your App Password
        }
      };
    const transporter= nodemailer.createTransport(transport);
    const message={
        from :`${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}`,
        to : options.email,
        subject : options.subject,
        text : options.message
    }
    await transporter.sendMail(message)
}

module.exports=sendEmail;