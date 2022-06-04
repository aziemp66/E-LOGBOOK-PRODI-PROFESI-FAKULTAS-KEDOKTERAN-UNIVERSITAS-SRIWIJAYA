module.exports = (sequelize, DataTypes) => {
  const lecturerProfile = sequelize.define("LecturerProfile", {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return lecturerProfile;
};
