const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const validation = require("../utility/validation");
const generateToken = require("../utility/generateToken");

const userRegister = async (req, res) => {
	try {
		const { username, email, password, confirmPassword } = req.body;

		//check if password and confirm password match
		if (password !== confirmPassword)
			return res.status(400).json({ error: "Passwords do not match" });

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

		const hashedPassword = await bcrypt.hash(password, 10);

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

const userLogin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const { error } = validation.loginValidation({
			username,
			password,
		});
		if (error) return res.status(400).send(error.details[0].message);

		const user = await db.User.findOne({
			where: {
				username,
			},
		});
		if (!user)
			return res.status(400).json({ error: "User does not exist" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(400).json({ error: "Invalid password" });

		const accessToken = generateToken(user.id, user.roles);

		res.json({
			accessToken,
		});
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	userRegister,
	userLogin,
};
