const db = require("../models");

const getAllStudentsProfile = async (req, res) => {
	let studentsWIthProfile;
	try {
		studentsWIthProfile = await db.Student.findAll({
			include: [
				{
					model: db.StudentProfile,
					attributes: {
						exclude: ["userId", "createdAt", "updatedAt"],
					},
				},
			],
		});
	} catch (error) {
		return next(error);
	}

	res.json(studentsWIthProfile);
};

const getAllStudentsCompetence = async (req, res) => {
	let studentWithCompetences;
	try {
		studentWithCompetences = await db.Student.findAll({
			include: [
				{
					model: db.Competences,
					attributes: {
						exclude: ["userId", "createdAt", "updatedAt"],
					},
				},
			],
		});
	} catch (error) {
		return next(error);
	}

	res.json(studentWithCompetences);
};

module.exports = {
	getStudents: getAllStudentsProfile,
	getCompetences: getAllStudentsCompetence,
};
