const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.trainerPath = "/api/trainers";
    this.docsPath = "/api/docs";

    // Conectar la base de datos
    this.dbConnect();

    //Middlewares ----> funcion que siempre se va a ejecutar cuando levantemos el servidor (mas adelante profundizamos)
    this.middlewares();

    this.routes(); // esto dispara el metodo
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // Cors: nos permite proteger nuestro servidor de una forma superficial
    // es un middleware
    this.app.use(cors());
    this.app.use(express.json())
  }

  routes() {
    // llamando endpoints
    // ruta que vamos a tener que llamar
    this.app.use(this.userPath, require("../routes/users/routes"));
    this.app.use(this.trainerPath, require("../routes/trainers/routes"));
    this.app.use(this.docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  listen() {
    this.app.listen(this.port); // en vez de llamar al process.env.... solo llamamos al this.port
  }
}

module.exports = Server;
