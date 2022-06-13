module.exports = (sequelize, DataTypes) => {
  const Guidance = sequelize.define("Guidance", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Guidance;
};
