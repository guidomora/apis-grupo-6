const express = require("express");
const router = express.Router();
const servicesController = require('../../controller/services/servicesController');
const validateJWT = require('../../middlewares/validateJwt');

router.post('/', validateJWT, servicesController.createService);  //Crear un servicio
router.put('/:id', validateJWT, servicesController.postUnpostService)  //Eliminar un servicio
router.get('/search', servicesController.searchService)   //Buscar un servicio
router.get('/:id', servicesController.getServiceById); // Ver un servicio específico + views++
router.get('/active', servicesController.getActiveServices); // Obtener servicios activos
router.get("/shared-files/:id", validateJWT, servicesController.getTrainerFiles);  //Obtener los archivos compartidos
router.post('/create-preference', servicesController.servicePayment);





module.exports = router;