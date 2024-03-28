const jwt = require('jsonwebtoken');
const config=require("../Config/index")
const generateToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, config.jwt_secret, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt_secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
