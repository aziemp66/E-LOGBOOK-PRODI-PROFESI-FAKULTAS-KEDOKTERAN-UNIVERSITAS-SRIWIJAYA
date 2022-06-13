const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    username: Joi.string().max(255).required(),
    password: Joi.string().max(1024).required(),
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
    studentNumber: Joi.string().min(1).max(255),
    address: Joi.string().min(1).max(255),
    email: Joi.string().min(6).max(255).email(),
    phone: Joi.string().min(1).max(255),
    entryPeriod: Joi.number().integer().min(1).max(99999999),
    academicCouncellor: Joi.string().min(1).max(255),
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
    station: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const addSkillValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    station: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const addGuidanceValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(data);
};

const updateUserRolesValidation = (data) => {
  const schema = Joi.object({
    roles: Joi.array().items(Joi.string().min(1).max(255)).required(),
  });

  return schema.validate(data);
};

const addStudentPresentionValidation = (data) => {
  const schema = Joi.object({
    studentId: Joi.string().min(1).max(255).required(),
    month: Joi.number().min(1).max(12).required(),
    year: Joi.number().min(1).max(9999).required(),
    present: Joi.number().min(1).max(31).required(),
    absent: Joi.number().min(1).max(31).required(),
    sick: Joi.number().min(1).max(31).required(),
    excused: Joi.number().min(1).max(31).required(),
  });

  return schema.validate(data);
};

const addCompetenceValidation = (data) => {
  const schema = Joi.object({
    stationId: Joi.string().min(1).max(255),
    days: Joi.number().min(1).max(31),
    months: Joi.number().min(1).max(12),
    years: Joi.number().min(1).max(9999),
    hospital: Joi.string().min(1).max(255),
    patientInitials: Joi.string().min(1).max(255),
    patientMedicalNumber: Joi.string().min(1).max(255),
    diseaseName: Joi.string().min(1).max(255),
    diseaseCompetence: Joi.string().min(1).max(255),
    skillName: Joi.string().min(1).max(255),
    skillCompetence: Joi.string().min(1).max(255),
    lecturerId: Joi.string().min(1).max(255),
    guidanceType: Joi.string().min(1).max(255),
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
  updateUserRolesValidation,
  addStudentPresentionValidation,
  addCompetenceValidation,
};
