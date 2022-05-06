const verifyRoles = (roles, req, res, next) => {
	const user = req.user;

	console.log(roles);

	if (user.roles === roles) {
		next();
	} else {
		res.json({
			error: `User is not ${roles} - Access denied`,
		});
	}
};

module.exports = verifyRoles;
