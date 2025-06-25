const Service = require("../../models/service");
const Booking = require("../../models/booking");
const Review = require("../../models/review");
const mongoose = require("mongoose");

// OBTENER ESTADISTICAS DEL ENTRENADOR
const getTrainerStats = async (req, res) => {
  const trainerId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(trainerId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const services = await Service.find({ trainer: trainerId });
    const publishedServicesCount = services.filter(s => s.published).length;
    const totalViews = services.reduce((acc, s) => acc + (s.views || 0), 0);

    const confirmedBookings = await Booking.find({
      trainer: trainerId,
      status: "CONFIRMED"
    });

    const reviews = await Review.find({ trainer: trainerId });
    const ratingsCount = reviews.length;

    const averageRating = ratingsCount > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount
      : 0;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(r => {
      const score = Math.round(r.rating);
      if (ratingDistribution[score] !== undefined) {
        ratingDistribution[score]++;
      }
    });

    return res.status(200).json({
      publishedServicesCount,
      confirmedBookingsCount: confirmedBookings.length,
      averageRating: Number(averageRating.toFixed(2)),
      totalViews,
      ratingsCount,
      ratingDistribution
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
