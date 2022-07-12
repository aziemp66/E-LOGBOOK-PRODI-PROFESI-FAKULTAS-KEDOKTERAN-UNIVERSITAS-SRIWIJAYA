module.exports = (sequelize, DataTypes) => {
  const lecturerProfile = sequelize.define("LecturerProfile", {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return lecturerProfile;
};
