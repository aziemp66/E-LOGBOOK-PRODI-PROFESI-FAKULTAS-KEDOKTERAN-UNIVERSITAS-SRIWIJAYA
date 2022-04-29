const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, accountType) => {
	const accessToken = jwt.sign(
		{ _id: userId, roles: accountType },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "1d",
		}
	);
	return accessToken;
};

module.exports = generateAccessToken;
