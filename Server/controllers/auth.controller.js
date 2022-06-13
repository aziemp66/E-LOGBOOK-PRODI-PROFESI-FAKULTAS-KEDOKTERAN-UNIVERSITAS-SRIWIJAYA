const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const validation = require("../utility/validation");
const generateToken = require("../utility/generateToken");

const userRegister = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  //check if password and confirm password match
  if (password !== confirmPassword)
    return next("Password and confirm password do not match");

  //check if user already exists

  try {
    const existingUser =
      (await db.User.findOne({
        where: {
          username,
        },
      })) ||
      (await db.User.findOne({
        where: {
          email,
        },
      }));

    if (existingUser) {
      return next("Username or email already exists");
    }
  } catch (error) {
    return next(error);
  }

  const { error } = validation.registerValidation({
    username,
    email,
    password,
  });
  if (error) return next(error.details[0].message);

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
  if (!user) return next("User not created");

  try {
    await db.StudentProfile.create({
      userId: user.id,
    });
  } catch (error) {
    return next(error);
  }

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
  if (error) return next(error.details[0].message);

  const user = await db.User.findOne({
    where: {
      username,
    },
  });
  if (!user) return next("Username or password is incorrect");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return next("Username or password is incorrect");

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
