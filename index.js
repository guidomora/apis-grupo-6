// const express = require('express');
// const dotenv = require('dotenv');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./src/docs/swagger');
// const userRoutes = require('./src/routes/users/routes');
// const trainerRoutes = require('./src/routes/trainers/routes');

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use('/api/users', userRoutes);
// app.use('/api/trainers', trainerRoutes);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const Server = require("./src/models/server");

require("dotenv").config();

const server = new Server();

server.listen();