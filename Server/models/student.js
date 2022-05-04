module.exports = (sequelize, DataTypes) => {
	const Student = sequelize.define("Student", {
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		studentNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		entryPeriod: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		academicCouncellor: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	return Student;
};
