const mongoose = require("mongoose");
const Service = require("../../models/service");
const User = require("../../models/user");
const mercadopago = require("../../helpers/mercadopago/mercadoPago");
const { Preference } = require('mercadopago');


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

    // Incrementar views de todos los servicios devueltos
    const bulkOps = services.map((s) => ({
      updateOne: {
        filter: { _id: s._id },
        update: { $inc: { views: 1 } },
      },
    }));

    await Service.bulkWrite(bulkOps);

    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al filtrar servicios",
      error: error.message,
    });
  }
};



// Obtener un servicio por ID e incrementar las vistas
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const service = await Service.findById(id).populate("trainer", "-password");

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Incrementar vistas
    service.views = (service.views || 0) + 1;
    await service.save();

    res.status(200).json({ service });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el servicio",
      error: error.message,
    });
  }
};

//Obtener servicios activos
const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error al obtener servicios activos:", error.message);
    res.status(400).json({
      message: "Error al obtener servicios"
    });
  }
};

// Obtener lista de archivos compartidos por un entrenador
const getTrainerFiles = async (req, res) => {
  try {
    const trainerId = req.params.id;

    const services = await Service.find({
      trainer: trainerId,
      sharedFiles: { $exists: true, $not: { $size: 0 } }
    }).select("name sharedFiles");

    if (!services.length) {
      return res.status(200).json({
        message: "No hay archivos compartidos por este entrenador."
      });
    }

    return res.status(200).json({ services });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los archivos compartidos",
      error: error.message
    });
  }
};


const servicePayment = async (req, res) => {
  const { title, unit_price } = req.body;

  const preference = new Preference(mercadopago);

  try {
    const response = await preference.create({
      body: {
        items: [
          {
            title,
            quantity: 1,
            unit_price: Number(unit_price),
          },
        ],
        purpose: 'wallet_purchase',
      },
    });

    return res.json({ preference_id: response.id });
  } catch (err) {
    console.error("Error al crear preferencia:", err);
    return res.status(500).json({ error: "Error al crear preferencia" });
  }
}

// PATCH /services/upload-file/:id
const uploadFileToService = async (req, res) => {
  const { id } = req.params;
  const { fileUrl } = req.body; // URL del archivo a agregar

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    service.sharedFiles.push(fileUrl); // agrega al array
    await service.save();

    return res.status(200).json({
      message: "Archivo agregado correctamente",
      sharedFiles: service.sharedFiles,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al agregar el archivo",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
 
  try {
    const deleted = await Service.findByIdAndDelete(id);
 
    if (!deleted) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
 
    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar servicio:", error.message);
    res.status(500).json({ message: "Error del servidor al eliminar el servicio" });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const service = await Service.findByIdAndUpdate(id, updates, {
      new: true, // devuelve el documento actualizado
      runValidators: true, // valida según el schema
    });

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.status(200).json({
      message: "Servicio actualizado correctamente",
      service,
    });
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};



module.exports = {
  createService,
  postUnpostService,
  searchService,
  getServiceById,
  getActiveServices,
  getTrainerFiles,
  servicePayment,
  uploadFileToService,
  deleteService,
  updateService
};


