const express = require("express");
const router = express.Router();
const reviewController = require("../../controller/review/reviewController");

router.post("/", reviewController.createReview);
router.get("/:id", reviewController.getTrainerReviews);

module.exports = router;
