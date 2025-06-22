const mongoose = require("mongoose");
const Service = require("../../models/service");
const User = require("../../models/user");


// CREAR UN SERVICIO
const createService = async (req, res) => {
  try {
    const { name, category,zone, mode, duration, price, time, published, trainerId, date } =
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
      zone,
      mode,
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


// PUBLICAR O DESPUBLICAR
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

//  BUSCAR SERVICIO
const searchService = async (req, res) => {
  try {
    const { category, zone, mode, duration, price } = req.query;

    const filters = {};

    if (category) filters.category = category;
    if (zone) filters.zone = zone;
    if (mode) filters.mode = mode;
    if (duration) filters.duration = Number(duration);
    if (price) filters.price = { $lte: Number(price) }; // precio hasta

    const services = await Service.find(filters).populate("trainer", "-password");

    if (services.length === 0) {
      return res.status(200).json({ message: "No se encontraron servicios con esos filtros" });
    }

    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al filtrar servicios",
      error: error.message,
    });
  }
}



module.exports = {
  createService,
  postUnpostService,
  searchService
};
