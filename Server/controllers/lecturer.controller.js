const db = require("../models");

const verifyStudentCompetences = async (req, res, next) => {
  const { studentId, competencesId } = req.body;

  let competences;
  try {
    competences = await db.Competences.find({
      where: {
        id: competencesId,
        userId: studentId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!competences) {
    return next("Competences not found");
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
  verifyStudentCompetences,
};
