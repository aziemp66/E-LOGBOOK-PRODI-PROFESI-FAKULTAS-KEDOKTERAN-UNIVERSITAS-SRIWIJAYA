const studentController = require("../controllers/student.controller");

const router = require("express").Router();

router.post("/updateProfile", studentController.updateProfile);

module.exports = router;
