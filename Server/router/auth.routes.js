const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", authController.userRegister);

module.exports = router;
