const jwt = require("jsonwebtoken");

const generateLink = (data, customString) => {
  const token = jwt.sign(data, customString + process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

const verifyGeneratedToken = (token, customString) => {
  try {
    const verified = jwt.verify(token, customString + process.env.JWT_SECRET);
    return verified;
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateLink,
  verifyLink: verifyGeneratedToken,
};
2;
