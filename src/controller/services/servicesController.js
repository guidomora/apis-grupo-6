const mongoose = require("mongoose");
const Service = require("../../models/service");
const User = require("../../models/user");

const createService = async (req, res) => {
  try {
    const { name, category, duration, price, time, published, trainerId, date } =
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
      date
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


const postUnpostService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Servicio no encontrado",
      });
    }

    service.published = !service.published;
    await service.save();

    return res.status(200).json({
      message: `Servicio ${
        service.published ? "publicado" : "despublicado"
      } correctamente`,
      service,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  createService,
  postUnpostService,
};
