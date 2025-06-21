const express = require("express");
const router = express.Router();
const userController = require('../../controller/users/userController');
const validateJWT = require('../../middlewares/validateJwt');

//Metodos HTTP
router.post('/register', userController.createUser);  //Crear usuario
router.post('/login', userController.loginUser);     //Login usuario
router.post('/forgot-password', validateJWT, userController.forgotPassword)  //Recuperar mail
router.get('/trainers', validateJWT, userController.getAllTrainers)
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.get('/bookings/:id', validateJWT, userController.getAllServicesFromUser)
router.get('/:id', validateJWT, userController.getUserById)  // usuario por id



// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);



































/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                     example: User1
 */

// router.get("/", getUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *               - birth
 *             properties:
 *               name:
 *                 type: string
 *                 example: UserName
 *               apellido:
 *                 type: string
 *                 example: UserLastname
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: hola12345
 *               birth:
 *                 type: Date
 *                 example: 10-05-1990
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: UserName
 *       400:
 *         description: Si el mail ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear usuario
 */

router.post("/register", userController.createUser); //TODO: llamada al controller

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Ingresa un usuario a la plataforma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: hola12345
 *     responses:
 *       201:
 *         description: Usuario ingresado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: UserName
 *       400:
 *         description: Si el mail o password son incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error ingresar. Correo o contraseña incorrectos
 */

// router.post("/login", getUsers);


/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email de recuperación enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Se ha enviado un correo con instrucciones
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 */
// router.post("/forgot-password", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener datos personales del usuario
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
 *         description: datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: UserName
 *                 apellido:
 *                   type: string
 *                   example: UserLastname
 *                 correo:
 *                   type: string
 *                   example: user@mail.com
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   example: 05-10-1990
 *       404:
 *         description: No se pudieron obtener los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudieron obtener los datos
 */

// router.get("/users/:id", getUsers);

/**
 * @swagger
 * /users/{id}/classes:
 *   get:
 *     summary: Obtener clases en las que esta anotado el usuario
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
 *         description: Obtener clases en las que esta anotado el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Yoga
 *                 trainerName:
 *                   type: string
 *                   example: TrainerName
 *                 mode:
 *                   type: string
 *                   example: Presencial
 *                 classDate:
 *                   type: string
 *                   format: date
 *                   example: 15-05-2025
 *                 time:
 *                   type: string
 *                   format: string
 *                   example: 14:00pm a 15:00pm
 *                 price:
 *                   type: integer
 *                   example: 10000
 *                 state:
 *                   type: string
 *                   example: aceptado
 *       404:
 *         description: No se pudieron obtener los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudieron obtener los datos
 */

// router.get("/user/:id/classes", getUsers);

/**
 * @swagger
 * /user/classes/{id}/cancel:
 *   post:
 *     summary: Dar de baja una clase
 *     responses:
 *       201:
 *         description: Opinion creada existosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Yoga
 *                 trainerName:
 *                   type: string
 *                   example: TrainerName
 *                 mode:
 *                   type: string
 *                   example: Presencial
 *                 classDate:
 *                   type: string
 *                   format: date
 *                   example: 15-05-2025
 *                 time:
 *                   type: string
 *                   format: string
 *                   example: 14:00pm a 15:00pm
 *                 price:
 *                   type: integer
 *                   example: 10000
 *                 state:
 *                   type: string
 *                   example: cancelada
 *       400:
 *         description: Error al cancelar una clase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al cancelar una clase
 */

// router.post("/user/classes/:id/cancel", getUsers);

/**
 * @swagger
 * /review/{id}:
 *   post:
 *     summary: Comentar y puntuar a un coach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - review
 *               - comment
 *             properties:
 *               puntuacion:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: clases dinamicas y divertidas!
 *     responses:
 *       201:
 *         description: Opinion creada existosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   type: integer
 *                   example: 4
 *                 comment:
 *                   type: string
 *                   example: clases dinamicas y divertidas!
 *       400:
 *         description: Si el comentario excede los 200char
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear opinion
 */

// router.post("/review/:id", getUsers);

/**
 * @swagger
 * /trainers/{id}/documents:
 *   get:
 *     summary: Obtener lista de archivos PDF de un profesor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Lista de archivos PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   filename:
 *                     type: string
 *                     example: clase1.pdf
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: https://midominio.com/archivos/clase1.pdf
 *       404:
 *         description: Profesor no encontrado o sin archivos
 */
// router.get('/trainers/:id/documents', getUsers);




module.exports = router;
