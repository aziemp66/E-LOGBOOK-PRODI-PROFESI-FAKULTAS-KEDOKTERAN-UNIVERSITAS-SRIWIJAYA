const db = require("../models");

const updateProfile = async (req, res, next) => {
	res.json({
		message: "Updating Student Profile",
	});
};

module.exports = {
	updateProfile,
};
