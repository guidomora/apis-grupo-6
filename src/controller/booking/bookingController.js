const User = require("../../models/user");
const Service = require("../../models/service");
const Booking = require("../../models/booking");
const mongoose = require("mongoose");

//CREAR UNA RESERVA
const createBooking = async (req, res) => {
  const { serviceId } = req.body;
  const userId = req.params.id;
  try {
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

// ACEPTAR O RECHAZAR UNA RESERVA
const acceptRejectBooking = async (req, res) => {
  const { bookingId, action } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (user.role !== "TRAINER_ROLE") {
      return res
        .status(403)
        .json({ message: "Solo entrenadores pueden aceptar/rechazar servicios" });
    }

    const bookingUpdate = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      {
        status: action, //["PENDING", "CONFIRMED", "CANCELLED"]
      }
    );

    if (!bookingUpdate) {
      return res.status(404).json({ message: "Servicio no disponible" });
    }

    return res
      .status(201)
      .json({
        message: "Status del servicio contratado actualizado",
        status:action,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al modificar el status de servicio contratado",
        error: error.message,
      });
  }
};

module.exports = {
  createBooking,
  acceptRejectBooking,
};
