const { body, param } = require("express-validator");

const signupValidationRules = [
  body("username").trim().notEmpty().withMessage("username is required"),
  body("email").trim().isEmail().withMessage("Valid Email Address is required"),
  body("role").trim().notEmpty().withMessage("role is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atlease 6 characters long"),
];

const verifyCodeRules = [
  body("verificationCode")
    .trim()
    .notEmpty()
    .withMessage("verification code must be required"),
];

const signInRules = [
  body("email").trim().isEmail().withMessage("Valid Email Address is Required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atlease 6 characters long"),
];

const updateUserProfileRoles = [
  ...signupValidationRules,
];

module.exports = {
  signupValidationRules,
  verifyCodeRules,
  signInRules,
  updateUserProfileRoles,
};
