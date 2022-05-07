const studentController = require("../controllers/student.controller");

const router = require("express").Router();

router.get("/profile", studentController.getProfile);

router.patch("/profile", studentController.updateProfile);

module.exports = router;
