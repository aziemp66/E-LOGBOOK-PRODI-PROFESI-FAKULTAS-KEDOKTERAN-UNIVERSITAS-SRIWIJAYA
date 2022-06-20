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
      return next(new Error("Student profile not found"));
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

  const { error } = validation.updateProfileValidation({
    firstName,
    lastName,
    studentNumber,
    address,
    email,
    phone,
    entryPeriod,
    academicCouncellor,
  });
  if (error) return next(validatedData.error.details[0]);

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

const getCompetenceInfo = async (req, res, next) => {
  const user = req.user;

  //check existing competence info
  let existingCompetences;
  try {
    existingCompetences = await db.Competence.findAll({
      where: {
        userId: user.id,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!existingCompetences) {
    return next(new Error("No competence info found"));
  }

  let stations;
  try {
    stations = await db.Station.findAll();
  } catch (error) {
    return next(error);
  }
  if (!stations) {
    return next(new Error("No stations found"));
  }

  let lecturers;
  try {
    lecturers = await db.LecturerProfile.findAll();
  } catch (error) {
    return next(error);
  }
  if (!lecturers) {
    return next(new Error("No lecturers found"));
  }

  let guidances;
  try {
    guidances = await db.Guidance.findAll();
  } catch (error) {
    return next(error);
  }
  if (!guidances) {
    return next(new Error("No guidances found"));
  }

  let hospitals;
  try {
    hospitals = await db.Hospital.findAll();
  } catch (error) {
    return next(error);
  }
  if (!hospitals) {
    return next(new Error("No hospitals found"));
  }

  res.json({
    existingCompetences,
    stations,
    lecturers,
    guidances,
    hospitals,
  });
};

const getStationDiseaseAndSkills = async (req, res, next) => {
  const { stationId } = req.params;

  let diseases;
  try {
    diseases = await db.Disease.findAll({
      where: {
        station: stationId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!diseases) {
    return next(new Error("No diseases found"));
  }

  let skills;
  try {
    skills = await db.Skill.findAll({
      where: {
        station: stationId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!skills) {
    return next(new Error("No skills found"));
  }

  res.json({
    diseases,
    skills,
  });
};

const addCompetence = async (req, res, next) => {
  const { id } = req.user;

  let {
    stationId,
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
    lecturerId,
    guidanceId,
  } = req.body;

  //add 0 to the beginning of the number if it is less than 10
  if (days < 10) days = `0${days}`;
  if (months < 10) months = `0${months}`;

  const { error } = validation.addCompetenceValidation({
    stationId,
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
    lecturerId,
    guidanceId,
  });
  if (error) return next(error.details[0]);

  console.log("here");

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
      return next(new Error("Please complete your student profile to proceed"));
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
    return next(new Error("Invalid disease competence"));
  }

  //check if skillCompetence exists
  if (
    skillCompetence !== "1" ||
    skillCompetence !== "2" ||
    skillCompetence !== "3" ||
    skillCompetence !== "4"
  ) {
    return next(new Error("Invalid skill competence"));
  }

  //check if Student Competence station, disease and skill exists
  let stationExist;
  try {
    stationExist = await db.Station.findOne({
      where: {
        id: stationId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!stationExist) {
    return next(new Error("Station not found"));
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
    return next(new Error("Disease not found"));
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
    return next(new Error("Skill not found"));
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
    return next(new Error("Guidance not found"));
  }

  //check if lecturers exist
  let lecturerExist;
  try {
    lecturerExist = await db.user.findOne({
      where: {
        id: lecturerId,
        roles: "lecturer",
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!lecturerExist) {
    return next(new Error("Lecturer not found"));
  }

  //check if Student Competence with this station exists
  let studentCompetenceExist;
  try {
    studentCompetenceExist = await db.StudentCompetence.findOne({
      where: {
        stationId: stationExist.id,
        userId: id,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (studentCompetenceExist) {
    return next(
      new Error("Student Competence with this station already exists")
    );
  } else {
    //register new competence or update old competences
    try {
      await db.competence.create({
        id: uuid(),
        userId: id,
        stationId: stationExist.id,
        stationName: stationExist.name,
        date: new Date(`${years}-${months}-${days}`),
        patientInitials,
        patientMedicalNumber,
        diseaseName: diseaseExist.name,
        diseaseCompetence,
        skillName: skillExist.name,
        skillCompetence,
        lecturerName: lecturerExist.name,
        guidanceType: guidanceExist.name,
        hospital,
      });

      res.status(201).json({
        message: "Student Competence registered successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
};

module.exports = {
  updateProfile,
  getProfile,
  addCompetence,
  getCompetenceInfo,
  getStationDiseaseAndSkills,
};
