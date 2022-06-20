module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define("StudentProfile", {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    studentNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entryPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    academicCounselor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return StudentProfile;
};
