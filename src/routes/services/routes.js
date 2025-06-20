const express = require("express");
const router = express.Router();
const servicesController = require('../../controller/services/servicesController');
const validateJWT = require('../../middlewares/validateJwt');

router.post('/', validateJWT, servicesController.createService);
router.put('/:id', validateJWT, servicesController.postUnpostService)
router.get('/search', servicesController.searchService)


module.exports = router;