const User = require("../Models/user");
const bcrypt = require("bcrypt");
const { findUserByEmail } = require("../utills/user");
const { hashPassword } = require("../utills/hashPassword");
const apiResponse = require("../utills/apiResponse");
const { sendVerificationCode } = require("../utills/nodemailer");
const { generateToken } = require("../utills/jwt");
const signup = async (req, res) => {
  const { username, email, password,role } = req.body;
  console.log(role,"role")
  try {
    let existingUser = await findUserByEmail(email);

    if (existingUser !== null) {
      throw new Error("user already exists");
    }

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      throw new Error("Password hashing error");
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    if (!newUser) {
      throw new Error("user not saved");
    }
    const code = sendVerificationCode(email);
    const codes = await code;
    console.log(codes, "codes");
    if (!code) {
      throw new Error("Verification code failed to send");
    }
    const payload = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role:newUser.role,
      code: codes,
    };
    const token = generateToken(payload);
    if (!token) {
      throw new Error("Token Error");
    }
    const response = {
      message: "Verification Code has been sent to your email",
      token: token,
    };

    apiResponse.success(res, response);
  } catch (error) {
    console.log(error, "error");
    apiResponse.fail(res, error.message);
  }
};

const verifyCode = async (req, res) => {
  try {
    const { verificationCode } = req.body;
    const { username, email, code } = req.user;
    console.log(code, "code");
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("No user Found");
    }

    if (verificationCode !== code.toString()) {
      throw new Error("invalid Verification Code");
    }
    user.verified = true;
    await user.save();
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role:user.role
    };
    const token = await generateToken(payload);
    const response = {
      data: payload,
      token: token,
    };
    apiResponse.success(res, response);
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error("Invalid Credentials");
    }
    if (user.verified === false) {
      throw new Error(
        "You are not verified! Please verify by verification code"
      );
    }
    const payload = {
      id:user._id,
      username: user.username,
      email: user.email,
      role:user.role
    };
    const token = await generateToken(payload);
    const response = {
      data: payload,
      token: token,
    };
    apiResponse.success(res, response);
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

module.exports = {
  signup,
  verifyCode,
  signIn,
};
