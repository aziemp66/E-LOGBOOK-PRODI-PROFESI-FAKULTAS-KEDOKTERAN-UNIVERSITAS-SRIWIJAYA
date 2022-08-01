const db = require("../models");
const getAllUser = async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "roles",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getElogbookInfo = async (req, res, next) => {
  let stations;
  try {
    stations = await db.Station.findAll();
  } catch (error) {
    return next(error);
  }
  if (!stations) return next(new Error("Stations not found"));

  let diseases;
  try {
    diseases = await db.Disease.findAll();
  } catch (error) {
    return next(error);
  }
  if (!diseases) return next(new Error("Diseases not found"));

  let skills;
  try {
    skills = await db.Skill.findAll();
  } catch (error) {
    return next(error);
  }
  if (!skills) return next(new Error("Skills not found"));

  let hospitals;
  try {
    hospitals = await db.Hospital.findAll();
  } catch (error) {
    return next(error);
  }
  if (!hospitals) return next(new Error("Hospitals not found"));

  let guidances;
  try {
    guidances = await db.Guidance.findAll();
  } catch (error) {
    return next(error);
  }
  if (!guidances) return next(new Error("Guidances not found"));

  res.json({
    diseases,
    skills,
    stations,
    hospitals,
    guidances,
  });
};

const getPresentions = async (req, res, next) => {
  let presentions;
  try {
    presentions = await db.Presention.findAll();
  } catch (error) {
    return next(error);
  }
  if (!presentions) return next(new Error("No presentions"));

  let studentCompetences;
  try {
    studentCompetences = await db.Competence.findAll();
  } catch (error) {
    return next(error);
  }
  if (!studentCompetences) return next(new Error("No Student Competences"));

  let students;
  try {
    students = await db.StudentProfile.findAll();
  } catch (error) {
    return next(error);
  }
  if (!students) return next(new Error("No students"));

  //change stationId to station name and student Id to student name and nim
  const updatedPresention = presentions.map((presention) => {
    let stationName;
    let studentName;
    let studentNumber;
    studentCompetences.forEach((studentCompetence) => {
      if (presention.competenceId === studentCompetence.id) {
        stationName = studentCompetence.stationName;
      }
    });

    students.forEach((student) => {
      if (presention.studentId === student.userId) {
        studentName = `${student.firstName} ${student.lastName}`;
        studentNumber = student.studentNumber;
      }
    });

    return {
      ...presention.dataValues,
      stationName,
      studentName,
      studentNumber,
    };
  });

  res.json({
    updatedPresention,
  });
};

const getCompetencesData = async (req, res, next) => {
  let competences;
  try {
    competences = await db.Competence.findAll();
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

  let lecturerProfiles;
  try {
    lecturerProfiles = await db.LecturerProfile.findAll();
  } catch (error) {
    return next(error);
  }
  if (!lecturerProfiles) {
    return next(new Error("No lecturer profiles found"));
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

module.exports = {
  getAllUser,
  getElogbookInfo,
  getPresentions,
  getCompetencesData,
};
