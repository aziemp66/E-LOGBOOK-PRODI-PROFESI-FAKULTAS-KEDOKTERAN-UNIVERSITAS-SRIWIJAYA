const db = require("../models");
const validation = require("../utility/validation");

const getAllUser = async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "name", "email", "role"],
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

  //check if there is a disease with the same name
  let existingDisease;
  try {
    existingDisease = await db.Disease.findOne({
      where: {
        name,
        station: stationId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (existingDisease) return next(new Error("Disease already exists"));

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

  //check if there is a skill with the same name
  let existingSkill;
  try {
    existingSkill = await db.Skill.findOne({
      where: {
        name,
        station: stationId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (existingSkill) return next(new Error("Skill already exists"));

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

  //check if there is a guidance with the same name
  let existingGuidance;
  try {
    existingGuidance = await db.Guidance.findOne({
      where: {
        name,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (existingGuidance) return next(new Error("Guidance already exists"));

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

  //check if there is a hospital with the same name
  let existingHospital;
  try {
    existingHospital = await db.Hospital.findOne({
      where: {
        name,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (existingHospital) return next(new Error("Hospital already exists"));

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

const addOrUpdateStudentPresention = async (req, res, next) => {
  const { month, year, present, sick, excused, absent, studentId } = req.body;

  if (sick + excused + absent + present > 31)
    return next(new Error("Days are more than 31"));

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

  let data, isCreated;
  try {
    [data, isCreated] = await db.Presention.findOrCreate({
      where: {
        studentId,
        month,
        year,
      },
      default: {
        studentId,
        month,
        year,
        present,
        absent,
        sick,
        excused,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!isCreated && data) {
    try {
      await data.update({
        present,
        absent,
        sick,
        excused,
      });
    } catch (error) {
      return next(error);
    }
  } else if (!data) {
    return next(new Error("Can't Find or Create Competence"));
  }

  res.json({
    message: `Presention successfully ${isCreated ? "Created" : "Updated"} `,
  });
};

const updateUserRoles = async (req, res, next) => {
  const { role, id: userId } = req.body;

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

module.exports = {
  getAllUser,
  getElogbookInfo,
  addStation,
  addDisease,
  addSkill,
  addGuidance,
  addHospital,
  updateUserRoles,
  addOrUpdateStudentPresention,
};
