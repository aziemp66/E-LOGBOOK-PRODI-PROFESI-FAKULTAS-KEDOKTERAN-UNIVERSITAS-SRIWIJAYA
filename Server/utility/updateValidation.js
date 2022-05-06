const updateProfileValidation = (data, user) => {
	if (!data.firstName) data.firstName = user.firstName;
	if (!data.lastName) data.lastName = user.lastName;
	if (!data.studentNumber) data.studentNumber = user.studentNumber;
	if (!data.address) data.address = user.address;
	if (!data.email) data.email = user.email;
	if (!data.phone) data.phone = user.phone;
	if (!data.entryPeriod) data.entryPeriod = user.entryPeriod;
	if (!data.academicCouncellor)
		data.academicCouncellor = user.academicCouncellor;
};

module.exports = {
	updateProfileValidation,
};
