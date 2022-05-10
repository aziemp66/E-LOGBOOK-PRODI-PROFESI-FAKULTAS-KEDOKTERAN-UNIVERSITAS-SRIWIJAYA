module.exports = (sequelize, DataTypes) => {
	const Competence = sequelize.define("Competence", {
		userId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		patientInitials: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patientMedicalNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		diseaseName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		diseaseCompetence: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		skillName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		skillCompetence: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lecturersName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		guidanceType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return Competence;
};
