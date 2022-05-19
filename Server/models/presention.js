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
		month: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		year: {
			type: DataTypes.INTEGER,
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
