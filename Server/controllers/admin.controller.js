const db = require("../models");
const validation = require("../utility/validation");

const getAllDiseasesAndSkills = async (req, res, next) => {
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

  res.json({
    diseases,
    skills,
  });
};

const addStation = async (req, res, next) => {
  const { name } = req.body;

  const { error } = validation.addStationValidation({ name });
  if (error) return next(error.details[0]);

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
  const { name, stationId } = req.body;

  const { error } = validation.addDiseaseValidation({
    name,
    stationId,
  });
  if (error) return next(error.details[0]);

  //check if station exist
  let existingStation;
  try {
    existingStation = await db.Station.findOne({
      where: {
        id: stationId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!existingStation) return next(new Error("Station does not exist"));

  try {
    await db.Disease.create({
      name,
      station: stationId,
    });
  } catch (error) {
    return next(error);
  }
  res.json({
    message: "Disease added successfully",
  });
};

const addSkill = async (req, res, next) => {
  const { name, stationId } = req.body;

  const { error } = validation.addSkillValidation({ name, stationId });
  if (error) return next(error.details[0]);

  try {
    await db.Skill.create({
      name,
      station: stationId,
    });
  } catch (error) {
    return next(error);
  }
  res.json({
    message: "Skill added successfully",
  });
};

const addGuidance = async (req, res, next) => {
  const { name } = req.body;

  const { error } = validation.addGuidanceValidation({ name });
  if (error) return next(error.details[0]);

  try {
    await db.Guidance.create({
      name,
    });
    res.json({
      message: "Guidance added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const addHospital = async (req, res, next) => {
  const { name } = req.body;

  const { error } = validation.addHospitalValidation({ name });
  if (error) return next(error.details[0]);

  try {
    await db.Hospital.create({
      name,
    });
    res.json({
      message: "Hospital added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserRoles = async (req, res, next) => {
  const { id: userId } = req.params;
  const { role } = req.body;

  const { error } = validation.updateUserRolesValidation({ role });
  if (error) return next(error.details[0]);

  //check if user exist
  let existingUser;
  try {
    existingUser = await db.User.findOne({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!existingUser) return next(new Error("User does not exist"));

  if (
    role !== "admin" &&
    role !== "student" &&
    role !== "lecturer" &&
    role !== "supervisor"
  )
    return next(new Error("Invalid role"));

  try {
    await db.User.update(
      {
        roles: role,
      },
      {
        where: {
          id: existingUser.id,
        },
      }
    );
  } catch (error) {
    return next(error);
  }

  //creating user profile if user is student or lecturer
  if (role === "student" || role === "lecturer") {
    const capitalizeRole = role.charAt(0).toUpperCase() + role.slice(1);
    const profiles = `${capitalizeRole}Profile`;

    try {
      await db[profiles].create({
        userId: existingUser.id,
        displayName: existingUser.username,
      });
    } catch (error) {
      return next(error);
    }
  }

  res.json({
    message: "User role updated successfully",
  });
};

const addStudentPresention = async (req, res, next) => {
  const { studentId } = req.body;
  const { month, year, present, sick, excused, absent } = req.body;

  const { error } = validation.addStudentPresentionValidation({
    studentId,
    month,
    year,
    present,
    sick,
    excused,
    absent,
  });
  if (error) return next(error.details[0]);

  //check if there is already student presention this month and year
  try {
    const presentionExist = db.Presention.findOne({
      where: {
        studentId,
        month,
        year,
      },
    });
    if (presentionExist)
      return next(new Error("Presention already exist this month"));
  } catch (error) {
    return next(error);
  }

  try {
    await db.Presention.create({
      studentId,
      month,
      year,
      present,
      absent,
      sick,
      excused,
    });
    res.json({
      message: "Presention Successfully Created",
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllDiseasesAndSkills,
  addStation,
  addDisease,
  addSkill,
  addGuidance,
  addHospital,
  updateUserRoles,
  addStudentPresention,
  getAllUsers,
};
