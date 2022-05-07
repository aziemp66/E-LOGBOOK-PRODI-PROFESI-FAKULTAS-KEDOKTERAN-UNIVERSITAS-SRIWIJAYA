const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validation = require("../utility/validation");
const generateToken = require("../utility/generateToken");

const userRegister = async (req, res, next) => {
	const { username, email, password, confirmPassword } = req.body;

	//check if password and confirm password match
	if (password !== confirmPassword)
		return next("Password and confirm password do not match");

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
			return next("Username or email already exists");
		}
	} catch (error) {
		return next(error);
	}

	const { error } = validation.registerValidation({
		username,
		email,
		password,
	});
	if (error) return next(error.details[0].message);

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
		return next(error);
	}

	res.json(user);
};

const userLogin = async (req, res, next) => {
	const { username, password } = req.body;

	const { error } = validation.loginValidation({
		username,
		password,
	});
	if (error) return next(error.details[0].message);

	const user = await db.User.findOne({
		where: {
			username,
		},
	});
	if (!user) return next("Username or password is incorrect");

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) return next("Username or password is incorrect");

	const accessToken = generateToken(user.id, user.roles);

	res.json({
		accessToken,
	});
};

const userToken = async (req, res, next) => {
	const { token } = req.body;

	//Verify token
	try {
		const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		res.json(verified);
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	userRegister,
	userLogin,
	userToken,
};
