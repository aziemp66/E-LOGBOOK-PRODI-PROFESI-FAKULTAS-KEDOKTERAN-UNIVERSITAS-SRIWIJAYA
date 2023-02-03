const db = require("../models");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const validation = require("../utility/validation");
const emailSender = require("../utility/node-mailer");
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
    firstName,
    lastName,
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

  if (!user.isVerified) return next(new Error("User is not verified"));

  const accessToken = generateToken({
    id: user.id,
    username: user.username,
    role: user.roles,
  });

  res.json({
    accessToken,
  });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await db.User.findOne({ email });
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  const resetPasswordToken = resetPassword.generateLink(
    { email: user.email, password: user.password },
    `${process.env.JWT_SECRET}${user.password}`
  );
  const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?id=${user._id}&token=${resetPasswordToken}`;

  try {
    emailSender({
      to: user.email,
      subject: "Reset Password",
      html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password</p>`,
      text: `Click here to reset your password: ${resetPasswordLink}`,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Reset Password Link has been sent to your email" });
};

const resetUserPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.query;

  const { error } = validation.passwordChangeValidation({
    password,
    confirmPassword,
  });
  if (error) return next(error.details[0]);

  let user;
  try {
    user = await db.User.findOne({ id: id });
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  let isVerified;
  try {
    isVerified = resetPassword.verifyLink(
      token,
      `${process.env.JWT_SECRET}${user.password}`
    );
  } catch (err) {
    return next(err);
  }
  if (!isVerified) return next(new Error("Link is invalid"));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  try {
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  userRegister,
  userLogin,
  forgotPassword,
  resetUserPassword,
};
