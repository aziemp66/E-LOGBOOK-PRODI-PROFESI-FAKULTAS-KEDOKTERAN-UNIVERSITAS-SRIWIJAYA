const studentController = require("../controllers/student.controller");

const router = require("express").Router();

router.post("/profile", studentController.updateProfile);

module.exports = router;
