require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./src/database/config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");

const userRoutes = require("./src/routes/users/routes");
const trainerRoutes = require("./src/routes/trainers/routes");
const servicesRoutes = require("./src/routes/services/routes");
const reviewsRoutes = require("./src/routes/reviews/reviews");

const app = express();
const port = process.env.PORT || 3000;

// Conectar la base de datos
(async () => {
  try {
    await dbConnection();
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
    process.exit(1);
  }
})();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
