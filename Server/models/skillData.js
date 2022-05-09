module.exports = (sequelize, DataTypes) => {
	const SkillData = sequelize.define("SkillData", {
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
	return SkillData;
};
