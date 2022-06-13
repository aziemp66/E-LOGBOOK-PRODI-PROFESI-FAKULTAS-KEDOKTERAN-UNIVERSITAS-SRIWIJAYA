module.exports = (sequelize, DataTypes) => {
  const Competence = sequelize.define("Competence", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
    guidanceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hospital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Competence;
};
