const db = require("../models");

const updateUserRole = async (req, res, next) => {
  const { userId, role } = req.body;

  let user;
  try {
    user = await db.User.find({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return next(new Error("User not found"));
  }

  if (role !== "student" && role !== "lecturer" && role !== "supervisor")
    return next(new Error("Invalid role"));

  //update user roles
  try {
    await user.update({
      roles: role,
    });
  } catch (error) {
    return next(error);
  }

  //creating user profile if user is student or lecturer
  if (role === "student" || role === "lecturer") {
    const capitalizeRole = role.charAt(0).toUpperCase() + role.slice(1);
    const profiles = `${capitalizeRole}Profile`;

    try {
      await db[profiles].findOrCreate({
        where: {
          userId: user.id,
        },
        defaults: {
          userId: user.id,
          displayName: user.username,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  res.json({
    message: "User roles updated",
  });
};

module.exports = {
  updateUserRole,
};
