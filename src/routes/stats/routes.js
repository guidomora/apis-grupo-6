const express = require("express");
const router = express.Router();
const statsController = require("../../controller/stats/statsController");
const validateJWT = require("../../middlewares/validateJwt");

router.get("/trainer/:id", validateJWT, statsController.getTrainerStats);

module.exports = router;
