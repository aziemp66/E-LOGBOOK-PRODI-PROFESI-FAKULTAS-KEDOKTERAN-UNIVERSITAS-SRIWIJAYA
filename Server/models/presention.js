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
    presentionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    present: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    absent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sick: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    excused: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return Presention;
};
