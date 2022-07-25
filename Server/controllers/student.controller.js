const db = require("../models");
const validation = require("../utility/validation");
const updateValidation = require("../utility/updateValidation");
const uuid = require("uuid").v4;

const getProfile = async (req, res, next) => {
  const { id } = req.user;

  try {
    const studentProfile = await db.StudentProfile.findOne({
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

  let {
    firstName,
    lastName,
    studentNumber,
    address,
    email,
    phone,
    days,
    months,
    years,
    entryPeriod,
    academicCounselor,
  } = req.body;

  //add 0 to the front of the day and month if it is less than 10
  if (days < 10) {
    days = `0${days}`;
  }
  if (months < 10) {
    months = `0${months}`;
  }

  const { error } = validation.updateProfileValidation({
    firstName,
    lastName,
    studentNumber,
    address,
    email,
    phone,
    entryPeriod,
    academicCounselor,
    days,
    months,
    years,
  });
  if (error) return next(validatedData.error.details[0]);

  //convert date to YYYY-MM-DD
  const dateOfBirth = `${years}-${months}-${days}`;

  console.log(dateOfBirth);

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
        academicCounselor,
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
        academicCounselor,
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
        dateOfBirth,
        academicCounselor,
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
    hospitalId,
    patientInitials,
    patientMedicalNumber,
    diseaseId,
    diseaseCompetence,
    skillId,
    skillCompetence,
    lecturerId,
    guidanceId,
  } = req.body;

  let submitedForm = {
    id: uuid(),
    userId: id,
  };

  const { error } = validation.addCompetenceValidation({
    stationId,
    hospitalId,
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

  submitedForm.patientInitials = patientInitials;
  submitedForm.patientMedicalNumber = patientMedicalNumber;

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
      studentProfile.academicCounselor === null
    ) {
      return next(new Error("Please complete your student profile to proceed"));
    }
  }

  //check if disease competence exists
  if (
    diseaseCompetence !== "1" &&
    diseaseCompetence !== "2" &&
    diseaseCompetence !== "3A" &&
    diseaseCompetence !== "3B" &&
    diseaseCompetence !== "4" &&
    diseaseCompetence !== "" &&
    diseaseCompetence
  ) {
    return next(new Error("Invalid disease competence"));
  }
  submitedForm.diseaseCompetence =
    !diseaseCompetence || diseaseCompetence === "" ? null : diseaseCompetence;

  //check if skillCompetence exists
  if (
    skillCompetence !== "1" &&
    skillCompetence !== "2" &&
    skillCompetence !== "3" &&
    skillCompetence !== "4" &&
    skillCompetence !== "" &&
    skillCompetence
  ) {
    return next(new Error("Invalid skill competence"));
  }
  submitedForm.skillCompetence =
    !skillCompetence || skillCompetence === "" ? null : skillCompetence;

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
  submitedForm.stationName = stationExist.name;
  submitedForm.stationId = stationExist.id;

  let diseaseExist;
  try {
    diseaseExist =
      diseaseId &&
      (await db.Disease.findOne({
        where: {
          id: diseaseId,
          station: stationExist.id,
        },
      }));
  } catch (error) {
    return next(error);
  }
  if (!diseaseExist) {
    submitedForm.diseaseName = null;
    submitedForm.diseaseId = null;
  } else {
    submitedForm.diseaseName = diseaseExist.name;
    submitedForm.diseaseId = diseaseExist.id;
  }

  let skillExist;
  try {
    skillExist =
      skillId &&
      (await db.Skill.findOne({
        where: {
          id: skillId,
          station: stationExist.id,
        },
      }));
  } catch (error) {
    return next(error);
  }
  if (!skillExist) {
    submitedForm.skillName = null;
    submitedForm.skillId = null;
  } else {
    submitedForm.skillName = skillExist.name;
    submitedForm.skillId = skillExist.id;
  }

  let guidanceExist;
  try {
    guidanceExist =
      guidanceId &&
      (await db.Guidance.findOne({
        where: {
          id: guidanceId,
        },
      }));
  } catch (error) {
    return next(error);
  }
  if (!guidanceExist) {
    submitedForm.guidanceName = null;
    submitedForm.guidanceId = null;
  } else {
    submitedForm.guidanceName = guidanceExist.name;
    submitedForm.guidanceId = guidanceExist.id;
  }

  let hospitalExist;
  try {
    hospitalExist =
      hospitalId &&
      (await db.Hospital.findOne({
        where: {
          id: hospitalId,
        },
      }));
  } catch (error) {
    return next(error);
  }
  if (!hospitalExist) {
    submitedForm.hospitalName = null;
    submitedForm.hospitalId = null;
  } else {
    submitedForm.hospitalName = hospitalExist.name;
    submitedForm.hospitalId = hospitalExist.id;
  }

  //check if lecturers exist
  let lecturerExist;
  try {
    lecturerExist =
      lecturerId &&
      (await db.LecturerProfile.findOne({
        where: {
          userId: lecturerId,
        },
      }));
  } catch (error) {
    return next(error);
  }
  if (!lecturerExist) {
    submitedForm.lecturerName = null;
    submitedForm.lecturerId = null;
  } else {
    submitedForm.lecturerName = `${lecturerExist.firstName} ${
      lecturerExist.lastName || ""
    }`;
    submitedForm.lecturerId = lecturerExist.userId;
  }

  let data, isCreated;
  try {
    [data, isCreated] = await db.Competence.findOrCreate({
      where: {
        userId: id,
        stationId: submitedForm.stationId,
      },
      defaults: submitedForm,
    });
  } catch (error) {
    return next(error);
  }
  if (!isCreated && data) {
    try {
      await data.update(submitedForm);
    } catch (error) {
      return next(error);
    }
  } else if (!data) {
    return next(new Error("Can't Find or Create Competence"));
  }

  res.json({
    message: `Student Competence ${
      isCreated ? "Registered" : "Updated"
    } Successfully`,
  });
};

const updateProfilePicture = async (req, res, next) => {
  const { id } = req.user;
  let profilePicture;

  try {
    profilePicture = req.file.filename;
  } catch (error) {
    return next(error);
  }

  try {
    await db.StudentProfile.update(
      {
        profilePicture,
      },
      {
        where: {
          userId: id,
        },
      }
    );
    res.json({
      message: "Profile Picture updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProfilePicture = async (req, res, next) => {
  const { id } = req.user;

  try {
    db.StudentProfile.update(
      {
        profilePicture: "",
      },
      {
        where: {
          userId: id,
        },
      }
    );
    res.json({
      message: "Profile Picture Resetted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  updateProfile,
  updateProfilePicture,
  deleteProfilePicture,
  getProfile,
  addCompetence,
  getCompetenceInfo,
  getStationDiseaseAndSkills,
};
