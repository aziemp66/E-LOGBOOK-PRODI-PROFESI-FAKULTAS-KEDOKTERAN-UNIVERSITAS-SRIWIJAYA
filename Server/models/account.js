module.exports = (sequelize, DataTypes) => {
	const Account = sequelize.define("Account", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
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
		NIM: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		periodYear: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		academicCouncellor: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	return Account;
};
