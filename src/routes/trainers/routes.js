const express = require('express');
const router = express.Router();
const { getTrainers } = require('../../controller/trainers/controller');


/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Obtener todos los entrenadores
 *     responses:
 *       200:
 *         description: Lista de entrenadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

router.get('/', getTrainers);

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Agregar un servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - categoria
 *               - duracion
 *               - precio
 *               - disponibilidadHoraria
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: servicio1
 *               categoria:
 *                 type: string
 *                 example: boxeo
 *               precio:
 *                 type: integer
 *                 example: 10000
 *               disponibilidadHoraria:
 *                 type: string
 *                 example: noche
 *     responses:
 *       201:
 *         description: Servicio creado existosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    format: uuid
 *                    example: uuid
 *                  nombre:
 *                    type: string
 *                    example: servicio1
 *                  categoria:
 *                    type: string
 *                    example: boxeo
 *                  precio:
 *                    type: integer
 *                    example: 10000
 *                  disponibilidadHoraria:
 *                    type: string
 *                    example: noche
 *                  publicado:
 *                    type: boolean
 *                    example: false
 *       400:
 *         description: Error al crear el servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear el servicio
 */

router.post("/service", getTrainers);

/**
 * @swagger
 * /service/{id}:
 *   post:
 *     summary: Publicar o Despublica un servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del usuario
 *     responses:
 *       201:
 *         description: Servicio creado existosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    format: uuid
 *                    example: uuid
 *                  publicado:
 *                    type: boolean
 *                    example: true
 *       400:
 *         description: Error al crear el servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Servicio publicado
 */

router.post("/service-publish/:id", getTrainers);

/**
 * @swagger
 * /service/{id}/statistics:
 *   get:
 *     summary: Estadisticas de un servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del usuario
 *     responses:
 *       201:
 *         description: Servicio creado existosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    format: uuid
 *                    example: uuid
 *                  visualizaciones:
 *                    type: number
 *                    example: 300
 *                  calificaciones:
 *                    type: object
 *                    example: {1, 2, 3, 4, 5}
 *                  comentarios:
 *                    type: array
 *                    example: ['El mejor de todos', 'Excelente servicio']
 *       400:
 *         description: Error al obtener estadisticas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener estadisticas
 */

router.get("/service/:id/statistics", getTrainers);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Servicios activos
 *     responses:
 *       201:
 *         description: Servicios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 550e8400-e29b-41d4-a716-446655440000
 *                   nombre:
 *                     type: string
 *                     example: Servicio1
 *                   nombreCliente:
 *                     type: string
 *                     example: Pepe
 *                   estado:
 *                     type: string
 *                     example: pendiente
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: 2025-12-16
 *                   archivo:
 *                     type: string
 *                     example: https://example.com/archivo.pdf
 *       400:
 *         description: Error al obtener estadisticas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener servicios
 */

router.get("/services", getTrainers);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Aceptar o rechazar un servicio
 *     responses:
 *       201:
 *         description: Aceptar o rechazar un servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 550e8400-e29b-41d4-a716-446655440000
 *                   estado:
 *                     type: string
 *                     example: aceptado
 *       400:
 *         description: Error al obtener aceptar o rechazar un servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener aceptar o rechazar un servicio
 */

router.get("/services/:id", getTrainers);

/**
 * @swagger
 * /search/{category}/{zone}/{price}/{mode}/{calificacion}/{duracion}:
 *   get:
 *     summary: Busqueda de entrenadores
 *     parameters:
 *       - in: path
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *       - in: path
 *         name: zone
 *         required: false
 *         schema:
 *           type: string
 *       - in: path
 *         name: price
 *         required: false
 *         schema:
 *           type: integer
 *       - in: path
 *         name: mode
 *         required: false
 *         schema:
 *           type: string
 *       - in: path
 *         name: calificacion
 *         required: false
 *         schema:
 *           type: string
 *       - in: path
 *         name: duracion
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Busqueda de entrenadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 550e8400-e29b-41d4-a716-446655440000
 *                   nombreEntrenador:
 *                     type: string
 *                     example: Agustin
 *                   nombreClase:
 *                     type: string
 *                     example: Pilates
 *                   comentarios:
 *                     type: array
 *                     example: ['El mejor entrenador', 'Excelentes clases']
 *                   precio:
 *                     type: number
 *                     example: 15000
 *       400:
 *         description: Error al obtener entrenadores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener servicios
 */

router.get("/search/:category/:zone/:price/:mode/:calificacion/:duracion", getTrainers);

module.exports = router;