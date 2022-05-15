const db = require("../models");
const validation = require("../utility/validation");

const getAllStations = async (req, res, next) => {
	let stations;
	try {
		stations = await db.Station.findAll();
	} catch (error) {
		return next(error);
	}

	res.json(stations);
};

const getAllDiseasesAndSkills = async (req, res, next) => {
	const { station } = req.body;

	let diseases;
	try {
		diseases = await db.Disease.findAll({
			where: {
				station,
			},
		});
	} catch (error) {
		return next(error);
	}

	let skills;
	try {
		skills = await db.Skill.findAll({
			where: {
				station,
			},
		});
	} catch (error) {
		return next(error);
	}

	res.json({
		diseases,
		skills,
	});
};

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

const updateUserRoles = async (req, res, next) => {
	const { id } = req.params;
	const { roles } = req.body;

	const { error } = validation.updateUserRolesValidation({ roles });
	if (error) return next(error.details[0].message);

	try {
		await db.User.update(
			{
				roles,
			},
			{
				where: {
					id,
				},
			}
		);
	} catch (error) {
		return next(error);
	}
	res.json({
		message: "User roles updated successfully",
	});
};

module.exports = {
	getAllStations,
	getAllDiseasesAndSkills,
	addStation,
	addDisease,
	addSkill,
	updateUserRoles,
};
