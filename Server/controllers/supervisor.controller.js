const db = require("../models");

const getAllStudentsProfile = async (req, res, next) => {
  let studentsWithProfile;
  try {
    studentsWithProfile = await db.StudentProfile.findAll();
  } catch (error) {
    return next(error);
  }

  res.json(studentsWithProfile);
};

const getAllCompetence = async (req, res, next) => {
  let allCompetences;
  try {
    allCompetences = await db.Competence.findAll();
    res.json(allCompetences);
  } catch (error) {
    return next(error);
  }
};

const getAllLecturersProfile = async (req, res) => {
  let allLecturers;
  try {
    allLecturers = await db.LecturerProfile.findAll();
    res.json(allLecturers);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getStudents: getAllStudentsProfile,
  getCompetences: getAllCompetence,
  getLecturers: getAllLecturersProfile,
};
