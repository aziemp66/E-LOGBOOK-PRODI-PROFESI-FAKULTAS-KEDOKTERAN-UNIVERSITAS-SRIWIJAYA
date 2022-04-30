const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const validation = require("../utility/validation");
const generateToken = require("../utility/generateToken");

const userRegister = async (req, res, next) => {
	const { username, email, password, confirmPassword } = req.body;

	//check if password and confirm password match
	if (password !== confirmPassword)
		next(new Error("Password and confirm password do not match"));
	console.log("Checking Password and Confirm Password");

	//check if user already exists

	try {
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

		if (existingUser) {
			next(new Error("Username or email already exists"));
		}
	} catch (error) {
		next(error);
	}

	const { error } = validation.registerValidation({
		username,
		email,
		password,
	});
	if (error) next(error.details[0]);

	const hashedPassword = await bcrypt.hash(password, 10);

	let user;
	try {
		user = await db.User.create({
			id: uuid(),
			username,
			password: hashedPassword,
			email,
		});
	} catch (error) {
		next(error);
	}

	res.json(user);
};

const userLogin = async (req, res, next) => {
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
	if (!user) return res.status(400).json({ error: "User does not exist" });

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword)
		return res.status(400).json({ error: "Invalid password" });

	const accessToken = generateToken(user.id, user.roles);

	res.json({
		accessToken,
	});
};

module.exports = {
	userRegister,
	userLogin,
};
