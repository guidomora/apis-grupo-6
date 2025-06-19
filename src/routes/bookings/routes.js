const express = require('express');
const router = express.Router();
const bookingController = require('../../controller/booking/bookingController');
const validateJWT = require('../../middlewares/validateJwt');


router.post('/:id', validateJWT, bookingController.createBooking)
router.post('/status/:id', validateJWT, bookingController.acceptRejectBooking)

module.exports = router;