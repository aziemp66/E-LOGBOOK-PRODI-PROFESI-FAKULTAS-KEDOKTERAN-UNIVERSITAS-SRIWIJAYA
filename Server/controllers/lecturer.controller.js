const db = require("../models");

const getLecturerCompetencesData = async (req, res, next) => {
  const { id } = req.user;

  let competences;
  try {
    competences = await db.Competence.findAll({
      where: {
        lecturerId: id,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!competences) {
    return next(new Error("No competences found"));
  }

  let studentProfiles;
  try {
    studentProfiles = await db.StudentProfile.findAll();
  } catch (error) {
    return next(error);
  }
  if (!studentProfiles) {
    return next(new Error("No student profiles found"));
  }

  const updatedCompetences = competences.map((competence) => {
    let studentName;
    let studentNumber;

    studentProfiles.forEach((studentProfile) => {
      if (studentProfile.userId === competence.userId) {
        studentName = `${studentProfile.firstName} ${studentProfile.lastName}`;
        studentNumber = studentProfile.studentNumber;
      }
    });

    return {
      ...competence.dataValues,
      studentName,
      studentNumber,
    };
  });

  res.json(updatedCompetences);
};

const verifyStudentCompetences = async (req, res, next) => {
  const { competencesId, isVerified } = req.body;

  let competences;
  try {
    competences = await db.Competence.findOne({
      where: {
        id: competencesId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!competences) {
    return next(new Error("Competences not found"));
  }

  //verify competences
  try {
    await competences.update({
      verified: isVerified,
    });
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "Competences verified",
  });
};

module.exports = {
  getLecturerCompetencesData,
  verifyStudentCompetences,
};
