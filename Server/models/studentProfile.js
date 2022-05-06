module.exports = (sequelize, DataTypes) => {
	const StudentProfile = sequelize.define("StudentProfile", {
		userId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		studentNumber: {
			type: DataTypes.STRING,
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
			type: DataTypes.STRING,
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
