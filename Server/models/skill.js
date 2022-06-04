module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define("Skill", {
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
  return Skill;
};
