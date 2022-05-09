const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.post("/station", adminController.addStation);

router.post("/disease", adminController.addDisease);

router.post("/skill", adminController.addSkill);

module.exports = router;
