const express = require('express');
const router = express.Router();
const bookingController = require('../../controller/booking/bookingController');
const validateJWT = require('../../middlewares/validateJwt');


router.post('/:id', validateJWT, bookingController.createBooking)  //Crear una reserva
router.post('/status/:id', validateJWT, bookingController.acceptRejectBooking)  //Aceptar o rechazar
router.post("/user/classes/:id/cancel", bookingController.cancelClass);   //Cancelar clase



module.exports = router;