const Service = require("../../models/service");
const Booking = require("../../models/booking");
const Review = require("../../models/review");
const mongoose = require("mongoose");


//OBTENER ESTADISTICAS DEL ENTRENADOR
const getTrainerStats = async (req, res) => {
  const trainerId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(trainerId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    // Servicios del entrenador
    const services = await Service.find({ trainer: trainerId });

    const publishedServicesCount = services.filter(s => s.published).length;
    const totalViews = services.reduce((acc, service) => acc + (service.views || 0), 0);

    // Contrataciones confirmadas
    const confirmedBookings = await Booking.find({
      trainer: trainerId,
      status: "CONFIRMED"
    });

    // Reviews
    const reviews = await Review.find({ trainer: trainerId });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    return res.status(200).json({
      publishedServicesCount,
      confirmedBookingsCount: confirmedBookings.length,
      averageRating: Number(avgRating.toFixed(2)),
      totalViews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener estadísticas del entrenador",
      error: error.message,
    });
  }
};

module.exports = {
  getTrainerStats,
};
