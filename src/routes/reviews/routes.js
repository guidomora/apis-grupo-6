const express = require("express");
const router = express.Router();
const reviewController = require("../../controller/review/reviewController");
const validateJWT = require("../../middlewares/validateJwt");

router.post("/", validateJWT, reviewController.createReview);
router.get("/:id", validateJWT, reviewController.getTrainerReviews);

module.exports = router;
