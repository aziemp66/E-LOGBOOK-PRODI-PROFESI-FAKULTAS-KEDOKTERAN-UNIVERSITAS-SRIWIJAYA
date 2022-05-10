const db = require("../models");
const validation = require("../utility/validation");

const addStation = async (req, res, next) => {
	const { name } = req.body;

	const { error } = validation.addStationValidation({ name });
	if (error) return next(error.details[0].message);

	try {
		await db.Station.create({
			name,
		});
	} catch (error) {
		return next(error);
	}
	res.json({
		message: "Station added successfully",
	});
};

const addDisease = async (req, res, next) => {
	const { name, station } = req.body;

	const { error } = validation.addDiseaseValidation({ name, station });
	if (error) return next(error.details[0].message);

	try {
		await db.Disease.create({
			name,
			station,
		});
	} catch (error) {
		return next(error);
	}
	res.json({
		message: "Disease added successfully",
	});
};

const addSkill = async (req, res, next) => {
	const { name, station } = req.body;

	const { error } = validation.addSkillValidation({ name, station });
	if (error) return next(error.details[0].message);

	try {
		await db.Skill.create({
			name,
			station,
		});
	} catch (error) {
		return next(error);
	}
	res.json({
		message: "Skill added successfully",
	});
};

module.exports = {
	addStation,
	addDisease,
	addSkill,
};
