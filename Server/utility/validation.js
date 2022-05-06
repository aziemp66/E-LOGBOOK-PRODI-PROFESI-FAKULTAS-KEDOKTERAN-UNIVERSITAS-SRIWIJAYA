const Joi = require("joi");

const registerValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).max(255).required().email(),
		username: Joi.string().min(6).max(255).required(),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(6).max(255).required(),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(data);
};

const updateProfileValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(1).max(255),
		lastName: Joi.string().min(1).max(255),
		studentNumber: Joi.string().min(1).max(255),
		address: Joi.string().min(1).max(255),
		email: Joi.string().min(6).max(255).required().email(),
		phone: Joi.string().min(1).max(255),
		entryPeriod: Joi.number().integer().min(1).max(99999999),
		academicCouncellor: Joi.string().min(1).max(255),
	});

	return schema.validate(data);
};

module.exports = {
	registerValidation,
	loginValidation,
	updateProfileValidation,
};
