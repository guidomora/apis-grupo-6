const express = require('express');
const router = express.Router();
const bookingController = require('../../controller/booking/bookingController');


router.post('/:id', bookingController.createBooking)
router.post('/status/:id', bookingController.acceptRejectBooking)

module.exports = router;