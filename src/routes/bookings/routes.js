const express = require("express");
const router = express.Router();
const bookingController = require("../../controller/booking/bookingController");
const validateJWT = require("../../middlewares/validateJwt");

// Rutas más específicas primero
router.post("/user/classes/:id/cancel", validateJWT, bookingController.cancelClass); // Cancelar clase
router.post("/status/:id", validateJWT, bookingController.acceptRejectBooking); // Aceptar o rechazar
router.get("/user/:id/confirmed-trainers", validateJWT, bookingController.getConfirmedBookingsByUser);

router.get("/trainer/:id", validateJWT, bookingController.getBookingsByTrainer); // Reservas por entrenador
router.get("/user/:id", validateJWT, bookingController.getBookingsByUser); // Reservas por usuario

// Ruta general al final (puede colisionar con :id si va antes)
router.post("/:id", validateJWT, bookingController.createBooking); // Crear una reserva

module.exports = router;
