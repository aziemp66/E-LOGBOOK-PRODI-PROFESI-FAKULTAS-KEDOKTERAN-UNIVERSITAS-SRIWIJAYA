const verifyRoles = (roles, req, res, next) => {
  const user = req.user;
  if (user.role.includes(roles)) {
    next();
  } else {
    res.json({
      error: `User is not verified - Access denied`,
    });
  }
};

module.exports = verifyRoles;
