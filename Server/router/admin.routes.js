const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/elogbook", adminController.getElogbookInfo);

router.post("/station", adminController.addStation);

router.patch("/station", adminController.updateStation);

router.delete("/station", adminController.deleteStation);

router.post("/disease", adminController.addDisease);

router.patch("/disease", adminController.updateDisease);

router.delete("/disease/:id", adminController.deleteDisease);

router.post("/skill", adminController.addSkill);

router.patch("/skill", adminController.updateSkill);

router.delete("/skill/:id", adminController.deleteSkill);

router.post("/guidance", adminController.addGuidance);

router.patch("/guidance", adminController.updateGuidance);

router.delete("/guidance/:id", adminController.deleteGuidance);

router.post("/hospital", adminController.addHospital);

router.patch("/hospital", adminController.updateHospital);

router.delete("/hospital/:id", adminController.deleteHospital);

router.get("/user", adminController.getAllUser);

router.patch("/user", adminController.updateUserRoles);

router.put("/presention", adminController.addOrUpdateStudentPresention);

module.exports = router;
