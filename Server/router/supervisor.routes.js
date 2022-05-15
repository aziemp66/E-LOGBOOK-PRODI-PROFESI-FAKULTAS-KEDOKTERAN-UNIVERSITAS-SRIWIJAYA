const router = require("express").Router();
const supervisorController = require("../controllers/supervisor.controller");

router.get("/students", supervisorController.getStudents);

router.get("/competences", supervisorController.getCompetences);

module.exports = router;
