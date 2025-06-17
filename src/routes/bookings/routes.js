const express = require('express');
const router = express.Router();
const bookingController = require('../../controller/booking/bookingController');


router.post('/', bookingController.createBooking)

module.exports = router;