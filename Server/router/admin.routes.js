const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get(
  "/disease-and-skill/:stationId",
  adminController.getAllDiseasesAndSkills
);

router.post("/station", adminController.addStation);

router.post("/disease", adminController.addDisease);

router.post("/skill", adminController.addSkill);

router.post("/guidance", adminController.addGuidance);

router.patch("/roles", adminController.updateUserRoles);

router.post("/presention", adminController.addStudentPresention);

module.exports = router;
