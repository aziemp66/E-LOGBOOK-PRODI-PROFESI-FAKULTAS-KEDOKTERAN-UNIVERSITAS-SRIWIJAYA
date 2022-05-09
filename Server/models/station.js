module.exports = (sequelize, DataTypes) => {
	const Station = sequelize.define("Station", {
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
	});
	return Station;
};
