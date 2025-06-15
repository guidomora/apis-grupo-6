const express = require("express");
const router = express.Router();
const servicesController = require('../../controller/services/servicesController');

router.post('/', servicesController.createService);
router.put('/:id', servicesController.postUnpostService)


module.exports = router;