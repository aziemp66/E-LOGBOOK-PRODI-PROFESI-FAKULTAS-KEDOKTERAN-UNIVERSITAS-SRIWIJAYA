const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", authController.userRegister);

router.post("/login", authController.userLogin);

module.exports = router;