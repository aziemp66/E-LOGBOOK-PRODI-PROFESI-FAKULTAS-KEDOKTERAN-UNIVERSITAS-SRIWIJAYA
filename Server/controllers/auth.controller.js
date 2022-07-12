const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const validation = require("../utility/validation");
const generateToken = require("../utility/generateToken");

const userRegister = async (req, res, next) => {
  const { username, email, password, confirmPassword, firstName, lastName } =
    req.body;

  //check if password and confirm password match
  if (password !== confirmPassword)
    return next(new Error("Password and confirm password do not match"));

  const { error } = validation.registerValidation({
    username,
    email,
    password,
  });
  if (error) return next(error.details[0]);

  //check if user already exists
  let existingUser;
  try {
    existingUser = await db.User.findOne({
      where: {
        username,
      },
    });
  } catch (error) {
    return next(error);
  }
  if (existingUser) {
    return next(new Error("Username or email already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user;
  try {
    user = await db.User.create({
      id: uuid(),
      username,
      password: hashedPassword,
      email,
    });
  } catch (error) {
    return next(error);
  }
  if (!user) return next(new Error("User not created"));

  //creating student profile
  let studentProfile;
  try {
    studentProfile = await db.StudentProfile.create({
      userId: user.id,
      firstName,
      lastName,
    });
  } catch (error) {
    return next(error);
  }
  if (!studentProfile) return next(new Error("Student profile not created"));

  res.json({
    message: "User created successfully",
  });
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const { error } = validation.loginValidation({
    username,
    password,
  });
  if (error) return next(error.details[0]);

  const user = await db.User.findOne({
    where: {
      username,
    },
  });
  if (!user) return next(new Error("Username or password is incorrect"));

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return next(new Error("Username or password is incorrect"));

  const accessToken = generateToken({
    id: user.id,
    username: user.username,
    role: user.roles,
  });

  res.json({
    accessToken,
  });
};

module.exports = {
  userRegister,
  userLogin,
};
