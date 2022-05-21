const db = require("../models");
const validation = require("../utility/validation");
const updateValidation = require("../utility/updateValidation");
const uuid = require("uuid").v4;

const getProfile = async (req, res, next) => {
	const { id } = req.user;

	try {
		const studentProfile = await db.Student.findOne({
			where: {
				userId: id,
			},
		});
		if (!studentProfile) {
			return next("Student profile not found");
		}
		res.json(studentProfile);
	} catch (error) {
		return next(error);
	}
};

const updateProfile = async (req, res, next) => {
	const { id } = req.user;

	const {
		firstName,
		lastName,
		studentNumber,
		address,
		email,
		phone,
		entryPeriod,
		academicCouncellor,
	} = req.body;

	const validatedData = validation.updateProfileValidation({
		firstName,
		lastName,
		studentNumber,
		address,
		email,
		phone,
		entryPeriod,
		academicCouncellor,
	});
	if (validatedData.error)
		return next(validatedData.error.details[0].message);

	//check if Student Profile exists
	let studentProfile;

	try {
		studentProfile = await db.StudentProfile.findOne({
			where: {
				userId: id,
			},
		});
	} catch (error) {
		return next(error);
	}

	if (studentProfile) {
		//Fill in the missing fields
		updateValidation.updateProfileValidation(
			{
				firstName,
				lastName,
				studentNumber,
				address,
				email,
				phone,
				entryPeriod,
				academicCouncellor,
			},
			studentProfile
		);
		//update Student Profile
		try {
			await studentProfile.update({
				firstName,
				lastName,
				studentNumber,
				address,
				email,
				phone,
				entryPeriod,
				academicCouncellor,
			});
		} catch (error) {
			return next(error);
		}
	} else {
		try {
			//create Student Profile
			studentProfile = await db.StudentProfile.create({
				userId: id,
				firstName,
				lastName,
				studentNumber,
				address,
				email,
				phone,
				entryPeriod,
				academicCouncellor,
			});
		} catch (error) {
			return next(error);
		}
	}

	res.json({
		message: "Student Profile updated successfully",
	});
};

const addCompetence = async (req, res, next) => {
	const { id } = req.user;

	const {
		station,
		days,
		months,
		years,
		hospital,
		patientInitials,
		patientMedicalNumber,
		disease: diseaseId,
		"disease-competences": diseaseCompetence,
		skill: skillId,
		"skill-competences": skillCompetence,
		lecturer: lecturer,
		guidances: guidanceId,
	} = req.body;

	const validatedData = validation.addCompetenceValidation({
		station,
		days,
		months,
		years,
		hospital,
		patientInitials,
		patientMedicalNumber,
		diseaseId,
		diseaseCompetence,
		skillId,
		skillCompetence,
		lecturer,
		guidanceId,
	});
	if (validatedData.error)
		return next(validatedData.error.details[0].message);

	//check if Student Profile exists
	let studentProfile;
	try {
		studentProfile = await db.StudentProfile.findOne({
			where: {
				userId: id,
			},
		});
	} catch (error) {
		return next(error);
	}

	if (!studentProfile) {
		return next(
			"Student profile not found, please complete your student profile to proceed"
		);
	} else {
		//check if there is null value in student profile
		if (
			studentProfile.firstName === null ||
			studentProfile.lastName === null ||
			studentProfile.studentNumber === null ||
			studentProfile.address === null ||
			studentProfile.email === null ||
			studentProfile.phone === null ||
			studentProfile.entryPeriod === null ||
			studentProfile.academicCouncellor === null
		) {
			return next("Please complete your student profile to proceed");
		}
	}

	//check if disease competence exists
	if (
		diseaseCompetence !== "1" ||
		diseaseCompetence !== "2" ||
		diseaseCompetence !== "3A" ||
		diseaseCompetence !== "3B" ||
		diseaseCompetence !== "4"
	) {
		return next("Invalid disease competence");
	}

	//check if skillCompetence exists
	if (
		skillCompetence !== "1" ||
		skillCompetence !== "2" ||
		skillCompetence !== "3" ||
		skillCompetence !== "4"
	) {
		return next("Invalid skill competence");
	}

	//check if Student Competence station, disease and skill exists
	let stationExist;
	try {
		stationExist = await db.Station.findOne({
			where: {
				name: station,
			},
		});
	} catch (error) {
		return next(error);
	}
	if (!stationExist) {
		return next("Station not found");
	}

	let diseaseExist;
	try {
		diseaseExist = await db.Disease.findOne({
			where: {
				id: diseaseId,
				station: stationExist.id,
			},
		});
	} catch (error) {
		return next(error);
	}
	if (!diseaseExist) {
		return next("Disease not found");
	}

	let skillExist;
	try {
		skillExist = await db.Skill.findOne({
			where: {
				id: skillId,
				station: stationExist.id,
			},
		});
	} catch (error) {
		return next(error);
	}
	if (!skillExist) {
		return next("Skill not found");
	}

	let guidanceExist;
	try {
		guidanceExist = await db.Guidance.findOne({
			where: {
				id: guidanceId,
				station: stationExist.id,
			},
		});
	} catch (error) {
		return next(error);
	}
	if (!guidanceExist) {
		return next("Guidance not found");
	}

	//check if Student Competence with this station exists
	let studentCompetenceExist;
	try {
		studentCompetenceExist = await db.StudentCompetence.findOne({
			where: {
				station: stationExist.id,
				userId: id,
			},
		});
	} catch (error) {
		return next(error);
	}
	if (studentCompetenceExist) {
		return next("Student Competence already exists");
	}

	//check if lecturers exist
	let lecturerExist;
	try {
		lecturerExist = await db.user.findOne({
			where: {
				id: lecturer,
				roles: "lecturer",
			},
		});
	} catch (error) {
		return next(error);
	}
	if (!lecturerExist) {
		return next("Lecturer not found");
	}

	//register new competence
	try {
		await db.StudentCompetence.create({
			id: uuid(),
			station: stationExist.id,
			days,
			months,
			years,
			hospital,
			patientInitials,
			patientMedicalNumber,
			disease: diseaseExist.id,
			skill: skillExist.id,
			lecturer: lecturerExist.id,
			guidance: guidanceExist.id,
			userId: id,
		});

		res.status(201).json({
			message: "Student Competence registered successfully",
		});
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	updateProfile,
	getProfile,
	addCompetence,
};
