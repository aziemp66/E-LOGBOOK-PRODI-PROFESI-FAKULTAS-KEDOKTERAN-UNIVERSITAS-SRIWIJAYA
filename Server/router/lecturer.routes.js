const router = require("express").Router();
const lecturerController = require("../controllers/lecturer.controller");

router.get("/competence", lecturerController.getLecturerCompetencesData);

router.post("/verify", lecturerController.verifyStudentCompetences);

module.exports = router;
