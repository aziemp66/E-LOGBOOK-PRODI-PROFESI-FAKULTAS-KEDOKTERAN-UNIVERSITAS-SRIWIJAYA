const db = require("../models");

const updateProfile = async (req, res, next) => {
	const { id } = req.user;

	const {
		firstName,
		lastname,
		studentNumber,
		address,
		email,
		phone,
		entryPediod,
		academicCouncellor,
	} = req.body;
};

module.exports = {
	updateProfile,
};
