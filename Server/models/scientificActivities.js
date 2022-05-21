module.exports = (sequelize, DataTypes) => {
	const ScientificActivities = sequelize.define("ScientificActivites", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		station: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		activityType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		legalizationPage: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		activityPhoto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lecturer: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return ScientificActivities;
};
