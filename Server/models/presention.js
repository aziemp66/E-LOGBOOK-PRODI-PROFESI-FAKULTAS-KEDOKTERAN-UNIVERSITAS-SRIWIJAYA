module.exports = (sequelize, DataTypes) => {
  const Presention = sequelize.define("Presention", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    present: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    absent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sick: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    excused: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Presention;
};
