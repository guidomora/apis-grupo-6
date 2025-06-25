const express = require("express");
const router = express.Router();
const servicesController = require('../../controller/services/servicesController');
const validateJWT = require('../../middlewares/validateJwt');

// Rutas más específicas primero
router.get('/active', servicesController.getActiveServices); // Obtener servicios activos
router.get('/search', servicesController.searchService);     // Buscar servicios
router.get("/shared-files/:id", validateJWT, servicesController.getTrainerFiles); // Archivos compartidos

// Crear y subir archivo
router.post('/', validateJWT, servicesController.createService);  // Crear un servicio
router.patch('/upload-file/:id', validateJWT, servicesController.uploadFileToService);

// Publicar/despublicar (PUT para toggle de published)
router.put('/:id', validateJWT, servicesController.postUnpostService);
router.delete('/:id', validateJWT, servicesController.deleteService);
router.patch('/:id', validateJWT, servicesController.updateService);

// Rutas con ID deben ir al final
router.get('/:id', servicesController.getServiceById); // Ver un servicio específico + views++
router.post('/create-preference', servicesController.servicePayment); // Pago (puede ir al final si no interfiere)


module.exports = router;
