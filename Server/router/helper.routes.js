const router = require("express").Router();
const helperController = require("../controllers/helper.controller");

router.get("/stations", helperController.getStationsData);

router.get("/competencesData/:station", helperController.getCompetencesData);

module.exports = router;
