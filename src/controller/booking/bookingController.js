const User = require("../../models/user");
const Service = require("../../models/service");
const Booking = require("../../models/booking");
const mongoose = require("mongoose");

const createBooking = async (req, res) => {
  try {
    const { serviceId, date } = req.body;
    const userId = req.user.id; // asumimos que lo tenés autenticado
    const service = await Service.findById(serviceId);

    if (!service || !service.published) {
      return res.status(404).json({ message: "Servicio no disponible" });
    }

    const user = await User.findById(userId);
    if (user.role !== "USER_ROLE") {
      return res
        .status(403)
        .json({ message: "Solo usuarios pueden contratar servicios" });
    }

    const booking = await Booking.create({
      user: userId,
      service: serviceId,
      trainer: service.trainer,
      date,
    });

    return res
      .status(201)
      .json({ message: "Servicio contratado con éxito", booking });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al contratar servicio", error: error.message });
  }
};


module.exports = {
  createBooking
};
