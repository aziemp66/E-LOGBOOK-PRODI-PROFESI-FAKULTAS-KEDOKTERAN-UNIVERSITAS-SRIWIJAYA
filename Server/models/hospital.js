module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define("Hospital", {
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
  return Hospital;
};
