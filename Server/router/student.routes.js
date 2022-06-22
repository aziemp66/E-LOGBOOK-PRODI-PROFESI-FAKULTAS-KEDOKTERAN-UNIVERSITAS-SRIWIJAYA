const studentController = require("../controllers/student.controller");
const fileUploadMiddleware = require("../middlewares/file-upload");

const router = require("express").Router();

router.get("/profile", studentController.getProfile);

router.patch("/profile", studentController.updateProfile);

router.get("/competence", studentController.getCompetenceInfo);

router.post("/competence", studentController.addCompetence);

router.patch(
  "/profile/picture",
  fileUploadMiddleware.studentProfilePhotoUpload,
  studentController.updateProfilePicture
);

router.delete("/profile/picture", studentController.deleteProfilePicture);

router.get(
  "/disease-and-skill/:stationId",
  studentController.getStationDiseaseAndSkills
);

module.exports = router;
