const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/stations", adminController.getStations);

router.get("/disease-and-skill", adminController.getDiseaseAndSkill);

router.post("/station", adminController.addStation);

router.post("/disease", adminController.addDisease);

router.post("/skill", adminController.addSkill);

router.patch("/roles/:id", adminController.updateUserRoles);

module.exports = router;
