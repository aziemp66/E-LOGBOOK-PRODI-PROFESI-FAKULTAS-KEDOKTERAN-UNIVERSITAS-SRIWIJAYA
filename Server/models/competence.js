module.exports = (sequelize, DataTypes) => {
  const Competence = sequelize.define("Competence", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientInitials: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patientMedicalNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diseaseCompetence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skillCompetence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lecturerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lecturerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guidanceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hospitalName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Competence;
};
