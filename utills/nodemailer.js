const nodemailer = require('nodemailer');
const config=require("../Config/index")
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendVerificationCode = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
        host: config.nodemailer_host,
        port: config.nodemailer_port,
        auth: {
            user: config.nodemailer_user,
            pass: config.nodemailer_pass
        }
    });
    const code=generateVerificationCode()
    console.log(code)

    // Send verification email
    await transporter.sendMail({
      from: config.nodemailer_user, // Your email address
      to: email, // Recipient's email address
      subject: 'Verification Code', // Subject line
      text: `Your verification code is: ${code}`, // Plain text body
      // You can also provide an HTML body if you prefer
      // html: `<p>Your verification code is: ${code}</p>`
    });
return await code
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw new Error('Failed to send verification code');
  }
};

module.exports = {
  generateVerificationCode,
  sendVerificationCode,
};
