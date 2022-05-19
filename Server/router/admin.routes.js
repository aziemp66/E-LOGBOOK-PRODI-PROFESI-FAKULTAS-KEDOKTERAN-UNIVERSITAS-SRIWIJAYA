const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/stations", adminController.getAllStations);

router.get("/disease-and-skill", adminController.getAllDiseasesAndSkills);

router.post("/stations", adminController.addStation);

router.post("/disease", adminController.addDisease);

router.post("/skill", adminController.addSkill);

router.patch("/roles/:id", adminController.updateUserRoles);

router.post("/presention", adminController.addStudentPresention);

module.exports = router;
