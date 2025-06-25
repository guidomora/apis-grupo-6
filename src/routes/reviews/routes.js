const express = require("express");
const router = express.Router();
const reviewController = require("../../controller/review/reviewController");
const validateJWT = require("../../middlewares/validateJwt");

// Rutas específicas deben ir primero para evitar conflictos con "/:id"
router.post("/", validateJWT, reviewController.createReview);

// Obtener reseñas de un entrenador por su ID
router.get("/:id", validateJWT, reviewController.getTrainerReviews);

module.exports = router;
