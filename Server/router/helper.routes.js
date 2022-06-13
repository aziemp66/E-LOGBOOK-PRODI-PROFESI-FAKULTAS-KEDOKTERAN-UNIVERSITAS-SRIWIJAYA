const router = require("express").Router();
const helperController = require("../controllers/helper.controller");

router.get("/stations", helperController.getStationsData);

module.exports = router;
