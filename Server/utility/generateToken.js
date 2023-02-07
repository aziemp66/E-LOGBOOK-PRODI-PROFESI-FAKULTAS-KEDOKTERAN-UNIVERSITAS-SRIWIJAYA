const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};

module.exports = generateAccessToken;
