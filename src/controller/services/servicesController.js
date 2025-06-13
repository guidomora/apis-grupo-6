const mongoose = require("mongoose");
const Service = require("../../models/service");
const User = require("../../models/user");

const createService = async (req, res) => {
  try {
    const { name, category, duration, price, time, published, trainerId } =
      req.body;

    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(400).json({
        message: "El entrenador no existe",
      });
    }

    const service = new Service({
      name,
      category,
      duration,
      price,
      time,
      published,
      trainer: trainerId,
    });

    await service.save();

    res.status(201).json({
      message: "Servicio creado correctamente",
      service,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  createService,
};
