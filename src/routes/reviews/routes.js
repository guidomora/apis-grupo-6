const express = require("express");
const router = express.Router();
const reviewController = require("../../controller/review/reviewController");
const validateJWT = require('../../middlewares/validateJwt');

// Crear reseña (cliente)
router.post("/", validateJWT, reviewController.createReview);

// Obtener reseñas de un entrenador (público)
router.get("/:id", reviewController.getTrainerReviews);

// Responder una reseña (entrenador)
router.patch("/reply/:id", validateJWT, reviewController.replyToReview);

module.exports = router;
