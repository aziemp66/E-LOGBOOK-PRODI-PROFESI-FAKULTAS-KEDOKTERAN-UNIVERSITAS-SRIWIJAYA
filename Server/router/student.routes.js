const studentController = require("../controllers/student.controller");

const router = require("express").Router();

router.get("/profile", studentController.getProfile);

router.patch("/profile", studentController.updateProfile);

router.get("/competecence", studentController.getCompetenceInfo);

router.post("/competence", studentController.addCompetence);

router.get("/disease-and-skill", studentController.getStationDiseaseAndSkills);

router.get(
  "/disease-and-skill/:stationId",
  studentController.getStationDiseaseAndSkills
);

module.exports = router;
