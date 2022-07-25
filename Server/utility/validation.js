const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    username: Joi.string().max(255).required(),
    password: Joi.string().max(1024).required(),
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).allow("", null),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(255),
    lastName: Joi.string().min(1).max(255),
    studentNumber: Joi.string().min(14).max(14),
    address: Joi.string().min(1).max(255),
    email: Joi.string().min(6).max(255).email(),
    phone: Joi.string().min(1).max(255),
    entryPeriod: Joi.number().integer().min(1).max(99999999),
    academicCounselor: Joi.string().min(1).max(255),
    days: Joi.number().integer().min(1).max(31),
    months: Joi.number().integer().min(1).max(12),
    years: Joi.number().integer().min(1).max(9999),
  });

  return schema.validate(data);
};

const addStationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const addDiseaseValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    stationId: Joi.string().required(),
  });

  return schema.validate(data);
};

const addSkillValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    stationId: Joi.string().required(),
  });

  return schema.validate(data);
};

const addGuidanceValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const addHospitalValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const updateUserRolesValidation = (data) => {
  const schema = Joi.object({
    role: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const addStudentPresentionValidation = (data) => {
  const schema = Joi.object({
    present: Joi.number().required(),
    absent: Joi.number().required(),
    sick: Joi.number().required(),
    excused: Joi.number().required(),
  });

  return schema.validate(data);
};

const addCompetenceValidation = (data) => {
  const schema = Joi.object({
    stationId: Joi.string().required(),
    hospitalId: Joi.string().allow("", null),
    patientInitials: Joi.string().allow("", null),
    patientMedicalNumber: Joi.string().allow("", null),
    diseaseId: Joi.string().allow("", null),
    diseaseCompetence: Joi.string().allow("", null),
    skillId: Joi.string().allow("", null),
    skillCompetence: Joi.string().allow("", null),
    lecturerId: Joi.string().allow("", null),
    guidanceId: Joi.string().allow("", null),
  });

  return schema.validate(data);
};

const updateStationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const updateDiseaseValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    station: Joi.string().required(),
  });

  return schema.validate(data);
};

const updateSkillValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    station: Joi.string().required(),
  });

  return schema.validate(data);
};

const updateGuidanceValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const updateHospitalValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const patchPresentionValidation = (data) => {
  const schema = Joi.object({
    present: Joi.number().min(0).required(),
    absent: Joi.number().min(0).required(),
    sick: Joi.number().min(0).required(),
    excused: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  addStationValidation,
  addDiseaseValidation,
  addSkillValidation,
  addGuidanceValidation,
  addHospitalValidation,
  updateUserRolesValidation,
  addStudentPresentionValidation,
  addCompetenceValidation,
  updateStationValidation,
  updateDiseaseValidation,
  updateSkillValidation,
  updateGuidanceValidation,
  updateHospitalValidation,
  patchPresentionValidation,
};
