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
        from: `"HarishCart Support" <${process.env.EMAIL_USER}>`,
        to : options.email,
        subject : options.subject,
        text : options.message
    }
    await transporter.sendMail(message)
}

module.exports=sendEmail;