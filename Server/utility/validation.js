const Joi = require("joi");

const registerValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).max(255).required().email(),
		username: Joi.string().min(6).max(255).required(),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(data);
};

module.exports = {
	registerValidation,
};
