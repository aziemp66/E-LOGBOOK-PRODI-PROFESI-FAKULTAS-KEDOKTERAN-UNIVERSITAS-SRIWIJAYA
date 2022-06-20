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

  res.json(competences);
};

const verifyStudentCompetences = async (req, res, next) => {
  const { competencesId } = req.body;

  let competences;
  try {
    competences = await db.Competences.find({
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
      verified: true,
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
