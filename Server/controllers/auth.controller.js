const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcryptjs");

const validation = require("../utility/validation");

const userRegister = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		//check if user already exists
		const existingUser =
			(await db.User.findOne({
				where: {
					username,
				},
			})) ||
			(await db.User.findOne({
				where: {
					email,
				},
			}));
		if (existingUser)
			return res.status(400).json({ error: "User already exists" });

		const { error } = validation.registerValidation({
			username,
			email,
			password,
		});
		if (error) return res.status(400).send(error.details[0].message);

		const genSalt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, genSalt);

		const user = await db.User.create({
			id: uuid(),
			username,
			password: hashedPassword,
			email,
		});
		res.json(user);
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	userRegister,
};
