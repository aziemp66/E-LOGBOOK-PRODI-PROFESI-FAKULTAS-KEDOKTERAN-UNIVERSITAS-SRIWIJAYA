module.exports = (sequelize, DataTypes) => {
	const StudentProfile = sequelize.define("StudentProfile", {
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
	return StudentProfile;
};
