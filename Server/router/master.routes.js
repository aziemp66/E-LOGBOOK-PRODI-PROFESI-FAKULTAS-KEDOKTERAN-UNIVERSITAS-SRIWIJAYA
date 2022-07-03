const router = require("express").Router();

const masterController = require("../controllers/master.controller");

router.patch("/user", masterController.updateUserRole);

module.exports = router;
