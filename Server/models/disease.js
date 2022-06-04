module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define("Disease", {
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
    station: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Disease;
};
