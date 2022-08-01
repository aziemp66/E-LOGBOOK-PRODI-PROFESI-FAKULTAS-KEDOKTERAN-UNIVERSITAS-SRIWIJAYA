const router = require("express").Router();
const supervisorController = require("../controllers/supervisor.controller");

router.get("/elogbook", supervisorController.getElogbookInfo);

router.get("/user", supervisorController.getAllUser);

router.get("/presentions", supervisorController.getPresentions);

router.get("/competence", supervisorController.getCompetencesData);

module.exports = router;
