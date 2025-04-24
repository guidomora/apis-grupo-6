const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API con Express',
      version: '1.0.0',
      description: 'Documentación de la API para el TP',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], // Archivos donde Swagger buscará comentarios
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
