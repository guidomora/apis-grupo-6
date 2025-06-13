const mongoose = require("mongoose");
const Service = require("../../models/service");

const createService = async (req, res) => {
  try {
    const { name, category, duration, price, time, published, trainerId } =
      req.body;

    const emailExists = await User.findOne({ mail });
    if (emailExists) {
      return res.status(400).json({
        message: "El correo ya esta registrado",
      });
    }

    const service = new Service({
      name,
      category,
      duration,
      price,
      time,
      published,
      trainerId,
    });
    await service.save();
    res.status(201).json({
      message: "Servicio creado correctamente",
      user,
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
