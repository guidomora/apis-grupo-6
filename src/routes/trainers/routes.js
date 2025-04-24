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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Guidito
 */

router.get('/', getTrainers);

module.exports = router;