const db = require("../models");

const updateUserRole = async (req, res, next) => {
  const { userId, role } = req.body;

  let existingUser;
  try {
    existingUser = await db.User.find({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (!existingUser) {
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

    const existingUserRole = existingUser.roles;
    if (existingUserRole === "student") {
      existingUser.profile = await db.StudentProfile.findOne({
        where: {
          userId: existingUser.id,
        },
      });
    } else if (existingUserRole === "lecturer") {
      existingUser.profile = await db.LecturerProfile.findOne({
        where: {
          userId: existingUser.id,
        },
      });
    }

    try {
      await db[profiles].findOrCreate({
        where: {
          userId: existingUser.id,
        },
        defaults: {
          userId: existingUser.id,
          firstName:
            (existingUser.profile && existingUser.profile.firstName) ||
            existingUser.username,
          lastName:
            (existingUser.profile && existingUser.profile.lastName) || null,
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
