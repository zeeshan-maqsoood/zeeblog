require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
  nodemailer_user:process.env.NODE_MAILER_USER,
  nodemailer_pass:process.env.NODE_MAILER_PASSWORD,
  nodemailer_host:process.env.NODE_MAILER_HOST,
  nodemailer_port:process.env.NODE_MAILER_PORT,
  jwt_secret:process.env.JWT_SECRET
};
