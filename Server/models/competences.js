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
    patientInitials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientMedicalNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diseaseCompetence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillCompetence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lecturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guidanceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hospital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Competence;
};
